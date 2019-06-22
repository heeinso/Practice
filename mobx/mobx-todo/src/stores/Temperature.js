import {
	autorun,
	flow,
	observable,
	onBecomeObserved,
	onBecomeUnobserved,
} from 'mobx';
import { asComponent } from '../utils/asComponent';

export const LazyTemperatureExample = asComponent(() => {
	const temperatureService = {
		fetch(location) {
			console.log('Invoked temperature-fetch');

			return new Promise(resolve =>
				setTimeout(resolve(Math.round(Math.random() * 35)), 200)
			);
		},
	};

	class City {
		@observable temperature;
		@observable location;

		interval;
		disposers;

		constructor(location) {
			this.location = location;
			const disposer1 = onBecomeObserved(this, 'temperature', this.onActivated);
			const disposer2 = onBecomeUnobserved(
				this,
				'temperature',
				this.onDeactivated
			);

			this.disposers = [disposer1, disposer2];
		}

		onActivated = () => {
			this.interval = setInterval(() => this.fetchTemperature(), 5000);
			console.log('Temperature activated');
		};

		onDeactivated = () => {
			console.log('Temperature deactivated');
			this.temperature = undefined;
			clearInterval(this.interval);
		};

		fetchTemperature = flow(function*() {
			this.temperature = yield temperatureService.fetch(this.location);
		});

		cleanup() {
			this.disposers.forEach(disposer => disposer());
			this.disposers = undefined;
		}
	}

	const city = new City('Seoul');
	const disposer = autorun(() =>
		console.log(`Temperature in ${city.location} is ${city.temperature}ºC`)
	);

	setTimeout(disposer, 15000);
});
