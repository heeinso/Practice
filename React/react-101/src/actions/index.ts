import { createAction } from 'typesafe-actions';

export const startMonitoring = createAction(
	'@command/monitoring/start',
	resolve => () => resolve()
);

export const stopMonitoring = createAction(
	'@command/monitoring/stop',
	resolve => () => resolve()
);

export const updateOrderStatus = createAction(
	'@update/order/status',
	resolve => {
		return (success: number, failure: number) => resolve({ success, failure });
	}
);
