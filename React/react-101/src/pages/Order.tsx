import * as React from 'react';
import { PageHeader } from '../components';

export default class Order extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<PageHeader label="주문" />
			</React.Fragment>
		);
	}
}
