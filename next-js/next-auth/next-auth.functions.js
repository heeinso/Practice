require('dotenv').load();

const MongoClient = require('mongodb').MongoClient;
const NeDB = require('nedb');
const MongoObjectId = process.env.MONGO_URI
	? require('mongodb').ObjectId
	: id => {
			return id;
	  };

const nodemailer = require('nodemailer');
const nodemailerSmtpTransport = require('nodemailer-smtp-transport');
const nodemailerDirectTransport = require('nodemailer-direct-transport');

let nodemailerTransport = nodemailerDirectTransport();
if (
	process.env.EMAIL_SERVER &&
	process.env.EMAIL_USERNAME &&
	process.env.EMAIL_PASSWORD
) {
	nodemailerTransport = nodemailerSmtpTransport({
		host: process.env.EMAIL_SERVER,
		port: process.env.EMAIL_PORT || 25,
		secure: process.env.EMAIL_SECURE || true,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
}

module.exports = () => {
	return new Promise((resolve, reject) => {
		if (process.env.MONGO_URI) {
			MongoClient.connect(process.env.MONGO_URI, (err, mongoClient) => {
				if (err) return reject(err);
				const dbName = process.env.MONGO_URI.split('/')
					.pop()
					.split('?')
					.shift();
				const db = mongoClient.db(dbName);
				return resolve(db.collection('users'));
			});
		} else {
			let collection = new NeDB({ autoload: true });
			collection.loadDatabase(err => {
				if (err) return reject(err);
				resolve(collection);
			});
		}
	}).then(userCollection => {
		return Promise.resolve({
			find: ({ id, email, emailToken, provider } = {}) => {
				let query = {};

				if (id) {
					query = { _id: MongoObjectId(id) };
				} else if (email) {
					query = { email: email };
				} else if (emailToken) {
					query = { emailToken: emailToken };
				} else if (provider) {
					query = { [`${provider.name}.id`]: provider.id };
				}

				return new Promise((resolve, reject) => {
					usersCollection.findOne(query, (err, user) => {
						if (err) return reject(err);
						return resolve(user);
					});
				});
			},
			insert: (user, oAuthProfile) => {
				return new Promise((resolve, reject) => {
					usersCollection.insert(user, (err, response) => {
						if (err) {
							return reject(err);
						}
						if (!user._id && response._id) {
							user._id = response._id;
						}

						return resolve(user);
					});
				});
			},
			update: (user, profile) => {
				return new Promise((resolve, reject) => {
					usersCollection.update(
						{ _id: MongoObjectId(user._id) },
						user,
						{},
						err => {
							if (err) return reject(err);
							return resolve(user);
						}
					);
				});
			},
			remove: id => {
				return new Promise((resolve, reject) => {
					usersCollection.remove({ _id: MongoObjectId(id) }, err => {
						if (err) return reject(err);
						return resolve(true);
					});
				});
			},
			serialize: user => {
				if (user.id) {
					return Promise.resolve(user.id);
				} else if (user._id) {
					return Promise.resolve(user._id);
				} else {
					return Promise.reject(new Error('Unable to serialise user'));
				}
			},
			deserialize: id => {
				return new Promise((resolve, reject) => {
					usersCollection.findOne({ _id: MongoObjectId(id) }, (err, user) => {
						if (err) {
							return reject(err);
						}
						if (!user) {
							return resolve(null);
						}
						return resolve({
							id: user._id,
							name: user.name,
							email: user.email,
							emailVerified: user.emailVerified,
							admin: user.admin || false,
						});
					});
				});
			},
			sendSignInEmail: ({ email, url, req }) => {
				nodemailer.createTransport(nodemailerTransport).sendMail(
					{
						to: email,
						from: process.env.EMAIL_FROM,
						subject: 'Sign in link',
						text: `Use the link below to sign in:\n\n${url}\n\n`,
						html: `<p>Use the link below to sign in:</p><p>${url}</p>`,
					},
					err => {
						if (err) {
							console.error('Error sending email to ' + email, err);
						}
					}
				);
				if (process.env.NODE_ENV === 'development') {
					console.log('Generated sign in link ' + url + ' for ' + email);
				}
			},
		});
	});
};
