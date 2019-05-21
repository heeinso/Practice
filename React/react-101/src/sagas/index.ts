import { all, fork, take, select, delay, put, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as Actions from '../actions';
import * as Api from '../apis/orders';

function* monitoringWorkflow() {
	while (true) {
		yield take(getType(Actions.startMonitoring));

		let polling = true;

		while (polling) {
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

			const { monitoring, monitoringDuration } = yield select();

			if (!monitoring) {
				polling = false;
			}

			yield delay(monitoringDuration);
		}
	}
}

export default function*() {
	yield fork(monitoringWorkflow);
}
