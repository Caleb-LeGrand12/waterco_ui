import { h, Component } from "preact";
import Button from '@material-ui/core/Button';
import styles from "./style.css";
import AddEditMember from "../../../../components/add-edit-member";
import PayComponent from "../../../../components/pay-component";
export default class UserUI extends Component {
    constructor(){
        super();
        this.state = {
            openDialog: false,
            pay: false
        }
    }

    render({}, state) {
        const openDialog = state.openDialog;
        const pay = state.pay;
        return (
            <div className={styles.mainContentBody}>
                <h1 className={styles.infoTitle}>Member info</h1>
                <div className={styles.btnsRow}>
                    <Button  onClick={_=>this.setState({pay: true})} variant="contained" color="primary" > Pay </Button>
                    <Button onClick={_=>this.setState({openDialog: true})} variant="contained" color="primary" > Edit </Button>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Fist name <span>:</span></h2>
                        <h2 className={styles.mainInfo}>skdkdujd</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Last name <span>:</span></h2>
                        <h2 className={styles.mainInfo}>skdkdujd</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Email <span>:</span></h2>
                        <h2 className={styles.mainInfo}>skdkdujd</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Premise id<span>:</span></h2>
                        <h2 className={styles.mainInfo}>skdkdujd</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Route name <span>:</span></h2>
                        <h2 className={styles.mainInfo}>skdkdujd</h2>
                    </div>
                    <div className={styles.userInfoRow}>
                        <h2 className={styles.infoName}>Amount due <span>:</span></h2>
                        <h2 className={styles.mainInfo}>skdkdujd</h2>
                    </div>
                </div>
                <AddEditMember open={(openDialog)} />
                <PayComponent open={pay} />
            </div>
        );
    }

}