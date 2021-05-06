import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { h, Component } from 'preact';
import Button from '@material-ui/core/Button';
import Form from '../form';
import styles from "./style.css";

class EditAddBill extends Component {
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
                       <span>Bill</span>
                        <Button autoFocus onClick={()=>this.setState({showDialog: false})} color="primary">
                            Close
                        </Button>
                       </div>

                    </DialogTitle>
                    <DialogContent dividers>
                        <Form noValidate autoComplete="off">
                            <TextField className={styles.textfieldInput} fullWidth id="fillwewedd-basic" name="billId" type="text" label="Bill ID" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="djfkdwedaf" name="premiseID" type="number" label="Premise ID" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="fiqtqlleadfdd-basic"  type="number" name="memberID" label="Member ID" variant="filled" />
                            <Button variant="contained" className={styles.submitBtn} autoFocus type="submit" onClick={_ => { }} color="primary">Save</Button>
                        </Form>

                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default EditAddBill;