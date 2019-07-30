const providers = ['github'];

const callbacks = providers.map(provider => {
	return process.env.NODE_ENV === 'production'
		? `http://localhost:3000/${provider}/callback`
		: `http://localhost:3000/${provider}/callback`;
});

const [githubURL] = callbacks;

exports.API_URL =
	process.env.NODE_ENV === 'production'
		? 'http://localhost:3000'
		: 'http://localhost:3000';

exports.CLIENT_ORIGIN =
	process.env.NODE_ENV === 'production'
		? 'http://localhost:3000'
		: 'http://localhost:3000';

exports.GITHUB_CONFIG = {
	clientID: process.env.GITHUB_KEY,
	clientSecret: process.env.GITHUB_SECRET,
	callbackURL: githubURL,
};
