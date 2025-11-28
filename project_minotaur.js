// Map data accessible globally in Map1-Entrance.js

var canvas = document.getElementById('game-canvas'),
	context = canvas.getContext('2d'),
	gameStarted = false;

// Images
var background = new Image();
var backgroundSources = ['./maps/Map1-Entrance-Ground.png', './maps/Map2-MainRoom.png', ];
var walls = new Image();
var wallSources = ['./maps/Map1-Entrance-Walls.png', './maps/Map2-MainRoom-Walls.png'];

// Interaction variables, bool for activating interaction state, timer for interaction, and time for timer
var canInteract = false;
var interactionTimer = null;
var INTERACTION_WINDOW = 1500; // in milliseconds

// Collision detection system variables
var currentMap = mapData.layers[0].map;
var collisionMap = []; 
var mapWidth = 60;
var mapHeight = 40;
var tileSize = 32;
var mapOffsetX = 0; 
var mapOffsetY = 0;
// index 0 = map0 (& map0 = Map1-Entrance) | tried to make this a dictionary but it didn't work - Definitely need this to be a dictionary tho
var mapTransitionPoints = [
{map: 0, tiles: [28, 29, 30, 31], destination: 1},
{map: 1, tiles: [2368, 2369, 2370, 2371], destination: 0}
];
var lastMapChange = 0;

// Launch game.........................................................................

initializeImages();

