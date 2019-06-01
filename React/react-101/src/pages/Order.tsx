import * as React from 'react';
import { PageHeader } from '../components';
import { OrderListContainer } from '../containers';

interface IProps {}

export default class Order extends React.PureComponent<IProps> {
	render() {
		return (
			<React.Fragment>
				<PageHeader label="주문" />
				<OrderListContainer />
			</React.Fragment>
		);
	}
}
