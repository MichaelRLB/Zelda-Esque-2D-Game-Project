var Minotaur = function () {
    this.minotaurImage = new Image();
	this.finalMinotaurImage = new Image();
	this.sprites = [];
	this.canvas = document.getElementById('game-canvas');
	this.context = this.canvas.getContext('2d');

    this.width = 30;
    this.height = 54;
	
	// spawn = the spawn position of the enemy sprite in [left, top] format
	// map = which map the sprite will spawn on
	this.minotaurData = [
		//take out the first one in the final game
		//{spawn: [945, 40], map: 0},
		{spawn: [867.5, 1067.5], map: 9},
		{spawn: [1121.5, 1075.5], map: 5},
		{spawn: [867.5, 149.5], map: 11},
		{spawn: [1129.5, 143.5], map: 7},
		//final minotaur (code to spawn different sprite isn't working)
		{spawn: [963.5, 143.5], map: 13}
	];
};

Minotaur.prototype = {
    // Initialize the minotaur image by grabbing reference path to image
    initializeMinotaurImage: function () {
        this.minotaurImage.src = './game_project_sprites/minotaur_ph.png';
		this.finalMinotaurImage.src = './game_project_sprites/final_minotaur.png';
    },
	
	createMinotaurSprites: function (currentMap) {
		if (this.sprites.length > 0) { this.clearMinotaurSprites(); }
		
		for (var i = 0; i < this.minotaurData.length; ++i) {
			if (this.minotaurData[i].map == currentMap) {
				this.minotaur = new Sprite('minotaur');
				this.minotaur.left = this.minotaurData[i].spawn[0];
				this.minotaur.top = this.minotaurData[i].spawn[1];
				this.minotaur.spawn = this.minotaurData[i].spawn;
				this.minotaur.map = this.minotaurData[i].map;
				this.minotaur.index = i;
				this.sprites.push(this.minotaur);
			}
		}
    },
	
	clearMinotaurSprites: function () {
		for (var i = 0; i <= this.sprites.length; ++i) {
			this.sprites.pop();
			//console.log(this.sprites);
		}
	},
    
    // Draws the minotaur to the screen
    draw: function (context) {
        //context.drawImage(this.minotaurImage, this.left, this.top);
		var sprite;
		
		for (var i = 0; i < this.sprites.length; ++i) {
			sprite = this.sprites[i];
			//console.log(sprite);
			if (sprite.map == 13) {
				context.drawImage(this.finalMinotaurImage, sprite.left, sprite.top);
			}
			else {
				context.drawImage(this.minotaurImage,  sprite.left, sprite.top);
			}
		}
    },
    
    getCollisionRectangle: function () {
        return {
            left: this.sprites[0].left,
            right: this.sprites[0].left + this.width,
            top: this.sprites[0].top,
            bottom: this.sprites[0].top + this.height,
            centerX: this.sprites[0].left + this.width/2,
            centerY: this.sprites[0].top + this.height/2
        };
    }
};

// Create minotaur instance for use in project_minotaur.js
var minotaur = new Minotaur();
