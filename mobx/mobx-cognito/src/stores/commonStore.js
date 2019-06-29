import { action, observable } from 'mobx';

class CommonStore {
	@observable appName = 'mobx-cognito';
	@observable appLoaded = false;
	@observable isLoadingTags = false;

	@action
	setAppLoaded() {
		this.appLoaded = true;
	}
}

export default new CommonStore();
