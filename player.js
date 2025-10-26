var Player = function () {
	this.canvas = document.getElementById('game-canvas'),
	this.context = this.canvas.getContext('2d'),
	
	this.lastAnimationFrameTime = 0,
    this.fps = 60,
	
	this.animationRate = 10,
	this.playerMoveSpeed = 1,
	this.spritesheet = new Image(),
	this.playerCellWidth = 40,
	this.playerCellHeight = 49,
	
	this.sprites = [],
	
	this.playerCellsUp = [
		{left: 17, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 81, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 146, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 211, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 273, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 338, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 403, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 468, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 530, top: 13, width: this.playerCellWidth, height: this.playerCellHeight},
	],
	
	this.playerCellsLeft = [
		{left: 7, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 79, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 146, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 207, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 267, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 326, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 388, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 451, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 518, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
	],
	
	this.playerCellsDown = [
		{left: 17, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 81, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 146, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 211, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 273, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 338, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 402, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 465, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 530, top: 141, width: this.playerCellWidth, height: this.playerCellHeight},
	],
	
	this.playerCellsRight = [
		{left: 20, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 84, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 148, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 211, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 273, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 337, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 402, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 468, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 533, top: 204, width: this.playerCellWidth, height: this.playerCellHeight},
	],
	
	this.animationBehavior = {
		lastAdvanceTime: 0,
      
		execute: function (sprite, now, fps, context, lastAnimationFrameTime) {
			if (sprite.animationRate === 0) {
				return;
			}
			 
			if (this.lastAdvanceTime === 0) {  // skip first time
				this.lastAdvanceTime = now;
			}
			else if (now - this.lastAdvanceTime > 
					1000 / sprite.animationRate) {
				sprite.artist.advance();
				this.lastAdvanceTime = now;
			}
		}      
    },
	
		this.movementBehavior = {
		execute: function (sprite) {
			sprite.left += sprite.velocityX;
			sprite.top += sprite.velocityY;
		}      
    }
};


Player.prototype = {
    createSprites: function () {
        this.createPlayerSprite();
        //this.initializeSprites();
        this.addSpritesToSpriteArray();
    },

    addSpritesToSpriteArray: function () {
        this.sprites.push(this.player);
    },
	
	createPlayerSprite: function () {
        var playerLeft = 50,
            playerHeight = 46,
            initialAnimationRate = 0;

        this.player = new Sprite('player', new SpriteSheetArtist(this.spritesheet, this.playerCellsRight), [this.animationBehavior, this.movementBehavior]);
		
        this.player.animationRate = initialAnimationRate;
        this.player.left = playerLeft;
        this.player.top = playerHeight;
		this.player.velocityX = 0;
		this.player.velocityY = 0;
		
        this.sprites.push(this.player);
    },
	
	updateSprites: function (now) {
        var sprite;

        for (var i=0; i < this.sprites.length; ++i) {
            sprite = this.sprites[i];
			sprite.update(now, this.fps, this.context, this.lastAnimationFrameTime);
			
            //if (sprite.visible && this.isSpriteInView(sprite)) {
            //    sprite.update(now, this.fps, this.context, this.lastAnimationFrameTime);
			//}
		}
    },
	
	drawSprites: function() {
		var sprite;
		var player = this.player;

		for (var i=0; i < this.sprites.length; ++i) {
			sprite = this.sprites[i];
			this.context.translate(-sprite.hOffset, 0);
			sprite.draw(this.context);
			this.context.translate(sprite.hOffset, 0);
			
	/* unsure if the "if" statement is neeeded in our case
			if (sprite.visible && this.isSpriteInView(sprite)) {
				this.context.translate(-sprite.hOffset, 0);
				sprite.draw(this.context);
				this.context.translate(sprite.hOffset, 0);
			} */
		}
    },
	
	draw: function (now) {
		this.updateSprites(now);
        this.drawSprites();
	},
	
	moveStop: function () {
        this.player.velocityX = 0;
        this.player.velocityY = 0;
        this.player.animationRate = 0;
    },
	
	moveUp: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsUp;
		this.player.velocityX = 0;
		this.player.velocityY = -this.playerMoveSpeed;
   },
   
   	moveLeft: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsLeft;
		this.player.velocityX = -this.playerMoveSpeed;
		this.player.velocityY = 0;
   },
   
   	moveDown: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsDown;
		this.player.velocityX = 0;
		this.player.velocityY = this.playerMoveSpeed;
   },
   
   	moveRight: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsRight;
		this.player.velocityX = this.playerMoveSpeed;
		this.player.velocityY = 0;
   },
   
    initializePlayerImages: function () {
        this.spritesheet.src = './game_project_sprites/main_spritesheet.png';
   }
};


window.addEventListener('keydown', function (e){
    var key = e.keyCode;

	if (key === 87 || key === 38) { 	 // 'w' or up arrow
		player.moveUp();
	}
	else if (key === 65 || key === 37) { // 'a' or left arrow
		player.moveLeft();
	}
	else if (key === 83 || key === 40) { // 's' or down arrow
		player.moveDown();
	}
	else if (key === 68 || key === 39) { // 'd' or right arrow
		player.moveRight();
	}
});

window.addEventListener('keyup', function (e){
    var key = e.keyCode;

	if (key === 87 || key === 38 || key === 65 || key === 37 || key === 83 || key === 40 || key === 68 || key === 39)
    {
		player.moveStop();
	}
});

var player = new Player();