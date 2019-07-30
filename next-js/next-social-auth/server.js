require('dotenv').config();

const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const authRouter = require('./lib/router');
const passportInit = require('./lib/passport');
const { CLIENT_ORIGIN } = require('./config');

const port = 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';

const nextApp = next({
	dir: '.',
	dev,
});

const handle = nextApp.getRequestHandler();

const server = express();
const socketServer = require('http').Server(server);
const io = require('socket.io')(socketServer);

io.on('connection', socket => {
	socket.on('io', data => {
		messages.push(data);
		socket.broadcast.emit('io', data);
	});
});

nextApp
	.prepare()
	.then(() => {
		server.use(express.json());
		server.use(passport.initialize());
		passportInit();

		server.use(
			cors({
				origin: CLIENT_ORIGIN,
			})
		);

		server.use(
			session({
				secret: process.env.SESSION_SECRET,
				resave: true,
				saveUninitialized: true,
			})
		);

		server.set('io', io);

		server.get('/wake-up', (req, res) => res.send('👍'));

		server.use('/api', authRouter);

		server.all('*', (req, res) => handle(req, res));

		server.listen(port, () => {
			console.log(`> Ready on port ${port}`);
		});
	})
	.catch(err => {
		console.log('An error occurred, unable to start the server');
		console.log(err);
	});
