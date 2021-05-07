import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, TextField, Typography } from '@material-ui/core';
import { h, Component } from 'preact';
import Button from '@material-ui/core/Button';
import Form from '../form';
import styles from "./style.css";
import PaymentModel from '../../model/payment';

class AddEditPayment extends Component {
    constructor() {
        super();
        this.state = {
            showDialog: false,
            bills: [],
            premises: []
        }
    }

    async getBills(){
        try {
            this.props.isLoading(true);
            const bills = (await PaymentModel.getAllBills()).data
            this.setState({bills});
        } 
        finally{
            this.props.isLoading(false);
        }
    }

    async getPremises(){
        try {
            this.props.isLoading(true);
            const premises = (await PaymentModel.getAllPremises()).data
            this.setState({premises});
        } 
        finally{
            this.props.isLoading(false);
        }
    }

    componentDidMount(){
        this.getBills();
        this.getPremises();
    }

    async payementSubmitions(data){
            const dataToSubmit = {
                Amount_Paid: Number(data.Amount_Paid),
                Bill_id: Number(data.Bill_id),
                Premise_ID: Number(data.Premise_ID),
                Total_Amount: Number(data.Total_Amount)
            }
        console.log(dataToSubmit)

             try {
                    this.props.isLoading(true);
                    await PaymentModel.addPayment(dataToSubmit)
                    alert(`Payment added successfully`)

                } catch (error) {
                    console.error(error);
                    alert(`Failled to add payment`)
                }
                finally{
                    this.setState({showDialog: false});
                    this.props.isLoading(false);
                    this.props.back()

                }
        
    }

    render({ open }, { showDialog, bills, premises }) {
        this.state.showDialog = open;
        return (
            <div>
                <Dialog onClose={() => { }} aria-labelledby="customized-dialog-title" open={showDialog}>
                    <DialogTitle id="customized-dialog-title" onClose={() => { }}>
                        <div className={styles.dialogHeader}>
                            <span>Payment</span>
                            <Button autoFocus onClick={() => this.setState({ showDialog: false })} color="primary">
                                Close
                        </Button>
                        </div>

                    </DialogTitle>
                    <DialogContent dividers>
                        <Form onSubmit={data=>this.payementSubmitions(data)} noValidate autoComplete="off">
                            <FormControl fullWidth variant="filled" >
                            <InputLabel htmlFor="filled-BillId-native-simple">Bill ID</InputLabel>
                            <Select
                                native
                                onChange={_ => { }}
                                inputProps={{
                                    name: 'Bill_id',
                                    id: 'filled-BillId-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {
                                    bills.map(bill=>(<option value={bill.Bill_id}>{bill.Bill_id}</option>))
                                }
                            </Select>
                            </FormControl>
                            <div className={styles.heightSpacing} ></div>
                            <FormControl fullWidth variant="filled" >
                            <InputLabel htmlFor="filled-BillId-native-simple">Premise ID</InputLabel>
                            <Select
                                native
                                onChange={_ => { }}
                                inputProps={{
                                    name: 'Premise_ID',
                                    id: 'filled-BillId-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {
                                    premises.map(bill=>(<option value={bill.Premise_ID}>{bill.Premise_ID}</option>))
                                }
                            </Select>
                            </FormControl>
                            <TextField className={styles.textfieldInput} fullWidth id="filleqed-adfa" name="Amount_Paid" type="number" label="Amount paid" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="filleqed-adfa" name="Total_Amount" type="number" label="Total amount" variant="filled" />

                            <Button variant="contained" className={styles.submitBtn} autoFocus type="submit" onClick={_ => { }} color="primary">Save</Button>
                        </Form>

                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default AddEditPayment;