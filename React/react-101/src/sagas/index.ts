import { all, fork, take, select, delay, put, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as Actions from '../actions';
import * as Api from '../apis/orders';
import { StoreState } from '../types';

function* monitoringWorkflow() {
	while (true) {
		yield take(getType(Actions.startMonitoring));

		let polling = true;

		while (polling) {
			try {
				const [succResp, failResp] = yield all([
					call(Api.fetchNumberOfSuccessfulOrder),
					call(Api.fetchNumberOfFailedOrder),
				]);

				yield put(
					Actions.updateOrderStatus(
						succResp.result.success,
						failResp.result.failure
					)
				);
			} catch (err) {
				if (err instanceof Api.ApiError) {
					yield put(Actions.addNotification('error', err.errorMessage));
				} else {
					console.error(err);
				}
			}

			const { monitoring, duration }: StoreState = yield select();

			if (!monitoring) {
				polling = false;
			}

			yield delay(duration);
		}
	}
}

export default function*() {
	yield fork(monitoringWorkflow);
}
