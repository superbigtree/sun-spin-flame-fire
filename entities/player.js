var inherits = require('inherits');
var Entity = require('crtrdg-entity');

var randomInt = require('../util/math').randomInt;
var randomRGB = require('../util/math').randomRGB;
var randomRGBA = require('../util/math').randomRGBA;

module.exports = Player;
inherits(Player, Entity);

function Player(options){
	var self = this;
  options || (options = {});
  this.game = options.game || {};
  this.mouse = options.mouse;
  this.keysDown = options.keysDown;

  this.position = options.position || { x: 0, y: 0 };
  this.size = options.size || { x: 40, y: 40 };
  this.speed = options.speed || 22;
  this.color = randomRGBA(15, 255, 15, 255, 15, 255, .95);
  this.attacking = false;
  this.attackSize = 1;

  this.on('update', function(interval){
  	self.input(interval);
  	self.boundaries(interval);
  });

	this.on('draw', function(c){
	  if (self.attacking) self.drawAttack(c);
	  else self.drawIdle(c);
	});

	this.mouse.on('click', function(e){
		if (self.attacking) {
			self.attacking = false;
			self.attackSize = 1;
		}
		else {
			self.attacking = true;
		}
	});
}


Player.prototype.input = function(interval){
  if ('W' in this.keysDown) this.position.y -= this.speed;
  if ('S' in this.keysDown) this.position.y += this.speed;
  if ('A' in this.keysDown) this.position.x -= this.speed;
  if ('D' in this.keysDown) this.position.x += this.speed;
}

Player.prototype.boundaries = function(interval){
  if (this.position.x < -this.size.x) this.position.x = this.game.width;
  if (this.position.y < -this.size.y) this.position.y = this.game.height;
  if (this.position.x >= this.game.width + this.size.x)this.position.x = -this.size.x;
  if (this.position.y >= this.game.height + this.size.y)this.position.y = -this.size.y;
}

Player.prototype.drawAttack = function(c) {
  for (var w=0; w<20; w++){
    c.save();
    c.translate(this.position.x, this.position.y)
    c.rotate(Math.PI/20 * randomInt(-20, 20));
    c.fillStyle = randomRGBA(200, 225, 20, 50, 0, 0, .35);
    c.fillRect(
    	-this.size.x/2, 
    	-this.size.y/2-30, 
    	randomInt(10, 80), 
    	randomInt(60, this.attackSize)
    );
    c.restore();
  }
  this.attackSize += 10;
}

Player.prototype.drawIdle = function(c){
	for (var w=0; w<3; w++){
    c.save();
    c.translate(this.position.x, this.position.y)
    c.rotate(Math.PI/180 * randomInt(-180, 180));
    c.fillStyle = randomRGBA(255, 255, 255, 255, 15, 255, .25);
    c.fillRect(
    	-this.size.x/2, 
    	-this.size.y/2, 
    	this.size.x, 
    	this.size.y
    );
    c.restore();
  }
}