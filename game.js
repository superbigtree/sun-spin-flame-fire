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
  height: window.innerHeight - 80,
  backgroundColor: randomRGBA(0, 256, 0, 256, 0, 256, 0.3)
});

var keyboard = new Keyboard(game);

game.on('update', function(interval){
  box.update(interval);
})

var size = 5;
var columns = game.width / size;
var rows = game.height / size;

game.on('draw', function(c){

  //for (var h=0; h<rows; h+=randomInt(5, 20)){
    //c.save();
    //c.globalCompositeOperation = 'source-over';
    //c.translate(game.width / 2, 0);
    //c.rotate(Math.PI / randomInt(120, 180));
    //c.fillStyle = randomRGBA(200, 255, 200, 255, 200, 255, 0.3);
    //c.fillRect(-game.width/2, size*h-30, game.width+100, randomInt(1, 80));
    //c.restore();
  //}


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
  x: 0,
  y: 0,
  width: 40,
  height: 40,
  speed: 22,
  color: randomRGBA(15, 255, 15, 255, 15, 255, .95)
}

box.draw = function(c){
  for (var w=0; w<3; w++){
    c.save();
    c.translate(box.x, box.y)
    c.rotate(Math.PI/180 * randomInt(-180, 180));
    c.fillStyle = randomRGBA(255, 255, 255, 255, 15, 255, .25);
    c.fillRect(-box.width/2, -box.height/2, box.width, box.height);
    c.restore();
  }

}

box.update = function(interval){

  if ('W' in keyboard.keysDown) box.y -= box.speed;
  if ('S' in keyboard.keysDown) box.y += box.speed;
  if ('A' in keyboard.keysDown) box.x -= box.speed;
  if ('D' in keyboard.keysDown) box.x += box.speed;


  //if (box.x < 0) box.x = 0;
  //if (box.y < 0) box.y = 0;
  //if (box.x >= game.width - box.w) box.x = game.width - box.w;
  //if (box.y >= game.height - box.h) box.y = game.height - box.h;
}