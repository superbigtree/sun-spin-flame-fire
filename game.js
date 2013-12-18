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

var huh = false;
mouse.on('click', function(e){
  if (!huh) huh = true;
  else huh = false;
  if (oh > 0) oh = 0;
  game.backgroundColor = randomRGBA(0, 256, 0, 256, 0, 256, 0.3);
});

game.on('update', function(interval){
  box.update(interval);
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

  box.draw(c);

  for (var w=0; w<columns; w+=randomInt(5, 20)){
    c.fillStyle = randomRGBA(100, 255, 100, 200, 100, 211, .6);
    c.fillRect(size*w, randomInt(0, game.height), randomInt(1, 3), randomInt(1, 3));    
  }
});

var box = {
  x: game.width/2,
  y: game.height/2,
  width: 40,
  height: 40,
  speed: 22,
  color: randomRGBA(15, 255, 15, 255, 15, 255, .95)
}

var oh = 1;
box.draw = function(c){
  for (var w=0; w<3; w++){
    c.save();
    c.translate(box.x, box.y)
    c.rotate(Math.PI/180 * randomInt(-180, 180));
    c.fillStyle = randomRGBA(255, 255, 255, 255, 15, 255, .25);
    c.fillRect(-box.width/2, -box.height/2, box.width, box.height);
    c.restore();
  }

  if (huh){
    for (var w=0; w<20; w++){
      c.save();
      c.translate(box.x, box.y)
      c.rotate(Math.PI/20 * randomInt(-20, 20));
      c.fillStyle = randomRGBA(200, 225, 20, 50, 0, 0, .35);
      c.fillRect(-box.width/2, -box.height/2-30, randomInt(10, 80), randomInt(60, oh));
      c.restore();
    }
    oh+=10;
  }
}

box.update = function(interval){
  if ('W' in keyboard.keysDown) box.y -= box.speed;
  if ('S' in keyboard.keysDown) box.y += box.speed;
  if ('A' in keyboard.keysDown) box.x -= box.speed;
  if ('D' in keyboard.keysDown) box.x += box.speed;

  if (box.x < -box.width) box.x = game.width;
  if (box.y < -box.height) box.y = game.height;
  if (box.x >= game.width + box.width) box.x = -box.width;
  if (box.y >= game.height + box.height) box.y = -box.height;
}