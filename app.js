'use strict';

var siegrune = require('siegrune');

var app = siegrune.createServer();

app.setPort(2333);

app.get(/^\/css\/(.*)/, function(req, res){
	res.dir('./css');
});

app.get('/', function(req, res){
	res.render('./view/game.htm', {
		title: '装逼三国',
		server: '装逼三国-桃园结义'
	});
});

app.listen();