import * as AWSCognito from 'amazon-cognito-identity-js';
import { action, observable } from 'mobx';

import commonStore from './commonStore';

const userPool = new AWSCognito.CognitoUserPool({
	UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
	ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
});
let cognitoUser = null;

class AuthStore {
	@observable inProgress = false;
	@observable errors = undefined;
	@observable message = null;
	@observable currentUser = null;
	@observable oldPassword = '';
	@observable newPassword = '';
	@observable deleteButton = false;
	@observable values = {
		email: '',
		password: '',
		code: '',
	};

	@action
	setCurrentUser(userName) {
		this.currentUser = userName;
	}

	@action
	setCode(code) {
		this.values.code = code;
	}

	@action
	setEmail(email) {
		this.values.email = email;
	}

	@action
	setPassword(password) {
		this.values.password = password;
	}

	@action
	setOldPassword(password) {
		this.oldPassword = password;
	}

	@action
	setNewPassword(password) {
		this.newPassword = password;
	}

	@action
	setDeleteButton(press) {
		this.deleteButton = press;
	}

	@action
	setMessage(message) {
		this.message = message;
	}

	@action
	reset() {
		this.errors = '';
		this.message = '';
		this.deleteButton = false;
		this.values = {
			email: '',
			password: '',
			code: '',
		};
	}

	@action
	verifySession() {
		let hasSession = false;
		Object.keys(localStorage).every(key => {
			if (key.match('CognitoIdentityServiceProvider')) {
				hasSession = true;
			}
			return key;
		});
		return new Promise((resolve, reject) => {
			if (hasSession) {
				cognitoUser = userPool.getCurrentUser();
				return cognitoUser !== null ? resolve() : reject();
			} else {
				return reject();
			}
		})
			.then(
				() =>
					new Promise((resolve, reject) => {
						cognitoUser.getSession((err, session) => {
							return err ? reject(err) : resolve();
						});
					})
			)
			.then(
				() =>
					new Promise((resolve, reject) => {
						cognitoUser.getUserAttributes((err, attributes) => {
							if (err) {
								return reject(err);
							}
							resolve(attributes);
						});
					})
			)
			.then(
				attributes =>
					new Promise((resolve, reject) => {
						attributes.map(key => {
							if (key.Name === 'email') {
								this.setCurrentUser(key.Value);
							}
							return key;
						});
						resolve();
					})
			)
			.catch(() => {})
			.finally(() => commonStore.setAppLoaded());
	}

	@action
	login() {
		this.inProgress = true;
		this.errors = undefined;
		const email = this.values.email;

		let authenticationDetails = new AWSCognito.AuthenticationDetails({
			Username: email,
			Password: this.values.password,
		});

		cognitoUser = new AWSCognito.CognitoUser({
			Username: this.values.email,
			Pool: userPool,
		});

		return new Promise((resolve, reject) => {
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: result => {
					return resolve();
				},
				onFailure: err => {
					return reject(err);
				},
			});
		})
			.then(() => this.setCurrentUser(email))
			.catch(
				action(err => {
					this.errors = this.simpleErr(err);
					throw err;
				})
			)
			.finally(action(() => (this.inProgress = false)));
	}

	@action
	register() {
		this.inProgress = true;
		this.errors = undefined;

		return new Promise((resolve, reject) =>
			userPool.signUp(
				this.values.email,
				this.values.password,
				null,
				null,
				(err, result) => {
					if (err) {
						return reject(err);
					}
					cognitoUser = result;
					resolve();
				}
			)
		)
			.catch(
				action(err => {
					this.errors = this.simpleErr(err);
					throw err;
				})
			)
			.finally(action(() => (this.inProgress = false)));
	}

	@action
	confirmCode() {
		this.inProgress = true;
		this.errors = undefined;

		cognitoUser = new AWSCognito.CognitoUser({
			Username: this.values.email,
			Pool: userPool,
		});

		return new Promise((resolve, reject) =>
			cognitoUser.confirmRegistration(this.values.code, true, err => {
				return err ? reject(err) : resolve();
			})
		)
			.then(action(() => this.setMessage("You're confirmed! Please login...")))
			.catch(
				action(err => {
					this.errors = this.simpleErr(err);
					throw err;
				})
			)
			.finally(action(() => (this.inProgress = false)));
	}

	@action
	logout() {
		return new Promise(resolve => {
			if (cognitoUser !== null) {
				cognitoUser.signOut();
				cognitoUser = null;
			}
			this.setCurrentUser(null);
			resolve();
		});
	}

	@action
	changePassword() {
		this.inProgress = true;
		this.errors = undefined;

		return new Promise((resolve, reject) => {
			cognitoUser.changePassword(
				this.oldPassword,
				this.newPassword,
				(err, result) => {
					if (err) {
						return reject(err);
					}
					return resolve();
				}
			);
		})
			.then(action(() => this.setMessage('Changes saved.')))
			.catch(
				action(err => {
					this.errors = this.simpleErr(err);
					throw err;
				})
			)
			.finally(action(() => (this.inProgress = false)));
	}

	@action
	deleteAccount() {
		this.inProgress = true;
		this.errors = undefined;

		return new Promise((resolve, reject) => {
			if (!this.deleteButton) {
				return reject({
					message: 'To delete your account please click the checkbox.',
				});
			}
			cognitoUser.deleteUser((err, result) => {
				if (err) {
					return reject(err);
				}
				window.localStorage.clear();
				this.setCurrentUser(null);
				return resolve();
			});
		})
			.catch(
				action(err => {
					this.errors = this.simpleErr(err);
					throw err;
				})
			)
			.finally(action(() => (this.inProgress = false)));
	}

	simpleErr(err) {
		return {
			statusCode: err.statusCode,
			code: err.code,
			message: err.message,
		};
	}
}

export default new AuthStore();
