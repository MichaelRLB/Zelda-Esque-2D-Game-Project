// Enemy variable that holds all the information for the enemy
var Enemy = function () {
	
	// Gets the <canvas> element the game runs on
	this.canvas = document.getElementById('game-canvas'),
	this.context = this.canvas.getContext('2d'),
	
	// For keeping the animations at a consistent framerate
	this.lastAnimationFrameTime = 0,
    this.fps = 60,
	this.initialAnimationRate = 0;
	this.animationRate = 10,
	
	// Initial enemy variables
	this.enemyCellWidth = 38,
	this.enemyCellHeight = 46,
	
	// Enemy movement variables
	this.enemyMoveSpeed = 0.8,
	
	// Initailizes the enemy image / spritesheet
	this.spritesheet = new Image(),
	this.sprites = [],
	
	this.enemyCellsUp = [
		{left: 621, top: 17, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 685, top: 17, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 749, top: 17, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 813, top: 18, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 877, top: 17, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 941, top: 17, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1005, top: 17, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1070, top: 18, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1133, top: 17, width: this.enemyCellWidth, height: this.enemyCellHeight}
	],
	
	this.enemyCellsLeft = [
		{left: 627, top: 81, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 687, top: 82, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 753, top: 81, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 819, top: 81, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 882, top: 81, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 944, top: 82, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1011, top: 81, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1075, top: 81, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1139, top: 81, width: this.enemyCellWidth, height: this.enemyCellHeight}
	],
	
	this.enemyCellsDown = [
		{left: 621, top: 145, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 685, top: 145, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 749, top: 145, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 813, top: 146, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 877, top: 145, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 941, top: 145, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1005, top: 145, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1069, top: 146, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1133, top: 145, width: this.enemyCellWidth, height: this.enemyCellHeight}
	],
	
		this.enemyCellsRight = [
		{left: 625, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 688, top: 210, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 754, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 815, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 878, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 940, top: 210, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1006, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1071, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight},
		{left: 1136, top: 209, width: this.enemyCellWidth, height: this.enemyCellHeight}
	],
	
	// spawn = the spawn position of the enemy sprite in [left, top] format (the spawn point will be the middle of their path)
	// direction = the intially direction it moves in from its spawn point
	// distance = how far it moves until it turns back to the spawn point (in pixels) 
	// map = which map the sprite will spawn on
	this.enemyData = [
		//entrance
		{spawn: [950, 800], direction: 'Right', distance: 50, map: 0},
		{spawn: [1200, 275], direction: 'Left', distance: 150, map: 0},
		//main room
		{spawn: [600, 350], direction: 'Up', distance: 75, map: 1},
		{spawn: [800, 275], direction: 'Down', distance: 50, map: 1},
		//battle room 1 (top left)
		{spawn: [935, 675], direction: 'Right', distance: 60, map: 8},
		{spawn: [692, 335], direction: 'Down', distance: 75, map: 8},
		//battle room 2 (top right)
		{spawn: [857, 395], direction: 'Right', distance: 75, map: 4},
		{spawn: [1265, 907], direction: 'Left', distance: 75, map: 4},
		//battle room 3 (bottom left)
		{spawn: [735, 256], direction: 'Down', distance: 100, map: 10},
		{spawn: [775, 704], direction: 'Left', distance: 100, map: 10},
		//battle room 4 (bottom right)
		{spawn: [1041, 259], direction: 'Right', distance: 100, map: 6},
		{spawn: [1189, 551], direction: 'Left', distance: 100, map: 6},
		//final battle room (top)
		{spawn: [819, 835], direction: 'Right', distance: 100, map: 12},
		{spawn: [1091, 636], direction: 'Left', distance: 100, map: 12},
		{spawn: [1027, 174], direction: 'Right', distance: 100, map: 12}
	],
	
	// Function for animating the enemy sprite (taken straight from snailbait)
	this.animationBehavior = {      
		execute: function (sprite, now, fps, context, lastAnimationFrameTime) {
			if (sprite.animationRate === 0) {
				return;
			}
			
			if (!sprite.lastAdvanceTime) {
				sprite.lastAdvanceTime = now;
			}
			else if (now - sprite.lastAdvanceTime > 1000 / sprite.animationRate) {
				sprite.artist.advance();
				sprite.lastAdvanceTime = now;
			}
		}      
    },
	
	// For some reason all the enemies go the same speed except the last one rendered, it goes twice as fast idk why
	this.moveBehavior = {
		execute: function (sprite, now, fps, context, lastAnimationFrameTime) {
			var sprite = sprite;
			if (sprite.direction == 'Right' && sprite.left < sprite.spawn[0] + sprite.distance) {
				sprite.artist.cells = enemy.enemyCellsRight;
				sprite.left += enemy.enemyMoveSpeed;
			}
			else if (sprite.direction == 'Right') { sprite.direction = 'Left' }
			
			if (sprite.direction == 'Left' && sprite.left > sprite.spawn[0] - sprite.distance) {
				sprite.artist.cells = enemy.enemyCellsLeft;
				sprite.left -= enemy.enemyMoveSpeed;
			}
			else if (sprite.direction == 'Left') { sprite.direction = 'Right' }
			
			if (sprite.direction == 'Up' && sprite.top > sprite.spawn[1] - sprite.distance) {
				sprite.artist.cells = enemy.enemyCellsUp;
				sprite.top -= enemy.enemyMoveSpeed;
			}
			else if (sprite.direction == 'Up') { sprite.direction = 'Down' }
			
			if (sprite.direction == 'Down' && sprite.top < sprite.spawn[1] + sprite.distance) {
				sprite.artist.cells = enemy.enemyCellsDown;
				sprite.top += enemy.enemyMoveSpeed;
			}
			else if (sprite.direction == 'Down') { sprite.direction = 'Up' }
		}
	}
};

// Enemy prototype that initailizes most of the functions for the enemy 
Enemy.prototype = {
	
	// Initailizes the enemy sprites
	// Sets all the variables for the enemy sprite
	createEnemySprites: function (currentMap) {
		if (this.sprites.length > 0) { this.clearEnemySprites(); }
		for (var i = 0; i < this.enemyData.length; ++i) {
			if (this.enemyData[i].map == currentMap) {
				this.enemy = new Sprite('enemy', new SpriteSheetArtist(this.spritesheet, this.enemyCellsRight), [this.animationBehavior, this.moveBehavior]);
				this.enemy.direction = this.enemyData[i].direction;
				this.enemy.distance = this.enemyData[i].distance;
				this.enemy.left = this.enemyData[i].spawn[0];
				this.enemy.top = this.enemyData[i].spawn[1];
				this.enemy.spawn = this.enemyData[i].spawn;
				this.enemy.map = this.enemyData[i].map;
				this.enemy.animationRate = this.animationRate;
				this.sprites.push(this.enemy);
			}
		}
    },
	
	clearEnemySprites: function () {
		for (var i = 0; i <= this.sprites.length; ++i) {
			this.sprites.pop();
			console.log(this.sprites);
		}
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
   
	// Gets the spritesheet png for the enemy to use
    initializeEnemyImages: function () {
        this.spritesheet.src = './game_project_sprites/main_spritesheet.png';
   }
};

// Initializes all the above code as a variable that can be used in other .js files
var enemy = new Enemy();