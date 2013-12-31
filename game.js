/*
* crtrdg.js modules
*/

var Game = require('crtrdg-gameloop');
var Mouse = require('crtrdg-mouse');
var Keyboard = require('crtrdg-keyboard');


/*
* custom modules
*/

var randomInt = require('./util/math').randomInt;
var randomRGB = require('./util/math').randomRGB;
var randomRGBA = require('./util/math').randomRGBA;


/*
* entities
*/

var Player = require('./entities/player');
var Enemy = require('./entities/enemy');


/*
* create game object
*/

var game = new Game({
  canvas: 'game',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: randomRGBA(0, 256, 0, 256, 0, 256, 0.3)
});

var mouse = new Mouse(game);
var keyboard = new Keyboard(game);

mouse.on('click', function(e){
  game.backgroundColor = randomRGBA(0, 256, 0, 256, 0, 256, 0.3);
});

game.on('update', function(interval){
});

var size = 5;
var columns = game.width / size;
var rows = game.height / size;

game.on('draw', function(c){
  for (var h=0; h<rows; h+=randomInt(5, 20)){
    c.save();
    c.translate(game.width / 2, 0);
    c.rotate(Math.PI / randomInt(100, -180));
    c.fillStyle = randomRGBA(100, 255, 200, 255, 200, 255, 0.1);
    c.fillRect(-game.width/2-50, size*h-30, game.width+100, randomInt(100, 1000));
    c.restore();
  }

  for (var w=0; w<columns; w+=randomInt(5, 20)){
    c.fillStyle = randomRGBA(100, 255, 100, 200, 100, 211, .6);
    c.fillRect(size*w, randomInt(0, game.height), randomInt(1, 3), randomInt(1, 3));    
  }
});


var player = new Player({
  game: game,
  mouse: mouse,
  keysDown: keyboard.keysDown,
  position: {
    x: game.width/2,
    y: game.height/2
  }
});

player.addTo(game);

var enemy = new Enemy({ game: game });
enemy.addTo(game);