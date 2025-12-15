// Player variable that holds all the information for the player
var Player = function () {
	
	// Gets the <canvas> element the game runs on
	this.canvas = document.getElementById('game-canvas'),
	this.context = this.canvas.getContext('2d'),
	
	// For keeping the animations at a consistent framerate
	this.lastAnimationFrameTime = 0,
    this.fps = 60,
	this.animationRate = 12,
	
	// Initial player variables
	this.playerMoveSpeed = 4,
	this.playerCellWidth = 41,
	this.playerCellHeight = 49,
	this.playerHealth = 3,
	this.lastDamaged = 0;
	
	// Player movemnt keybind variables
	this.isMovingUp = false,
	this.isMovingLeft = false,
	this.isMovingDown = false,
	this.isMovingRight = false,
	this.playerDirection = 'Up',
	this.wallCollision = false,
	this.isAttacking = false,
	
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
		{left: 530, top: 13, width: this.playerCellWidth, height: this.playerCellHeight}
	],
	
	this.playerCellsLeft = [
		{left: 17, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 81, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 146, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 211, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 273, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 338, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 403, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 468, top: 76, width: this.playerCellWidth, height: this.playerCellHeight},
		{left: 530, top: 76, width: this.playerCellWidth, height: this.playerCellHeight}
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
		{left: 530, top: 141, width: this.playerCellWidth, height: this.playerCellHeight}
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
		{left: 533, top: 204, width: this.playerCellWidth, height: this.playerCellHeight}
	],
	
	this.playerAttackCellsUp = [
		{left: 35, top: 296, width: 53, height: 48},
		{left: 115, top: 296, width: 53, height: 48},
		{left: 195, top: 296, width: 53, height: 48},
		{left: 274, top: 296, width: 53, height: 48},
		{left: 351, top: 296, width: 53, height: 48}
	],
	
	this.playerAttackCellsLeft = [
		{left: 33, top: 384, width: 66, height: 49},
		{left: 107, top: 389, width: 66, height: 49},
		{left: 179, top: 390, width: 66, height: 49},
		{left: 254, top: 388, width: 66, height: 49},
		{left: 323, top: 387, width: 66, height: 49}
	],
	
	this.playerAttackCellsDown = [
		{left: 28, top: 470, width: 49, height: 53},
		{left: 94, top: 473, width: 49, height: 53},
		{left: 173, top: 479, width: 49, height: 53},
		{left: 268, top: 480, width: 49, height: 53},
		{left: 363, top: 482, width: 49, height: 53}
	],
	
	this.playerAttackCellsRight = [
		{left: 6, top: 565, width: 66, height: 48},
		{left: 72, top: 564, width: 66, height: 48},
		{left: 178, top: 565, width: 66, height: 48},
		{left: 274, top: 562, width: 66, height: 48},
		{left: 357, top: 564, width: 66, height: 48}
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
// Sword Audio
let swordSound = new Audio("Audio/Attack_sound.mp3")
// Death Audio
let deathTrack = new Audio("Audio/Death.mp3");
let deathAudioStarted = false;

// Necessary to allow death sound to play
window.addEventListener("keydown", () => {
    if (!deathAudioStarted) {
        // Audio isn't actually played here, just made ready to play
        deathTrack.play().catch(() => {});
        deathTrack.pause();
        deathTrack.currentTime = 0;
        deathAudioStarted = true;
    }
});

// Player prototype that initailizes most of the functions for the player 
Player.prototype = {
	
	// Initailizes the player sprite & sets all the variables for the player sprite
	createPlayerSprite: function () {
		//if (this.sprites.length > 0) { this.sprites.pop(); }
		// playerLeft & playerHeight = the spawn position of the player sprite
        var playerLeft = 1920 / 2,
            playerHeight = 1200,
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
		}
    },
	
	isAttackFinished: function() {
		if (this.player.artist.cellIndex >= 4 && player.isAttacking) {
			this.player.artist.cellIndex = 0;
			player.isAttacking = false;
			if (player.playerDirection == 'Up') { this.player.artist.cells = this.playerCellsUp}
			else if (player.playerDirection == 'Left') { this.player.artist.cells = this.playerCellsLeft }
			else if (player.playerDirection == 'Down') { this.player.artist.cells = this.playerCellsDown }
			else if (player.playerDirection == 'Right') { this.player.artist.cells = this.playerCellsRight }
			this.moveStop();
		}
	},
	
	/*checkBoundaries: function() {
		if (this.player.left <= 0) { this.player.left = 0 }
		if (this.player.left >= 660) { this.player.left = 660 }
		
		if (this.player.top <= 0) { this.player.top = 0 }
		if (this.player.top >= 450) { this.player.top = 450 }
	},*/
	
	playerDamaged: function(now) {
		if (now - player.lastDamaged >= 1000 && player.playerHealth > 0) {
			player.lastDamaged = now;
			player.playerHealth--;
			//console.log('Health: ' + player.playerHealth);
			document.getElementById('health-meter').innerHTML = player.playerHealth;
			
			if (player.playerHealth == 0) {
				this.playerDeath();
			}
		}
	},
	//player death
	playerDeath: function(){
		GameOver.classList.add('fadeIn');
		this.sprites.splice(0, 1);		

		// Stop Ambient
		ambientTrack.pause();
		ambientTrack.currentTime = 0;

		// Play death audio
		if (deathAudioStarted) {
			deathTrack.currentTime = 0;
			deathTrack.play();
		}
	},
	
	// This function is called by the main file to draw the player sprite "player.draw(now);"
	draw: function (now) {
		this.isAttackFinished();
		//this.checkBoundaries();
		this.updateSprites(now);
        this.drawSprites();
	},
	
	// Movement functions that set what spritesheet cells the player uses & the direction they move
	moveStop: function () {
        this.player.velocityX = 0;
        this.player.velocityY = 0;
        if (!player.isAttacking) { this.player.animationRate = 0; }
		player.isMovingUp = false;
		player.isMovingLeft = false;
		player.isMovingDown = false;
		player.isMovingRight = false;
    },
	
	moveUp: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsUp;
		this.player.velocityX = 0;
		this.player.velocityY = -this.playerMoveSpeed;
		player.isMovingUp = true;
		player.playerDirection = 'Up';
   },
   
   	moveLeft: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsLeft;
		this.player.velocityX = -this.playerMoveSpeed;
		this.player.velocityY = 0;
		player.isMovingLeft = true;
		player.playerDirection = 'Left';
   },
   
   	moveDown: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsDown;
		this.player.velocityX = 0;
		this.player.velocityY = this.playerMoveSpeed;
		player.isMovingDown = true;
		player.playerDirection = 'Down';
   },
   
   	moveRight: function () {
        this.player.animationRate = this.animationRate;
        this.player.artist.cells = this.playerCellsRight;
		this.player.velocityX = this.playerMoveSpeed;
		this.player.velocityY = 0;
		player.isMovingRight = true;
		player.playerDirection = 'Right';
   },
   
    attack: function () {
		swordSound.currentTime = 0;
		swordSound.play();
		player.isAttacking = true;
        this.player.animationRate = this.animationRate;
		this.player.artist.cellIndex = 0;
		if (player.playerDirection == 'Up') { this.player.artist.cells = this.playerAttackCellsUp }
		else if (player.playerDirection == 'Left') { this.player.artist.cells = this.playerAttackCellsLeft }
		else if (player.playerDirection == 'Down') { this.player.artist.cells = this.playerAttackCellsDown }
		else if (player.playerDirection == 'Right') { this.player.artist.cells = this.playerAttackCellsRight }
   },
   
	// Gets the spritesheet png for the player to use
    initializePlayerImages: function () {
        this.spritesheet.src = './game_project_sprites/main_spritesheet.png';
   }
};

