import { h, Component } from "preact";
import Button from '@material-ui/core/Button';
import styles from "./style.css";
import AddEditMember from "../../../../components/add-edit-member";
import PayComponent from "../../../../components/pay-component";
export default class UserUI extends Component {
    constructor(){
        super();
        this.state = {
            openDialogMemberEdit: false,
            pay: false
        }
    }

    render({data}, state) {
        const openDialogMemberEdit = state.openDialogMemberEdit;
        const pay = state.pay;
        return (
            <div className={styles.mainContentBody}>
                <h1 className={styles.infoTitle}>Member info</h1>
                <div className={styles.btnsRow}>
                    <Button  onClick={_=>this.setState({pay: true, openDialogMemberEdit: false})} id="djfdka" variant="contained" color="primary" > Pay </Button>
                    <Button onClick={_=>this.setState({openDialogMemberEdit: true, pay:false})} id={"dfaoioou"} variant="contained" color="primary" > Edit </Button>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Fist name <span>:</span></h2>
                        <h2 className={styles.mainInfo}>{data.First_name}</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Last name <span>:</span></h2>
                        <h2 className={styles.mainInfo}>{data.Last_name}</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Email <span>:</span></h2>
                        <h2 className={styles.mainInfo}>{data.Member_email}</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Premise id<span>:</span></h2>
                        <h2 className={styles.mainInfo}>{data.Premise_ID ? data.Premise_ID : "" }</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Route name <span>:</span></h2>
                        <h2 className={styles.mainInfo}>{data.Route_Name ? data.Route_Name : "" }</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Amount due <span>:</span></h2>
                        <h2 className={styles.mainInfo}>{data.Amount_Due ? data.Amount_Due : "" }</h2>
                    </div>
                </div>
                <AddEditMember isLoading={status=>this.props.isLoading(status)} back={data => this.props.back(data)} data={data} open={(openDialogMemberEdit)} />
                <PayComponent open={pay} />
            </div>
        );
    }

}