var blockWidth = 101;
var blockHeight = 83;
var canvas = {
  "left" : 0,
  "top" : 0,
  "right" : 400,
  "bottom" : 400,
}
// The SuperClass of Enemy and Player
var Performer = function(sprite, x, y) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
}
Performer.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(sprite, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    sprite = 'images/enemy-bug.png';
    Performer.call(this, sprite, x, y);
    this.speed = Math.floor(Math.random()*(blockWidth - blockHeight + 1) + blockHeight);
};
Enemy.prototype = Object.create(Performer.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.yPosition = [68, 151, 234];
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= canvas.right) {
      this.x += this.speed * dt;
    } else {
        this.x = - blockWidth;
        this.y = this.yPosition[Math.floor(Math.random() * 4)];
    }
    // console.log(this.x + ',' + this.y);

    // Handles collision with the Player
    if (checkCollision(this, player)) {
      player.reset();
    }
};

function checkCollision(object, player) {
  return (Math.abs(player.x - object.x) < blockWidth/2 && Math.abs(player.y - object.y) < blockHeight/2);
}
// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite, x, y) {
  sprite = 'images/char-boy.png';
  x = 200;
  y = 400;
  Performer.call(this, sprite, x, y);
};
Player.prototype = Object.create(Performer.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
  switch (this.action) {
    case 'left':
      if (this.x > canvas.left) {
        this.x -= blockWidth;
      }
      break;
    case 'up':
      if (this.y > canvas.top) {
        this.y -= blockHeight;
      }
      break;
    case 'right':
      if (this.x < canvas.right) {
        this.x += blockWidth;
      }
      break;
    case 'down':
      if (this.y < canvas.bottom) {
        this.y += blockHeight;
      }
      break;
    default:
  }

  // console.log(this.x + ',' + this.y);
  //reset action
  this.action = null;
  //reset player if on water
  if(this.y < 25) {
    this.reset();
  }
};
// Player.prototype.render = function() {
//   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
Player.prototype.handleInput = function(e) {
  this.action = e;
};
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(-100, 68),
  new Enemy(-100, 151),
  new Enemy(-100, 234)
];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
