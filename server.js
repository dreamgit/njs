var config = require('./config');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sessionStore = new mongoStore({
	url: config.get('db:connection') + config.get('db:name')
});
var passportSocketIo = require("passport.socketio");

var socket = require('./app/socket.js');

mongoose.connect(config.get('db:connection') + config.get('db:name'));

require('./app/passport.js')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	secret: config.get('session:secret'),
	cookie: config.get('session:cookie'),
	resave: false,
	saveUninitialized: true,
	store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || config.get("port"));
app.set('view engine', 'ejs');
app.set('templates_dir', 'templates/template.ejs');

io.use(passportSocketIo.authorize({
	cookieParser: cookieParser,
	key: 'connect.sid',
	secret: config.get('session:secret'),
	store: sessionStore,
	success: socket.AuthSuccess,
	fail: socket.AuthFail
}));
io.set('origins', config.get('io:domain') + config.get('io:port'));

require('./app/routes.js')(app, passport);
require('./app/game_chat.js')(io);
require('./app/game_socket.js')(io);

http.listen(app.get('port'));
console.log('Server START on ' + app.get("port") + ' port');
