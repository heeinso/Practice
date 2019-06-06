require('dotenv').load();

const nextAuthProviders = require('./next-auth.providers');
const nextAuthFunctions = require('./next-auth.functions');

const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

let sessionStore;
if (process.env.MONGO_URI) {
	sessionStore = new MongoStore({
		url: process.env.MONGO_URI,
		autoRemove: 'interval',
		autoRemoveInterval: 10, // Removes expired sessions every 10 minutes
		collection: 'sessions',
		stringify: false,
	});
}

module.exports = () => {
	return nextAuthFunctions().then(functions => {
		return new Promise((resolve, reject) => {
			resolve({
				port: process.env.PORT || 3000,
				sessionSecret: 'change-me',
				sessionMaxAge: 60000 * 60 * 24 * 7,
				sessionRevalidateAge: 60000,
				serverUrl: process.env.SERVER_URL || null,
				expressSession: expressSession,
				sessionStore: sessionStore,
				providers: nextAuthProviders(),
				functions: functions,
			});
		});
	});
};
