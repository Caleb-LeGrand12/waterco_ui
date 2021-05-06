import {h, Component} from "preact";
import MemberAdminUI from "./components/admin-ui";
import UserUI from "./components/user-ui";
// import styles from "./style.scss";

export default class Members extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                {/* <MemberAdminUI isLoading={status=>this.props.isLoading(status)} /> */}
                <UserUI />
            </div>
        )
    }
}
