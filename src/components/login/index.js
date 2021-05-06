import { h, Component } from 'preact';
import "./index.css";
import styles from "./index.css";

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            isSignIn: false
        }
    }

    componentDidMount() {
        
        // const signUpButton = document.getElementById("signUp");
        // const signInButton = document.getElementById("signIn");
        // const container = document.getElementById("container");

        // signUpButton.addEventListener("click", () => {
        //     console.log("container");
        //     container.classList.add("right_panel_active");
        // });

        // signInButton.addEventListener("click", () => {
        //     container.classList.remove("right_panel_active");
        // });

    }

    setSignTOBeShown(){
        let isSignIn = this.state.isSignIn;
        if(isSignIn) isSignIn = false;
        else isSignIn = true;
        this.setState({isSignIn});
    }

    render({}, state) {
        return (
            <div className={styles.body}>
                <div class={`${styles.container} ${!state.isSignIn ?styles.right_panel_active : ""}`} id="container">
                <div class={`${styles.form_container} ${styles.sign_up_container}`}>
                    <form className={styles.form} action="#">
                        <h1 className={styles.h1}>Create Member Account</h1>
                        <input className={styles.input} type="text" placeholder="First Name" />
                        <input className={styles.input} type="text" placeholder="Last Name" />
                        <input className={styles.input} type="email" placeholder="Email" />
                        <input className={styles.input} type="password" placeholder="Password" />
                        <button className={styles.button} >Sign Up</button>
                    </form>
                </div>
                <div class={`${styles.form_container} ${styles.sign_in_container}`}>
                    <form className={styles.form} action="#">
                        <h1 className={styles.h1} >Sign in</h1>
                        <input className={styles.input} type="email" placeholder="Email" />
                        <input className={styles.input} type="password" placeholder="Password" />
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
        )
    }
}