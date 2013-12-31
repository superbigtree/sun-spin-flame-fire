var inherits = require('inherits');
var Entity = require('crtrdg-entity');

var randomInt = require('../util/math').randomInt;
var randomRGB = require('../util/math').randomRGB;
var randomRGBA = require('../util/math').randomRGBA;

module.exports = Enemy;
inherits(Enemy, Entity);

function Enemy(options){
  var self = this;
  options || (options = {});
  this.game = options.game || {};

  this.size = {
    x: options.size ? options.size.x : 100,
    y: options.size ? options.size.x : 100
  };

  this.position = { 
    x: options.position ? options.position.x : 50, 
    y: options.position ? options.position.y : 50
  };

  this.velocity = {
    x: options.velocity ? options.velocity.x : 10,
    y: options.velocity ? options.velocity.y : 10
  };

  this.health = options.health || 200;
  this.speed = options.speed || 15;
  this.friction = options.friction || 0.8;
  this.colorMax = 175;
  this.blockSize = 15;
  
  this.on('update', function(interval){
    self.move();
    self.boundaries();
  });

  this.on('draw', function(ctx){
    ctx.save();
    ctx.fillStyle = randomRGBA(0, 100, 0, 100, 200, 255, 0.3);                
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.restore(); 
  });
}

Enemy.prototype.move = function(){
  this.position.x += this.velocity.x * this.friction;
  this.position.y += this.velocity.y * this.friction;
};

Enemy.prototype.boundaries = function(){
  if (this.position.x < -this.size.x) this.position.x = this.game.width;
  if (this.position.y < -this.size.y) this.position.y = this.game.height;
  if (this.position.x >= this.game.width + this.size.x) this.position.x = -this.size.x;
  if (this.position.y >= this.game.height + this.size.y) this.position.y = -this.size.y;
};

Enemy.prototype.blowUp = function(){

};