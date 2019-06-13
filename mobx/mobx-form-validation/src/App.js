import React from 'react';
import { UserEnrollmentData } from './store';
import { Provider } from 'mobx-react';
import FormContainer from './components';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.store = new UserEnrollmentData();
	}

	render() {
		return (
			<Provider store={this.store}>
				<FormContainer />
			</Provider>
		);
	}

	componentWillUnmount() {
		this.store.cleanup();
		this.store = null;
	}
}
