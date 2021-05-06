import { Component } from "preact";
import styles from "./style.css";
import Button from '@material-ui/core/Button';
import { ColDef, DataTable } from '../../components/data-table';
import AddEditPayment from "../../components/add-edit-payment";
import PaymentModel from "../../model/payment";
import UserModel from "../../model/user";

export default class UserPaymentHistory extends Component {
    constructor() {
        super();
        this.state = {
            checkedData: new Map(),
            openDialog: false,
            logs: [],
            rowData: undefined
        }
        this._rowDef = this._rowDef.bind(this);
    }

    async getMembers() {
        this.props.isLoading(true);
        const logs = await UserModel.getUserPaymentHistory();
        this.props.isLoading(false);
        this.setState({ logs })
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
            <td>{index + 1}</td>
            <td>{rowData.paidAmount}</td>
            <td>{rowData.date}</td>
        </tr>
    }
    render({ }, state) {
        const openDialog = state.openDialog;
        const checkedData = Array.from(state.checkedData.values());
        return (
            <div className={styles.memberAdminContainer}>
              
                <div className={styles.tableContiner}>
                    <div className={styles.tableSection}>
                        <DataTable rowDef={this._rowDef} className={`${styles.tableContainer}`} showRowNumbers data={state.logs}>
                            <ColDef name="amountPaid" >Amount paid</ColDef>
                            <ColDef name="date" >Date</ColDef>
                        </DataTable>
                    </div>
                </div>
                <AddEditPayment open={(openDialog)} />
            </div>

        )
    }
}