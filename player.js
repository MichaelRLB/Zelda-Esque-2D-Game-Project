// Player variable that holds all the information for the player
var Player = function () {
	
	// Gets the <canvas> element the game runs on
	this.canvas = document.getElementById('game-canvas'),
	this.context = this.canvas.getContext('2d'),
	
	// For keeping the animations at a consistent framerate
	this.lastAnimationFrameTime = 0,
    this.fps = 60,
	this.animationRate = 10,
	
	// Initial player variables
	this.playerMoveSpeed = 1.2,
	this.playerCellWidth = 41,
	this.playerCellHeight = 49,
	
	// Player movemnt keybind variables
	this.isMovingUp = false;
	this.isMovingLeft = false;
	this.isMovingDown = false;
	this.isMovingRight = false;
	
	// Initailizes the player image / spritesheet
	this.spritesheet = new Image(),
	this.sprites = [],
	
	// The player spritesheet cells for the different animations
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
	
	// "playerCellsLeft" uses "-this.playerCellWidth" because I used the right side of the cell on the spritesheet instead of the left 
	// This is because the moving left animation has a lot of variation from where its cell's start (casued by the sword swaying)
	// This caused the animation to look weird and switching the using the more consistent right side of the cell (the sprire's back) fixes the weird animation
	this.playerCellsLeft = [
		{left: 17, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 81, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 146, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 211, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 273, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 338, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 403, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 468, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 530, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
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
	
	// Function for animating the player sprite (taken straight from snailbait)
	this.animationBehavior = {
		lastAdvanceTime: 0,
      
		execute: function (sprite, now, fps, context, lastAnimationFrameTime) {
			if (sprite.animationRate === 0) {
				return;
			}
			 
			if (this.lastAdvanceTime === 0) {
				this.lastAdvanceTime = now;
			}
			else if (now - this.lastAdvanceTime > 
					1000 / sprite.animationRate) {
				sprite.artist.advance();
				this.lastAdvanceTime = now;
			}
		}      
    },
	
	// Function for moving the player sprite 
	// "velocity" is really just adding pixel values to the sprites placement on the screen
		this.movementBehavior = {
		execute: function (sprite) {
			sprite.left += sprite.velocityX;
			sprite.top += sprite.velocityY;
		}      
    }
};

// Player prototype that initailizes most of the functions for the player 
// (theoretically this should be in the main file and have all the moving sprites use it but oh well)
// Will probably fix that later
Player.prototype = {
	
	// Initailizes the player sprite (part 1)
    createSprites: function () {
        this.createPlayerSprite();
        this.addSpritesToSpriteArray();
    },

	// Initailizes the player sprite (part 2)
    addSpritesToSpriteArray: function () {
        this.sprites.push(this.player);
    },
	
	// Sets all the variables for the player sprite
	createPlayerSprite: function () {
		// playerLeft & playerHeight = the spawn position of the player sprite
        var playerLeft = 300,
            playerHeight = 300,
            initialAnimationRate = 0;

        this.player = new Sprite('player', new SpriteSheetArtist(this.spritesheet, this.playerCellsUp), [this.animationBehavior, this.movementBehavior]);
		
        this.player.animationRate = initialAnimationRate;
        this.player.left = playerLeft;
        this.player.top = playerHeight;
		this.player.velocityX = 0;
		this.player.velocityY = 0;
		
        this.sprites.push(this.player);
    },
	
	// Updates the sprite's position / functions (I'm pretty sure) (taken straight from snailbait)
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
	
	// Actaully draws the sprite on the screen after its variables have been updated (taken straight from snailbait)
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
	
	// This function is called by the main file to draw the player sprite "player.draw(now);"
	draw: function (now) {
		this.updateSprites(now);
        this.drawSprites();
	},
	
	// Movement functions that set what spritesheet cells the player uses & the direction they move
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
		player.isMovingUp = true;
   },
   
   	moveLeft: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsLeft;
		this.player.velocityX = -this.playerMoveSpeed;
		this.player.velocityY = 0;
		player.isMovingLeft = true;
   },
   
   	moveDown: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsDown;
		this.player.velocityX = 0;
		this.player.velocityY = this.playerMoveSpeed;
		player.isMovingDown = true;
   },
   
   	moveRight: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsRight;
		this.player.velocityX = this.playerMoveSpeed;
		this.player.velocityY = 0;
		player.isMovingRight = true;
   },
   
	// Gets the spritesheet png for the player to use
    initializePlayerImages: function () {
        this.spritesheet.src = './game_project_sprites/main_spritesheet.png';
   }
};

// Keybind functions (part 1 - movement)
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

// Keybind functions (part 2 - stop moving)
window.addEventListener('keyup', function (e){
    var key = e.keyCode;

	if (key === 87 || key === 38 || key === 65 || key === 37 || key === 83 || key === 40 || key === 68 || key === 39)
    {
		if (key === 87 || key === 38) {
			player.isMovingUp = false;
		}
		else if (key === 65 || key === 37) {
			player.isMovingLeft = false;
		}
		else if (key === 83 || key === 40) {
			player.isMovingDown = false;
		}
		else if (key === 68 || key === 39) {
			player.isMovingRight = false;
		}
		
		if (!player.isMovingUp && !player.isMovingLeft && !player.isMovingDown && !player.isMovingRight) {
			player.moveStop();
		}
	}
});

// Initializes all the above code as a variable that can be used in other .js files
var player = new Player();