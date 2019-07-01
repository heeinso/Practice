import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Header from './Common/Header';
import Home from './Home';

@inject('authStore', 'commonStore')
@withRouter
@observer
export default class App extends React.Component {
	componentWillMount() {
		this.props.authStore.verifySession();
	}

	render() {
		if (this.props.commonStore.appLoaded) {
			return (
				<div>
					<Header />
					<Switch>
						<Route path="/" component={Home} />
					</Switch>
				</div>
			);
		}
		return null;
	}
}
