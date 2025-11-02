var canvas = document.getElementById('game-canvas'),
    context = canvas.getContext('2d')

//check snailBait chapter 1 for code

// starting positions
    PLAYER_START_LEFT = 50;
    //PLAYER_START_UP(?)

// Images

    background = new Image();

    playerImage = new Image();

    // Interaction variables, bool for activating interaction state, timer for interaction, and time for timer
    var canInteract = false;
    var interactionTimer = null;
    var INTERACTION_WINDOW = 1500; // in milliseconds

    // Level code

    //make walls so that Luke's collisons work.

// Launch game.........................................................................

initializeImages();

function initializeImages(){
    background.src ='Map0-TestRoom.png';
    playerImage.src = 'game_project_sprites/player_test.png';

    background.onload = function (e) {
        startGame();
    }
}

//
// "player." = the player.js script
//

function startGame() {
	draw();
	player.initializePlayerImages();
	player.createSprites();
	enemy.initializeEnemyImages();
	enemy.createSprites();
    minotaur.initializeImage();
	window.requestAnimationFrame(gameLoop);
}

function draw() {
   drawBackground();
   //drawWalls();
}

/* function drawPlayer() {
    context.drawImage(playerImage, 300, 200)
}*/

function drawBackground() {
    context.drawImage(background, 100, -50);
}

// May put into it's own file to simplify the code, but for now, it's here. This currently only works for detecting
// collision with the minotaur, which is also static. More for the interaction than actual collision.
function checkCollisions(){
    var playerRect = player.player.calculateCollisionRectangle();
    var minotaurRect = minotaur.getCollisionRectangle();
	var enemyRect = enemy.enemy.calculateCollisionRectangle();

    // Check if rectangles overlap (not perfect, sprites still clip one another currently)
    if (playerRect.left < minotaurRect.right && playerRect.right > minotaurRect.left && playerRect.top < minotaurRect.bottom && playerRect.bottom > minotaurRect.top) {
        console.log("touching minotaur!");
        handleCollision(playerRect, minotaurRect);

        // Enable interaction window if not already active and not talking
        if (!canInteract && !talkActive) {
            enableInteraction();
        }
    }
	
	else if (playerRect.left < enemyRect.right && playerRect.right > enemyRect.left && playerRect.top < enemyRect.bottom && playerRect.bottom > enemyRect.top) {
        console.log("touching enemy!");
        handleCollision(playerRect, enemyRect);
	}
}


// Enable the interaction window for INTERACTION_WINDOW time
function enableInteraction() {
    canInteract = true;
    
    // Clear any existing timer
    if (interactionTimer) {
        clearTimeout(interactionTimer);
    }
    
    // Set timer to disable interaction after INTERACTION_WINDOW time
    interactionTimer = setTimeout(function() {
        if (!talkActive) {
            disableInteraction();
        }
    }, INTERACTION_WINDOW);
}

// Disables the interaction window
function disableInteraction() {
    canInteract = false;
    console.log("Interaction window closed");
    
    // Clear timer
    if (interactionTimer) {
        clearTimeout(interactionTimer);
        interactionTimer = null;
    }
}

// Check if player can interact (called in text_box.js file)
function getCanInteract() {
    return canInteract;
}

// Handle collision by stopping and pushing player back. Not for full collision, only works against the
// minotaur currently in the scene, will need updated for full level collision.
function handleCollision(playerRect, minotaurRect) {
    player.moveStop();
    
    // Calculates overlap on each axis between player and minotaur
    var overlapX = Math.min(playerRect.right - minotaurRect.left, minotaurRect.right - playerRect.left);
    var overlapY = Math.min(playerRect.bottom - minotaurRect.top, minotaurRect.bottom - playerRect.top);
    
    // Push player back in direction away from collision
    if (overlapX < overlapY) {
        // Push horizontally away
        if (playerRect.centerX < minotaurRect.centerX) {
            player.player.left -= overlapX;
        } 
        else {
            player.player.left += overlapX;
        }
    } 
    else {
        // Push vertically away
        if (playerRect.centerY < minotaurRect.centerY) {
            player.player.top -= overlapY;
        } 
        else {
            player.player.top += overlapY;
        }
    }
}

function gameLoop(now) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    player.draw(now);
    minotaur.draw(context);
	enemy.draw(now);
    checkCollisions();
    window.requestAnimationFrame(gameLoop);
};