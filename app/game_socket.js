var game = require('./jgame.js');
game.initGame(10);

module.exports = function(io) {

	var roulette = io.of('/roulette');

	roulette.on('connection', function(socket) {

		var user = socket.request.user;
		var nick = socket.request.user.local.email;
		var money = socket.request.user.roulette.money;

		console.log('\n - - - connect "GAME_SOCKET.JS" at socket.id: ' + socket.id);

		game.games[0].playerJoin(user, nick, money);
		roulette.emit('playerJoin', nick, money);

		socket.on('disconnect', function(socket) {
			console.log('\n - - - "GAME_SOCKET.JS" DISconnect');
			game.games[0].playerLeave(user, nick, money);
		});

	});

	exports.startTimeForBet = function(timeForBet) {
		roulette.emit('startTimeForBet', timeForBet)
	};

};
