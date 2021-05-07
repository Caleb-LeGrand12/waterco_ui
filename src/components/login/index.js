import { h, Component } from 'preact';
import "./index.css";
import styles from "./index.css";
import Loading from '../loading-C';
import MembersModel from '../../model/member';
import { route } from 'preact-router';


export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            isSignIn: false,
            isLoading: false
        }
    }

    componentDidMount() {
        
       

    }

    setSignTOBeShown(){
        let isSignIn = this.state.isSignIn;
        if(isSignIn) isSignIn = false;
        else isSignIn = true;
        this.setState({isSignIn});
    }
    async _addMember(evt){
        evt.preventDefault();
        const formData = this._getFormData(evt.target);
        this.setState({isLoading: true});
        console.log(formData);
        await MembersModel.addMember(formData);
        this.setState({isLoading: false});
        route("/")

    }
    _getFormData(formElement){
        const formData = {};
        Array.from(formElement.elements)
            .forEach(elt=>{
                if(!elt.name) return;
                formData[elt.name] = elt.value;
            });
        return formData;
    }
    _sigin(evt){
        evt.preventDefault();
        this.setState({isLoading: true});
        setTimeout(() => {
            route("/");
            
        }, 2000);
    }
    render({}, state) {
        return (<div>
				<Loading visible={state.isLoading}/>
            <div className={styles.body}>
                <div class={`${styles.container} ${!state.isSignIn ?styles.right_panel_active : ""}`} id="container">
                <div class={`${styles.form_container} ${styles.sign_up_container}`}>
                    <form className={styles.form} id="addMemberForm" onSubmit={evt=>this._addMember(evt)}>
                        <h1 className={styles.h1}>Create Member Account</h1>
                        <input required name="First_name" className={styles.input} type="text" placeholder="First Name" />
                        <input required name="Last_name" className={styles.input} type="text" placeholder="Last Name" />
                        <input required name="Member_email" className={styles.input} type="email" placeholder="Email" />
                        <input required name="Member_password" className={styles.input} type="password" placeholder="Password" />
                        <button className={styles.button} >Sign Up</button>
                    </form>
                </div>
                <div class={`${styles.form_container} ${styles.sign_in_container}`}>
                    <form className={styles.form} onSubmit={evt=>this._sigin(evt)}>
                        <h1 className={styles.h1} >Sign in</h1>
                        <input required className={styles.input} type="email" placeholder="Email" />
                        <input required className={styles.input} type="password" placeholder="Password" />
                        <button className={styles.button} >Sign In</button>
                    </form>
                </div>
                <div class={styles.overlay_container}>
                    <div class={styles.overlay}>
                        <div class={`${styles.overlay_panel} ${styles.overlay_left}`}>
                            <h1 className={styles.h1}>Welcome Back!</h1>
                            <p className={styles.p}>To keep connected with us please login with your personal info</p>
                            <button class={`${styles.ghost} ${styles.button}`} onClick={_=>this.setSignTOBeShown()} id="signIn">Sign In</button>
                        </div>
                        <div class={`${styles.overlay_panel} ${styles.overlay_right}`}>
                            <h1>Dear Esteemed customer!</h1>
                            <p className={styles.p}>
                                Please Provide your personal details and start your journey with
                                WaterCo LTD
          </p>
                            <button onClick={_=>this.setSignTOBeShown()} class={`${styles.ghost} ${styles.button}`} id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
}