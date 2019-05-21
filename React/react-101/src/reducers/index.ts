import { ActionType, getType } from 'typesafe-actions';
import { StoreState } from '../types';
import * as Actions from '../actions';

const initializeState: StoreState = {
	monitoring: false,
	monitoringDuration: 200,
	success: 0,
	failure: 0,
};

export default (
	state: StoreState = initializeState,
	action: ActionType<typeof Actions>
) => {
	switch (action.type) {
		case getType(Actions.startMonitoring):
			return {
				...state,
				monitoring: true,
			};
		case getType(Actions.stopMonitoring):
			return {
				...state,
				monitoring: false,
			};
		case getType(Actions.updateOrderStatus):
			return {
				...state,
				...action.payload,
			};
		default:
			return Object.assign({}, state);
	}
};
