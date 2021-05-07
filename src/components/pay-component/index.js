import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { h, Component } from 'preact';
import Button from '@material-ui/core/Button';
import Form from '../form';
import styles from "./style.css";

class PayComponent extends Component {
    constructor(){
        super();
        this.state = {
            showDialog: false
        }
    }
    render({ open }, { showDialog }) {
        this.state.showDialog = open;
        return (
            <div>
                <Dialog onClose={() => { }} aria-labelledby="customized-dialog-title" open={showDialog}>
                    <DialogTitle id="customized-dialog-title" onClose={() => { }}>
                       <div className={styles.dialogHeader}>
                       <span>Pay</span>
                        <Button autoFocus onClick={()=>this.setState({showDialog: false})} color="primary">
                            Close
                        </Button>
                       </div>

                    </DialogTitle>
                    <DialogContent dividers>
                        <Form noValidate autoComplete="off">
                            <TextField className={styles.textfieldInput} type="number" fullWidth id="filledd-basic"  name="paidAmount" label="Amount" variant="filled" />

                            <Button variant="contained" className={styles.submitBtn} autoFocus type="submit" onClick={_ => { }} color="primary">Pay</Button>
                        </Form>

                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default PayComponent;