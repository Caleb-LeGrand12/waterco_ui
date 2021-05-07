import { Component } from "preact";
import styles from "./style.css";
import Button from '@material-ui/core/Button';
import { ColDef, DataTable } from '../../../../components/data-table/index';
import AddEditMember from "../../../../components/add-edit-member";
import MembersModel from '../../../../model/member';
import UserUI from "../user-ui";

export default class MemberAdminUI extends Component {
    constructor() {
        super();
        this.state = {
            checkedData: new Map(),
            openDialog: false,
            membersList: [],
            rowData: undefined,
            currentView: "members",
            memberData: {}
        }
        this._rowDef = this._rowDef.bind(this);
    }

    async getMembers() {
        this.props.isLoading(true);
        const membersList = (await MembersModel.getAllMembers(1)).data;
        this.props.isLoading(false);
        this.setState({ membersList });
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
        this.setState({
            // openDialog: true, 
            memberData: rowData,
            currentView: "memberDetails"
        });

    }

    async deleteMembers() {
        const membersToDelete = Array.from(this.state.checkedData.values());
        const ask = confirm(`do you want to delete ${membersToDelete.length ? "this" : "these"} members?`)
        if (!ask) return;
        this.props.isLoading(true);

        for (const member of membersToDelete) {
            const memberId = member.Member_ID;

            try {
                await MembersModel.deleteMember(memberId);
                this.props.isLoading(false);
                this.getMembers();
            } catch (error) {
                return alert(`Faill to delete a member with the ID ${memberId}`);
            }
            finally{
                this.props.isLoading(false);

            }
        }

    }

    _rowDef(row, index, rowData) {
        const checked = this.state.checkedData.has(rowData.Member_ID);
        return <tr onClick={evt => this._onRowClick(evt, rowData)}>
            <td>
                <input  type="checkbox" onChange={evt => this._onCheckbox(evt, rowData)} />
            </td>
            <td>{rowData.Member_ID}</td>
            <td>{rowData.First_name}</td>
            <td>{rowData.Last_name}</td>
            <td>{rowData.Member_email}</td>
        </tr>
    }

    returningBack(data) {
        this.setState({ currentView: data.view, openDialog: false });
        this.getMembers();
    }
    render({ }, state) {
        const openDialog = state.openDialog;
        const checkedData = Array.from(state.checkedData.values());
        const disabled = checkedData.length == 0 ? true : false;
        return (
            <div>
                {
                    state.currentView == "members"
                        ? (
                            <div className={styles.memberAdminContainer}>
                                <div className={styles.btnsContainer}>
                                    <Button onClick={_ => this.setState({ openDialog: true })} variant="contained" color="primary"> Add member </Button>
                                    <Button onClick={_ => this.deleteMembers()} variant="contained" color="secondary" disabled={disabled}> Delete </Button>

                                </div>
                                <div className={styles.tableContiner}>
                                    <div className={styles.tableSection}>
                                        <DataTable rowDef={this._rowDef} className={`${styles.tableContainer}`} showCheckBoxes data={state.membersList}>
                                            <ColDef name="Member_ID" >Member ID</ColDef>
                                            <ColDef name="First_name" >Member names</ColDef>
                                            <ColDef name="Last_name" >Member names</ColDef>
                                            <ColDef name="Member_email" >Email </ColDef>
                                        </DataTable>
                                    </div>
                                </div>
                                <AddEditMember isLoading={status=>this.props.isLoading(status)} back={data => this.returningBack(data)} open={(openDialog)} />
                            </div>
                        )
                        : (<UserUI isLoading={status=>this.props.isLoading(status)} back={data => this.returningBack(data)} data={state.memberData} />)
                }
            </div>

        )
    }
}