// Keybind functions (part 1 - movement / attacking)
window.addEventListener('keydown', function (e){
    var key = e.keyCode;
	if ((textStage <= 0 || textStage >= 5) && !player.isAttacking && !player.wallCollision) {
		if (key === 87 || key === 38) {		 // 'w' or up arrow
			player.moveStop();
			player.moveUp();
		}
		else if (key === 65 || key === 37) { // 'a' or left arrow
			player.moveStop();
			player.moveLeft();
		}
		else if (key === 83 || key === 40) { // 's' or down arrow
			player.moveStop();
			player.moveDown();
		}
		else if (key === 68 || key === 39) { // 'd' or right arrow
			player.moveStop();
			player.moveRight();
		}
		else if (key === 32) {
			player.moveStop();
			player.attack();
		}
		//sprint function: still haven't figured out how to turn it off.
		else if (key === 16) { // shift key
			player.playerMoveSpeed = 8;
		}
	}
});

// Keybind functions (part 2 - stop moving)
window.addEventListener('keyup', function (e){
    var key = e.keyCode;

	if (key === 87 || key === 38 || key === 65 || key === 37 || key === 83 || key === 40 || key === 68 || key === 39 || key === 16)
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
		else if (key === 16) {
			player.playerMoveSpeed = 4;
		}
		
		if (!player.isMovingUp && !player.isMovingLeft && !player.isMovingDown && !player.isMovingRight && !player.isAttacking) {
			player.moveStop();
			//console.log('Player stopped moving');
		}
	}
});

// Initializes all the above code as a variable that can be used in other .js files
var player = new Player();