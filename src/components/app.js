import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Component, h } from 'preact';
import { Router } from 'preact-router';
import { useState } from 'preact/hooks';
import Members from '../routes/members';
import Loading from './loading-C';
import TabPanel from './panel';
import PaymentAdminUI from "../routes/payments"
import BillUI from '../routes/bills';
import Login from './login';
import UserPaymentHistory from '../routes/user-payment-history';
import { route } from 'preact-router';


export default class App extends Component {
	constructor() {
		super();
		this.state = {
			value: 0,
			isLoading: true,
			isLoggedIn: true
		}
	}

	setValue(value) {
		this.setState({ value });
	}

	// mainApp(state){
	// 	const value = state.value;
	// 	return(

	// 	)
	// }
	shouldRender(state) {
		const isLoggedIn = state.isLoggedIn;
		switch (isLoggedIn) {
			case true:
				return this.mainApp(state);
			case false:
				return this.entrencyPort(state);
			default:
				return <Loading visible={true} />;
		}
	}

	render({ }, state) {
		return <Router>
			<Login path="/login" />
			<MainApp path="/" value={this.state.value} />

		</Router>;
	}

}

const MainApp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [value, setValue] = useState(0);
	return <div>
		<Loading visible={isLoading} />
		<AppBar position="static">
			<Tabs value={value} onChange={(evt, value) => setValue(value)} aria-label="simple tabs example">
				<Tab label="Member" />
				<Tab label="Bills" />
				<Tab label="Payments" />
			</Tabs>
		</AppBar>
		<TabPanel value={value} index={0}>
			<Members isLoading={status => setIsLoading(status)} />
		</TabPanel>
		<TabPanel value={value} index={1}>
			<BillUI isLoading={status => setIsLoading(status)} />
		</TabPanel>
		<TabPanel value={value} index={2}>
			<UserPaymentHistory isLoading={status => setIsLoading(status)} />
			{/* <PaymentAdminUI isLoading={status => this.setState({ isLoading: status })} /> */}
		</TabPanel>
		<button className="sign__out-button" type="button" onClick={_=>{setTimeout(() => {
			route("/login")
		}, 1200), setIsLoading(true)}} >
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFF"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
		</button>
	</div>

}