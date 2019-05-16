import { createAction } from 'typesafe-actions';

export const startMonitoring = createAction(
	'@command/monitoring/start',
	resolve => () => resolve()
);

export const stopMonitoring = createAction(
	'@command/monitoring/stop',
	resolve => () => resolve()
);

export const fetchSuccess = createAction('@fetch/success', resolve => () =>
	resolve()
);

export const fetchFailure = createAction('@fetch/failure', resolve => () =>
	resolve()
);
