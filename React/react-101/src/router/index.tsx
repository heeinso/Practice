import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { DefaultLayout } from '../containers';
import * as Pages from '../pages';

interface IProps {}

const Router: React.FC<IProps> = () => {
	return (
		<BrowserRouter>
			<DefaultLayout>
				<Route exact path="/" component={Pages.Dashboard} />
				<Route exact path="/orders" component={Pages.Order} />
			</DefaultLayout>
		</BrowserRouter>
	);
};

export default Router;
