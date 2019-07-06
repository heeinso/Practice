import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Header from './Common/Header';
import Home from './Home';

import Login from './Account/Login';
import Logout from './Account/Logout';
import Confirm from './Account/Confirm';
import Register from './Account/Register';
import Settings from './Account/Settings';

@inject('authStore', 'commonStore')
@withRouter
@observer
class App extends React.Component {
	componentWillMount() {
		this.props.authStore.verifySession();
	}

	render() {
		const { appLoaded } = this.props.commonStore;

		return appLoaded ? (
			<div>
				<Header />
				<Switch>
					<Route path="/settings" component={Settings} />
					<Route path="/logout" component={Logout} />
					<Route path="/login" component={Login} />
					<Route path="/register/confirm" component={Confirm} />
					<Route path="/register" component={Register} />
					<Route path="/" component={Home} />
				</Switch>
			</div>
		) : null;
	}
}

export default App;
