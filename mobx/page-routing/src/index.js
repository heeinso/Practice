import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { CheckoutWorkflow } from './checkout';
import { Paper } from '@material-ui/core';
import { ShowCart } from './showCart';
import {
	ConfirmDescription,
	PaymentDescription,
	ShoppingDescription,
	TemplateStepComponent,
	TrackOrderDescription,
} from './shared';

const workflow = new CheckoutWorkflow();

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<DevTools />
				<Paper elevation={2} style={{ padding: 20 }}>
					<Router history={workflow.tracker.history}>
						<Switch>
							<Route
								exact
								path={'/'}
								component={() => (
									<TemplateStepComponent
										title={'MobX Shop'}
										renderDetails={ShoppingDescription}
										operationTitle={'View Cart'}
									/>
								)}
							/>
							<Route exact path={'/cart'} component={ShowCart} />
							<Route
								exact
								path={'/payment'}
								component={() => (
									<TemplateStepComponent
										title={'Choose Payment'}
										renderDetails={PaymentDescription}
										operationTitle={'Confirm'}
									/>
								)}
							/>
							<Route
								exact
								path={'/confirm'}
								component={() => (
									<TemplateStepComponent
										title={'Your order is confirmed'}
										operationTitle={'Track Order'}
										renderDetails={ConfirmDescription}
									/>
								)}
							/>
							<Route
								exact
								path={'/track'}
								component={() => (
									<TemplateStepComponent
										title={'Track your order'}
										operationTitle={'Continue Shopping'}
										renderDetails={TrackOrderDescription}
									/>
								)}
							/>
						</Switch>
					</Router>
				</Paper>
			</React.Fragment>
		);
	}
}
ReactDOM.render(
	<Provider store={workflow}>
		<App />
	</Provider>,
	document.getElementById('root')
);
