import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { h, Component } from 'preact';
import Button from '@material-ui/core/Button';
import Form from '../form';
import styles from "./style.css";

class AddEditMember extends Component {
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
                       <span>Member</span>
                        <Button autoFocus onClick={()=>this.setState({showDialog: false})} color="primary">
                            Close
                        </Button>
                       </div>

                    </DialogTitle>
                    <DialogContent dividers>
                        <Form noValidate autoComplete="off">
                            <TextField className={styles.textfieldInput} fullWidth id="filledd-basic"  name="firstName" label="First name" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="filledd-basic" name="lastName"  label="Last name" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="djfkdajdaf" type="email" name="email" label="email" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="filleadfdd-basic" name="passowrd" label="Password" variant="filled" />

                            <Button variant="contained" className={styles.submitBtn} autoFocus type="submit" onClick={_ => { }} color="primary">Save</Button>
                        </Form>

                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default AddEditMember;