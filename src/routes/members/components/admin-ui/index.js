import { Component } from "preact";
import styles from "./style.css";
import Button from '@material-ui/core/Button';
import { ColDef, DataTable } from '../../../../components/data-table/index';
import AddEditMember from "../../../../components/add-edit-member";
import MembersModel from '../../../../model/member';

export default class MemberAdminUI extends Component {
    constructor() {
        super();
        this.state = {
            checkedData: new Map(),
            openDialog: false,
            membersList: [],
            rowData: undefined
        }
        this._rowDef = this._rowDef.bind(this);
    }

    async getMembers() {
        this.props.isLoading(true);
        const membersList = await MembersModel.getAllMembers();
        this.props.isLoading(false);
        this.setState({ membersList })
    }

    componentDidMount() {
        this.getMembers()
    }

    _onCheckbox(evt, rowData) {
        const memberId = rowData.memberId;
        const checked = evt.target.checked;
        const checkedData = this.state.checkedData;
        if (checked) checkedData.set(memberId, rowData);
        else checkedData.delete(memberId);
        this.setState({ checkedData });
    }

    _onRowClick(evt, rowData) {
        if (evt.target.tagName == "INPUT") {
            this.setState({ openDialog: false, rowData: undefined });
            return;
        };
        this.setState({ openDialog: true, rowData });

    }
    _rowDef(row, index, rowData) {
        const names = `${rowData.firstName} ${rowData.lastName}`;
        return <tr onClick={evt => this._onRowClick(evt, rowData)}>
            <td>
                <input type="checkbox" onChange={evt => this._onCheckbox(evt, rowData)} />
            </td>
            <td>{rowData.memberId}</td>
            <td>{names}</td>
            <td>{rowData.email}</td>
        </tr>
    }
    render({ }, state) {
        const openDialog = state.openDialog;
        const checkedData = Array.from(state.checkedData.values());
        const disabled = checkedData.length == 0 ? true : false;
        return (
            <div className={styles.memberAdminContainer}>
                <div className={styles.btnsContainer}>
                    <Button onClick={_ => this.setState({ openDialog: true })} variant="contained" color="primary"> Add member </Button>
                    <Button variant="contained" color="secondary" disabled={disabled}> Delete </Button>

                </div>
                <div className={styles.tableContiner}>
                    <div className={styles.tableSection}>
                        <DataTable rowDef={this._rowDef} className={`${styles.tableContainer}`} showCheckBoxes data={state.membersList}>
                            <ColDef name="names" >Member ID</ColDef>
                            <ColDef name="memberNames" >Member names</ColDef>
                            <ColDef name="memberEmail" >Email </ColDef>
                        </DataTable>
                    </div>
                </div>
                <AddEditMember open={(openDialog)} />
            </div>

        )
    }
}