function initializeImages(){
    background.src = backgroundSources[0];
	walls.src = wallSources[0];

	if (!gameStarted) {
		background.onload = function (e) {
			gameStarted = true;
			startGame();
		}
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
	enemy.createEnemySprites(currentMap);
    minotaur.initializeImage();
	window.requestAnimationFrame(gameLoop);
}

function draw() {
   drawBackground();
}

function drawBackground() {
    context.drawImage(background, 0, 0);
	context.drawImage(walls, 0, 0);
}

// Function for checking the collision of a point (x, y) with the tile map (doesn't work on left-right sides yet)
function checkTileCollision(x, y, now) {
	collisionMap = mapData.layers[currentMap].data;
    // Convert world coordinates to tile coordinates
    var tileX = Math.floor((x - mapOffsetX) / tileSize);
    var tileY = Math.floor((y - mapOffsetY) / tileSize);
	//console.log(tileX);
	//console.log(tileY);
    
    // Check if coordinates are within map bounds, treat out-of-bounds as collision
    if (tileX < 0 || tileX >= mapWidth || tileY < 0 || tileY >= mapHeight) {
        return true;
    }
    
    // Get tile value from collision map (tmj file)
    var tileIndex = (tileY * mapWidth) + tileX;
    var tileValue = collisionMap[tileIndex];
	console.log(tileIndex);
	if (checkTransitionPoints(tileIndex, now)) {
		console.log('changeMap();');
		changeMap();
		return false;
	}
    
    // Return true if tile is non-zero (collision), false if zero (no collision)
    // This assumes 0 = empty space, non-zero = solid tile, as it is on the 2nd layer of the tmj file
    return tileValue != 0;
}

function checkTransitionPoints(tileIndex, now) {
	for (var i = 0; i < mapTransitionPoints.length; ++i) {
		if (mapTransitionPoints[i].map == currentMap) {
			for (var j = 0; j < mapTransitionPoints[i].tiles.length; ++j) {
				if (tileIndex == mapTransitionPoints[i].tiles[j] && now - lastMapChange >= 5000) {
				// Can only change maps every 5 seconds
					lastMapChange = now;
					currentMap = mapTransitionPoints[i].destination;
					return true;
				}
			}
		}
	}
	return false;
}

// Right now it only changes from Map1-Entrance to Map2-MainRoom
function changeMap() {
	background.src = backgroundSources[currentMap];
	walls.src = wallSources[currentMap];
	enemy.createEnemySprites(currentMap);
}

// Updated collision detection for the minotaur, enemy, and map tiles (not fully functional yet)
function checkPlayerCollisions(now) {
    var playerRect = player.player.calculateCollisionRectangle();
    var minotaurRect = minotaur.getCollisionRectangle();
    
    // Check four corners of player bounding box
    var corners = [
		{x: (playerRect.left + playerRect.right) / 2, y: (playerRect.top + playerRect.bottom) / 2}, //center
        //{x: playerRect.left, y: playerRect.top}, // top-left
        //{x: playerRect.right, y: playerRect.top}, // top-right
        //{x: playerRect.left, y: playerRect.bottom}, // bottom-left
        //{x: playerRect.right, y: playerRect.bottom} // bottom-right
    ];
    
    // Check if any corner is colliding with a solid tile
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some for more info on how this works
    var isColliding = corners.some(corner => checkTileCollision(corner.x, corner.y, now));
    
    if (isColliding) {
        // Stop player movement when collision detected
        // KNOWN ISSUE: This sometimes causing jittering and player slowdown when passing past
        player.moveStop();
		player.wallCollision = true;
		if (player.playerDirection == 'Up') { player.player.top += 1; }
		else if (player.playerDirection == 'Left') { player.player.left += 1; }
		else if (player.playerDirection == 'Down') { player.player.top -= 1; }
		else if (player.playerDirection == 'Right') { player.player.left -= 1; }		
        //return true;
    }
	else if (!isColliding)
	{
		player.wallCollision = false;
	}
	
	if (player.isAtacking) {
		playerRect.top -= 30;
		playerRect.left -= 30;
		playerRect.bottom += 30;
		playerRect.right += 30;
	}

    // Check if rectangles overlap (not perfect, sprites still clip one another currently)
    if (playerRect.left < minotaurRect.right && playerRect.right > minotaurRect.left && playerRect.top < minotaurRect.bottom && playerRect.bottom > minotaurRect.top && !player.isAtacking) {
        console.log("touching minotaur!");
        handleCollision(playerRect, minotaurRect);

        // Enable interaction window if not already active and not talking
        if (!canInteract && !talkActive) {
            enableInteraction();
        }
    }
    
	for (var i=0; i < enemy.sprites.length; ++i) {
		var enemyRect = enemy.sprites[i].calculateCollisionRectangle();
		// Same check as above, but for enemy
		if (playerRect.left < enemyRect.right && playerRect.right > enemyRect.left && playerRect.top < enemyRect.bottom && playerRect.bottom > enemyRect.top) {
			console.log("touching enemy!");
			if (player.isAtacking) {
				enemy.sprites.splice(i, 1);
			}
			else { 
				handleCollision(playerRect, enemyRect);
				player.playerDamaged(now);
			}
		}
	}
    
    // If no collision detected
    return false;
}

// May put into it's own file to simplify the code, but for now, it's here. This currently only works for detecting
// collision with the minotaur, which is also static. More for the interaction than actual collision.
// function checkCollisions(){
//     var playerRect = player.player.calculateCollisionRectangle();
//     var minotaurRect = minotaur.getCollisionRectangle();
// 	var enemyRect = enemy.enemy.calculateCollisionRectangle();

//     // Check if rectangles overlap (not perfect, sprites still clip one another currently)
//     if (playerRect.left < minotaurRect.right && playerRect.right > minotaurRect.left && playerRect.top < minotaurRect.bottom && playerRect.bottom > minotaurRect.top) {
//         console.log("touching minotaur!");
//         handleCollision(playerRect, minotaurRect);

//         // Enable interaction window if not already active and not talking
//         if (!canInteract && !talkActive) {
//             enableInteraction();
//         }
//     }
	
// 	else if (playerRect.left < enemyRect.right && playerRect.right > enemyRect.left && playerRect.top < enemyRect.bottom && playerRect.bottom > enemyRect.top) {
//         console.log("touching enemy!");
//         handleCollision(playerRect, enemyRect);
// 	}
// }


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

// FPS limiting stuff
var lastFrame = 0;
const fpsRate = 60;
// "now" is a default browser thing for getting time (in ms)

// Things at the top of this function draw first and are therefore below things drawn after it
function gameLoop(now) {
	if (now - lastFrame >= 1000 / fpsRate) {
		lastFrame = now;
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw();
		player.draw(now);
		minotaur.draw(context);
		enemy.draw(now);
		checkPlayerCollisions(now);
	}
	window.requestAnimationFrame(gameLoop);
};