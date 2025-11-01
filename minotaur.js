// This is mainly temp info, can be re-used later for the minotaur potentially but this is pretty hard-coded
// as it is now and will need adaptation for later.

var Minotaur = function () {
    this.image = new Image();
    this.left = 350;
    this.top = 350;
    this.width = 30;
    this.height = 54;
};

Minotaur.prototype = {
    // Initialize the minotaur image by grabbing reference path to image
    initializeImage: function () {
        this.image.src = 'game_project_sprites/minotaur_ph.png';
    },
    
    // Draws the minotaur to the screen
    draw: function (context) {
        context.drawImage(this.image, this.left, this.top);
    },
    
    // Get collision rectangle (rectangle around and at minotaur, doesn't support movement currently)
    // KNOWN BUG: Currently the player can walk "into" the minotaur sprite from top and left. Will need an offset
    // on current hitbox to work.
    getCollisionRectangle: function () {
        return {
            left: this.left,
            right: this.left + this.width,
            top: this.top,
            bottom: this.top + this.height,
            centerX: this.left + this.width/2,
            centerY: this.top + this.height/2
        };
    }
};

// Create minotaur instance for use in project_minotaur.js
var minotaur = new Minotaur();
