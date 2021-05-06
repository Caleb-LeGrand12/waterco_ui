import { Component } from "preact";
import styles from "./style.css";
import Button from '@material-ui/core/Button';
import { ColDef, DataTable } from '../../components/data-table';
import AddEditPayment from "../../components/add-edit-payment";
import PaymentModel from "../../model/payment";

export default class PaymentAdminUI extends Component {
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
        const membersList = await PaymentModel.paymentList();
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
        return <tr onClick={evt => this._onRowClick(evt, rowData)}>
            <td>
                <input type="checkbox" onChange={evt => this._onCheckbox(evt, rowData)} />
            </td>
            <td>{rowData.paymentId}</td>
            <td>{rowData.billId}</td>
            <td>{rowData.amountPaid}</td>
            <td>{rowData.totalAmount}</td>
            <td>{rowData.premisId}</td>
        </tr>
    }
    render({ }, state) {
        const openDialog = state.openDialog;
        const checkedData = Array.from(state.checkedData.values());
        const disabled = checkedData.length == 0 ? true : false;
        return (
            <div className={styles.memberAdminContainer}>
                <div className={styles.btnsContainer}>
                    <Button onClick={_ => this.setState({ openDialog: true })} variant="contained" color="primary"> Add payment </Button>
                    <Button variant="contained" color="secondary" disabled={disabled}> Delete </Button>

                </div>
                <div className={styles.tableContiner}>
                    <div className={styles.tableSection}>
                        <DataTable rowDef={this._rowDef} className={`${styles.tableContainer}`} showCheckBoxes data={state.membersList}>
                            <ColDef name="names" >Payment ID</ColDef>
                            <ColDef name="memberNames" >Bill ID</ColDef>
                            <ColDef name="amountPaid" >Amount paid</ColDef>
                            <ColDef name="totalAmount" >total amount</ColDef>
                            <ColDef name="memberEmail" >premis Id</ColDef>
                        </DataTable>
                    </div>
                </div>
                <AddEditPayment open={(openDialog)} />
            </div>

        )
    }
}