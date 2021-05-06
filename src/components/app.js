import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Component, h } from 'preact';
import { Router } from 'preact-router';
import Members from '../routes/members';
import Loading from './loading-C';
import TabPanel from './panel';
import PaymentAdminUI from "../routes/payments"
import BillUI from '../routes/bills';
import Login from './login';
import UserPaymentHistory from '../routes/user-payment-history';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			value: 0,
			isLoading: true,
			isLoggedIn: false
		}
	}

	setValue(value) {
		this.setState({ value });
	}
	
	mainApp(state){
		const value = state.value;
		return(
			<div>
				<Loading visible={state.isLoading} />
				<AppBar position="static">
					<Tabs value={value} onChange={(evt, value) => this.setValue(value)} aria-label="simple tabs example">
						<Tab label="Member" />
						<Tab label="Bills" />
						<Tab label="Payments" />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<Members isLoading={status => this.setState({ isLoading: status })} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<BillUI isLoading={status => this.setState({ isLoading: status })} />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<UserPaymentHistory isLoading={status => this.setState({ isLoading: status })} />
					{/* <PaymentAdminUI isLoading={status => this.setState({ isLoading: status })} /> */}
				</TabPanel>
			</div>

		)
	}

	entrencyPort(state){
		return(
			<div>
				<Loading visible={(state.isLoading)}/>
				<Login />
			</div>
		)
	}

	shouldRender(state){
		const isLoggedIn = state.isLoggedIn;
		switch(isLoggedIn){
			case true: 
			return this.mainApp(state);
			case false: 
			return this.entrencyPort(state);
			default:
				return <Loading visible={true} />;
		}
	}

	render({ }, state) {
		return (
			<div id="app">{this.shouldRender(state)}</div>
		)
	}

}