import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { h, Component } from 'preact';
import Button from '@material-ui/core/Button';
import Form from '../form';
import styles from "./style.css";
import MembersModel from '../../model/member';

class AddEditMember extends Component {
    constructor() {
        super();
        this.state = {
            showDialog: false
        }
    }
    async formSubmition(data) {
        const propData = this.props.data;
        if (propData) {
            const memberId = propData.Member_ID;
            if (memberId) {
                try {
                    this.props.isLoading(true);
                    await MembersModel.updateMember(data, memberId)
                    alert(`Member updated successfully`)
                } catch (error) {
                    console.error(error);
                    alert(`Failled to update member`)
                }
                finally {
                    this.setState({ showDialog: false });
                    this.props.isLoading(false);
                    this.props.back({ view: "members" })
                }
            }
        }
        else {
            try {
                this.props.isLoading(true);
                await MembersModel.addMember(data)
                alert(`Member added successfully`)

            } catch (error) {
                console.error(error);
                alert(`Failled to add member`)
            }
            finally {
                this.setState({ showDialog: false });
                this.props.isLoading(false);
                this.props.back({ view: "members" })

            }
        }
    }
    render(props, { showDialog }) {
        this.state.showDialog = props.open;
        const propData = this.props.data;
        const data = propData ? propData : {};

        return (
            <div>
                <Dialog onClose={() => { }} aria-labelledby="customized-dialog-title" open={showDialog}>
                    <DialogTitle id="customized-dialog-title" onClose={() => { }}>
                        <div className={styles.dialogHeader}>
                            <span>Member</span>
                            <Button autoFocus onClick={() => this.setState({ showDialog: false })} color="primary">
                                Close
                        </Button>
                        </div>

                    </DialogTitle>
                    <DialogContent dividers>
                        <Form onSubmit={data => this.formSubmition(data)} noValidate autoComplete="off">
                            <TextField className={styles.textfieldInput} fullWidth id="filledd-basic" name="First_name" label="First name" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="filledd-basic" name="Last_name" label="Last name" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="djfkdajdaf" type="Member_email" name="Member_email" label="email" variant="filled" />
                            <TextField className={styles.textfieldInput} fullWidth id="filleadfdd-basic" name="Member_password" label="Password" variant="filled" />

                            <Button variant="contained" className={styles.submitBtn} autoFocus type="submit" onClick={_ => { }} color="primary">{props.data ? "Update" : "Save"}</Button>
                        </Form>

                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default AddEditMember;