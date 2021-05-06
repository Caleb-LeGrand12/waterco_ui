import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Component, h } from 'preact';
import { Router } from 'preact-router';
import Members from '../routes/members';
import Loading from './loading-C';
import TabPanel from './panel';
import PaymentAdminUI from "../routes/payments"
import BillUI from '../routes/bills';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			value: 0,
			isLoading: true
		}
	}

	setValue(value) {
		this.setState({ value });
	}

	render({ }, state) {
		const value = state.value;
		return (
			<div id="app">
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
					<PaymentAdminUI isLoading={status => this.setState({ isLoading: status })} />
				</TabPanel>
			</div>
		)
	}

}