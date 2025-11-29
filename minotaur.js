var Minotaur = function () {
    this.minotaurImage = new Image();
	this.sprites = [];
	this.canvas = document.getElementById('game-canvas');
	this.context = this.canvas.getContext('2d');

    this.width = 30;
    this.height = 54;
	
	this.minotaurData = [
		{spawn: [945, 40], map: 0, destroyed: 'No'}
	];
};

Minotaur.prototype = {
    // Initialize the minotaur image by grabbing reference path to image
    initializeMinotaurImage: function () {
        this.minotaurImage.src = 'game_project_sprites/minotaur_ph.png';
    },
	
	createMinotaurSprites: function (currentMap) {
		if (this.sprites.length > 0) { this.clearMinotaurSprites(); }
		
		for (var i = 0; i < this.minotaurData.length; ++i) {
			if (this.minotaurData[i].map == currentMap && this.minotaurData[i].destroyed == 'No') {
				this.minotaur = new Sprite('minotaur');
				this.minotaur.left = this.minotaurData[i].spawn[0];
				this.minotaur.top = this.minotaurData[i].spawn[1];
				this.minotaur.spawn = this.minotaurData[i].spawn;
				this.minotaur.map = this.minotaurData[i].map;
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
		
		for (var i=0; i < this.sprites.length; ++i) {
			sprite = this.sprites[i];
			//console.log(sprite);
			context.drawImage(this.minotaurImage,  sprite.left, sprite.top);
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
