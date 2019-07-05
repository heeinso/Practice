import React from 'react';
import { Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';

@inject('authStore')
class Logout extends React.Component {
	componentWillMount() {
		this.props.authStore.logout();
	}

	render() {
		return <Redirect to="/" />;
	}
}

export default Logout;
