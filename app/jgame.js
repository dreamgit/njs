var socket = require('./game_socket.js');

var games = [];
exports.games = games;

var JGame = function(gameNum, roundTime) {
	this.gameNum = gameNum;
	this.roundTime = roundTime;

	this.gameStatus = 0;
	this.players = {};
	this.cells = {};
};

exports.initGame = function(roundTime) {
	var gameNum = games.length;
	games[gameNum] = new JGame(gameNum, roundTime);
	console.log('\n - - - initGame: > ' + gameNum + ' (' + roundTime + ' sec) < at  ' + new Date() + '\n');
};

JGame.prototype.playerJoin = function(user, nick, money) {
	console.log('\n - - - player: ' + nick + ' (' + money + ' money) Join to > ' + this.gameNum + ' (' + this.roundTime + ' sec) < at  ' + new Date() + '\n');
	this.players[user.id] = {'nick': nick, 'money': money};
	console.log(this.players);
	this.checkgameStatus();
};

JGame.prototype.playerLeave = function(user, nick, money) {
	console.log('\n - - - player: ' + nick + ' (' + money + ' money) Leave from > ' + this.gameNum + ' (' + this.roundTime + ' sec) < at  ' + new Date() + '\n');

	for (var key in this.players) {
		if (key === user.id) {
			delete this.players[key]
		}
	}
	console.log(this.players);

	this.gameStatus = 0;
};

JGame.prototype.checkgameStatus = function() {
	console.log('JGame Status: ' + this.gameStatus);
	switch (this.gameStatus) {
		case 0:
			this.startRound();
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
	}
};

JGame.prototype.startRound = function() {
	this.gameStatus = 1;
	this.startTimeForBet();
};

JGame.prototype.startTimeForBet = function() {
	var timeForBet = this.roundTime;

};

// JGame.prototype.addBet = function(player,bet,cell){
// 	this.cells[cell]={	player:player,
// 						bet:bet	      };
// };
// JGame.prototype.startRound = function(){
// 	if (this.players.length > 1)
// 		return this.playerSitOnTable();
// 	this.playerSitOnTable();
// 	this.startTimeout();

// }
// JGame.prototype.startTimeout = function(){

// }
// var i=30;
// while(i>0){
// 	setTimeout(function() {
// 		i-=1;
// 		soketEmit(i)
// 	}, 1000);
// }

// games[0].addBet(player,bet,cell)
