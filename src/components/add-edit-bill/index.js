import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { h, Component } from 'preact';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import Form from '../form';
import styles from "./style.css";
import Premise from "../../model/premises"
import MembersModel from "../../model/member"
import BillModel from '../../model/bill';


/**
 * @typedef  {Object} State
 * @property {PremiseData[]} premisesList
 * @property {boolean} showDialog
 * @property {any} addBillFromData
 * @property {boolean} done
 */
class EditAddBill extends Component {
    /** @type {State} */
    state = {
        showDialog: false,
        premisesList: [],
        members: [],
        addBillFromData: {
            Premise_ID: null,
            Member_ID: null
        },
        done: false
    }
    componentWillMount() {
        Premise.getPremises()
            .then((premisesList) => this.setState({ premisesList }));

        MembersModel.getAllMembers()
            .then(membersResponse => {
                this.setState({ members: membersResponse.data });
            });
    }
    _onPremiseSelected(evt) {
        const data = {
            ...this.state.addBillFromData,
            Premise_ID: Number(evt.target.value)
        };
        this.setState({ addBillFromData: data });
    }
    _onMemberSelected(evt) {
        const data = {
            ...this.state.addBillFromData,
            Member_ID: Number(evt.target.value)
        };
        this.setState({ addBillFromData: data });
    }
    async _submitForm() {
        if (!this.state.addBillFromData.Member_ID || !this.state.addBillFromData.Premise_ID) {
            console.warn("Invalid bill data");
            return;
        }
        console.log("....adding bill");
        await BillModel.addBill(this.state.addBillFromData);
        this.setState({showDialog: false});
    }
    formMessage(message){
        return <p>
            {message}
        </p>
    }
    addForm() {
        return <Form noValidate autoComplete="off" onSubmit={evt => { this._submitForm }}>

            <InputLabel id="Premise_ID">Premise</InputLabel>
            <Select className={styles.selectInput} onChange={evt => this._onPremiseSelected(evt)} labelId="Premise_ID" id="Premise_ID_select" value={this.state.addBillFromData.Premise_ID}>
                {this.state.premisesList.map(/** @param {PremiseData} */(premise => {
                    return <MenuItem value={premise.Premise_ID}>{premise.Premise_ID}</MenuItem>
                }))}
            </Select>

            <InputLabel id="Member_ID">Member ID</InputLabel>
            <Select className={styles.selectInput} onChange={evt => this._onMemberSelected(evt)} labelId="Member_ID" id="Member_ID_select" value={this.state.addBillFromData.Member_ID}>
                {this.state.members.map(/** @param {PremiseData} */(member => {
                    return <MenuItem value={member.Member_ID}>{member.Member_ID}</MenuItem>
                }))}
            </Select>

            <Button variant="contained" className={styles.submitBtn} autoFocus type="button" onClick={_ => this._submitForm()} color="primary">Save</Button>
        </Form>;
    }
    render({ open }, { showDialog, premisesList }) {
        this.state.showDialog = open;

        return (
            <div>
                <Dialog onClose={() => { }} aria-labelledby="customized-dialog-title" open={showDialog}>
                    <DialogTitle id="customized-dialog-title" onClose={() => { }}>
                        <div className={styles.dialogHeader}>
                            <span>Bill</span>
                            <Button autoFocus onClick={() => this.setState({ showDialog: false })} color="primary">
                                Close
                        </Button>
                        </div>

                    </DialogTitle>
                    <DialogContent dividers>
                        {this.state.done ? this.formMessage("Done!") : this.addForm()}

                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default EditAddBill;