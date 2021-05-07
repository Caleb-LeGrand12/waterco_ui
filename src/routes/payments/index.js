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
            paymentList: [],
            rowData: undefined
        }
        this._rowDef = this._rowDef.bind(this);
    }

    async getPayments() {
        this.props.isLoading(true);
        const paymentList = (await PaymentModel.getAllPaiments()).data;
        console.log(paymentList ,"_________-")
        this.props.isLoading(false);
        this.setState({ paymentList })
    }

    componentDidMount() {
        this.getPayments()
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
    _back(){
        this.getPayments();
        this.setState({openDialog: false});
    }
    _rowDef(row, index, rowData) {
        const amountDue = Number(rowData.Total_Amount) - Number(rowData.Amount_Paid);
        return <tr onClick={evt => this._onRowClick(evt, rowData)}>
            <td>{index + 1} </td>
            <td>{rowData.Payment_ID}</td>
            <td>{rowData.Bill_id}</td>
            <td>{rowData.Amount_Paid}</td>
            <td>{rowData.Premise_ID}</td>
            <td>{rowData.Total_Amount}</td>
            <td>{amountDue}</td>
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
                    {/* <Button variant="contained" color="secondary" disabled={disabled}> Delete </Button> */}

                </div>
                <div className={styles.tableContiner}>
                    <div className={styles.tableSection}>
                        <DataTable rowDef={this._rowDef} className={`${styles.tableContainer}`} showRowNumbers data={state.paymentList}>
                            <ColDef name="Payment_ID" >Payment ID</ColDef>
                            <ColDef name="Bill_id" >Bill ID</ColDef>
                            <ColDef name="Amount_Paid" >Amount paid</ColDef>
                            <ColDef name="Premise_ID" >premis Id</ColDef>
                            <ColDef name="Total_Amount" >total amount</ColDef>
                            <ColDef name="amountDue" >Amount due</ColDef>

                        </DataTable>
                    </div>
                </div>
                <AddEditPayment back={_=>this._back()} isLoading={status=>this.props.isLoading(status)} open={(openDialog)} />
            </div>

        )
    }
}