var Barrier = function () {
    this.barrierImage = new Image();
	this.sprites = [];
	this.canvas = document.getElementById('game-canvas');
	this.context = this.canvas.getContext('2d');

    this.width = 126;
    this.height = 58;
	
	// spawn = the spawn position of the enemy sprite in [left, top] format
	// map = which map the sprite will spawn on
	this.barrierData = [
		{spawn: [893, 55], map: 1}
	];
};

Barrier.prototype = {
    // Initialize the barrier image by grabbing reference path to image
    initializeBarrierImage: function () {
        this.barrierImage.src = './Maps/Map2-MainRoom-Blocker.png';
    },
	
	createBarrierSprites: function (currentMap) {
		if (this.sprites.length > 0) { this.clearBarrierSprites(); }
		
		for (var i = 0; i < this.barrierData.length; ++i) {
			if (this.barrierData[i].map == currentMap) {
				this.barrier = new Sprite('barrier');
				this.barrier.left = this.barrierData[i].spawn[0];
				this.barrier.top = this.barrierData[i].spawn[1];
				this.barrier.spawn = this.barrierData[i].spawn;
				this.barrier.map = this.barrierData[i].map;
				this.barrier.index = i;
				this.sprites.push(this.barrier);
			}
		}
    },
	
	clearBarrierSprites: function () {
		for (var i = 0; i <= this.sprites.length; ++i) {
			this.sprites.pop();
			//console.log(this.sprites);
		}
	},
    
    // Draws the barrier to the screen
    draw: function (context) {
		var sprite;
		
		for (var i = 0; i < this.sprites.length; ++i) {
			sprite = this.sprites[i];
			//console.log(sprite);
			if (sprite.map == 13) {
				context.drawImage(this.finalBarrierImage, sprite.left, sprite.top);
			}
			else {
				context.drawImage(this.barrierImage,  sprite.left, sprite.top);
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

// Create barrier instance for use in project_minotaur.js
var barrier = new Barrier();