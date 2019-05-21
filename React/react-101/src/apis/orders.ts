import axios, { AxiosResponse } from 'axios';
import endpoint from './endpoint.config';

interface RequestSuccessResp {
	status: string;
}

interface numberOfSuccessfulOrderResp extends RequestSuccessResp {
	result: {
		success: number;
	};
}

interface numberOfFailedOrderResp extends RequestSuccessResp {
	result: {
		failure: number;
	};
}

export function fetchNumberOfSuccessfulOrder(): Promise<
	numberOfSuccessfulOrderResp
> {
	return new Promise((resolve, reject) => {
		axios
			.get(endpoint.orders.request.success)
			.then((resp: AxiosResponse) => resolve(resp.data))
			.catch(reject);
	});
}

export function fetchNumberOfFailedOrder(): Promise<numberOfFailedOrderResp> {
	return new Promise((resolve, reject) => {
		axios
			.get(endpoint.orders.request.failure)
			.then((resp: AxiosResponse) => resolve(resp.data))
			.catch(reject);
	});
}
