require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
// const hbs          = require('hbs');
// const mongoose     = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

// Database connection require
require('./configs/db.config');

// Passport config
require('./configs/passport.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//?? We are allowing data coming from port 3000.
//Cors setup
app.use(
	cors({
		origin: [ 'http://localhost:3000' ], //?? needs URL from front end
		credentials: true
	})
);

// Session middleware
app.use(
	session({
		secret: process.env.SESS_SECRET,
		resave: true,
		saveUninitialized: true
	})
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup
app.use(
	require('node-sass-middleware')({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		sourceMap: true
	})
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'En Route - Generated with Passion';

//Routes middleware
app.use('/api', require('./routes/index'));
app.use('/api', require('./routes/ride.routes'));
app.use('/api', require('./routes/comment.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/fileUpload.routes'));
app.use('/api', require('./routes/user.routes'));

//Environments setup

if (process.env.NODE_ENV === 'production') {
	// set ability to get static values from client build folder
	// static files include all javascript and css files
	app.use(express.static('client/build'));

	app.get('*', function (req, res) {
		const index = path.join(__dirname, 'build', 'index.html');
		res.sendFile(index);
	  });

	// get the index.html that will be rendered on the browser
/* 	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '../client', 'build', 'index.html'));
	}); */
}





module.exports = app;
