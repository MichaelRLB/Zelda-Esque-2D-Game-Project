// Enemy variable that holds all the information for the enemy
var Enemy = function () {
	
	// Gets the <canvas> element the game runs on
	this.canvas = document.getElementById('game-canvas'),
	this.context = this.canvas.getContext('2d'),
	
	// For keeping the animations at a consistent framerate
	this.lastAnimationFrameTime = 0,
    this.fps = 60,
	this.animationRate = 10,
	
	// Initial enemy variables
	this.enemyCellWidth = 28,
	this.enemyCellHeight = 45,
	
	// Initailizes the enemy image / spritesheet
	this.spritesheet = new Image(),
	this.sprites = [],
	
	this.enemyCellsRight = [
		{left: 625, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 688, top: 210, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 754, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 815, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 878, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 940, top: 210, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1006, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1071, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1136, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
	],
	
	// Function for animating the enemy sprite (taken straight from snailbait)
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
    }
};

// Enemy prototype that initailizes most of the functions for the enemy 
Enemy.prototype = {
	
	// Initailizes the enemy sprite (part 1)
    createSprites: function () {
        this.createEnemySprite();
        this.addSpritesToSpriteArray();
    },

	// Initailizes the enemy sprite (part 2)
    addSpritesToSpriteArray: function () {
        this.sprites.push(this.enemy);
    },
	
	// Sets all the variables for the enemy sprite
	createEnemySprite: function () {
		// enemyLeft & enemyHeight = the spawn position of the enemy sprite
        var enemyLeft = 200,
            enemyHeight = 200,
            initialAnimationRate = 0;

        this.enemy = new Sprite('enemy', new SpriteSheetArtist(this.spritesheet, this.enemyCellsRight), [this.animationBehavior]);
		
        this.enemy.animationRate = initialAnimationRate;
        this.enemy.left = enemyLeft;
        this.enemy.top = enemyHeight;

        this.sprites.push(this.enemy);
    },
	
	// Updates the sprite's position / functions (I'm pretty sure) (taken straight from snailbait)
	updateSprites: function (now) {
        var sprite;

        for (var i=0; i < this.sprites.length; ++i) {
            sprite = this.sprites[i];
			sprite.update(now, this.fps, this.context, this.lastAnimationFrameTime);
			this.moveDown();
		}
    },
	
	// Actaully draws the sprite on the screen after its variables have been updated (taken straight from snailbait)
	drawSprites: function() {
		var sprite;
		var enemy = this.enemy;

		for (var i=0; i < this.sprites.length; ++i) {
			sprite = this.sprites[i];
			this.context.translate(-sprite.hOffset, 0);
			sprite.draw(this.context);
			this.context.translate(sprite.hOffset, 0);
		}
    },
	
	// This function is called by the main file to draw the enemy sprite "enemy.draw(now);"
	draw: function (now) {
		this.updateSprites(now);
        this.drawSprites();
	},

   	moveDown: function () {
        this.enemy.animationRate = this.animationRate;
        this.enemy.artist.cells = this.enemyCellsRight;
   },
   
	// Gets the spritesheet png for the enemy to use
    initializeEnemyImages: function () {
        this.spritesheet.src = './game_project_sprites/main_spritesheet.png';
   }
};

// Initializes all the above code as a variable that can be used in other .js files
var enemy = new Enemy();