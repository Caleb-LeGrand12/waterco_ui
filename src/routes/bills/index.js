import { Component } from "preact";
import styles from "./style.css";
import Button from '@material-ui/core/Button';
import { ColDef, DataTable } from '../../components/data-table';
import AddEditBill from "../../components/add-edit-bill";
import PaymentModel from "../../model/payment";
import BillModel from "../../model/bill";

export default class BillUI extends Component {
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
        const membersList = await BillModel.getListOfBills();
        if(!membersList){
            this.props.isLoading(false);
            return;
        }
        this.props.isLoading(false);
        this.setState({ membersList })

    }

    componentDidMount() {
        this.getMembers()
    }

    _onCheckbox(evt, rowData) {
        const memberId = rowData.Bill_id;
        const checked = evt.target.checked;
        const checkedData = this.state.checkedData;
        if (checked) checkedData.set(memberId, rowData);
        else checkedData.delete(memberId);
        this.setState({ checkedData });
    }

    _onRowClick(evt, rowData) {
        if (evt.target.tagName == "INPUT") {
            this.setState({ openDialog: false, rowData });
            return;
        };
        this.setState({ openDialog: true, rowData });

    }
    _rowDef(row, index, rowData) {
        return <tr onClick={evt => this._onRowClick(evt, rowData)}>
            <td>
                <input type="checkbox" onChange={evt => this._onCheckbox(evt, rowData)} />
            </td>
            <td>{rowData.Bill_id}</td>
            <td>{rowData.Premise_ID}</td>
            <td>{rowData.Member_ID}</td>
        </tr>
    }
   async _deleteRow(){
       
    }
    render({ }, state) {
        const openDialog = state.openDialog;
        const checkedData = Array.from(state.checkedData.values());
        
        return (
            <div className={styles.memberAdminContainer}>
                <div className={styles.btnsContainer}>
                    <Button onClick={_ => this.setState({ openDialog: true })} variant="contained" color="primary"> Add bill </Button>
                </div>
                <div className={styles.tableContiner}>
                    <div className={styles.tableSection}>
                        
                        <DataTable rowDef={this._rowDef} className={`${styles.tableContainer}`} showCheckBoxes data={this.state.membersList}>
                            <ColDef name="Bill_id" >Bill ID</ColDef>
                            <ColDef name="Premise_ID" >Premise ID</ColDef>
                            <ColDef name="Member_ID" >Member ID</ColDef>
                        </DataTable>
                    </div>
                </div>
                <AddEditBill open={(openDialog)} />
            </div>

        )
    }
}