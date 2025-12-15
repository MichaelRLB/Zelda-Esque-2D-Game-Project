// Map data accessible globally in Map1-Entrance.js

var canvas = document.getElementById('game-canvas'),
	context = canvas.getContext('2d'),
	gameStarted = false;

// Images
var background = new Image();
var backgroundSources = [
		'./Maps/Map1-Entrance-Ground.png', './Maps/Map2-MainRoom.png', './Maps/Map3A-RightHallway-Ground.png',
		'./Maps/Map3B-LeftHallway-Ground.png', './Maps/Map4A-TopRightBattleRoom-Ground.png', './Maps/Map4B-TopRightTrophyRoom-Ground.png',
		'./Maps/Map5A-BottomRightBattleRoom-Ground.png', './Maps/Map5B-BottomRightTrophyRoom-Ground.png', './Maps/Map6A-TopLeftBattleRoom-Ground.png',
		'./Maps/Map6B-TopLeftTrophyRoom-Ground.png', './Maps/Map7A-BottomLeftBattleRoom-Ground.png', './Maps/Map7B-BottomLeftTrophyRoom-Ground.png',
		'./Maps/Map8-FinalBattleRoom-Ground.png', './Maps/Map9-FinalTrophyRoom-Ground.png'
		];
var walls = new Image();
var wallSources = [
		'./Maps/Map1-Entrance-Walls.png', './Maps/Map2-MainRoom-Walls.png', './Maps/Map3A-RightHallway-Walls.png',
		'./Maps/Map3B-LeftHallway-Walls.png', './Maps/Map4A-TopRightBattleRoom-Walls.png', './Maps/Map4B-TopRightTrophyRoom-Walls.png',
		'./Maps/Map5A-BottomRightBattleRoom-Walls.png', './Maps/Map5B-BottomRightTrophyRoom-Walls.png', './Maps/Map6A-TopLeftBattleRoom-Walls.png',
		'./Maps/Map6B-TopLeftTrophyRoom-Walls.png', './Maps/Map7A-BottomLeftBattleRoom-Walls.png', './Maps/Map7B-BottomLeftTrophyRoom-Walls.png',
		'./Maps/Map8-FinalBattleRoom-Walls.png', './Maps/Map9-FinalTrophyRoom-Walls.png'
		];

// Interaction variables, bool for activating interaction state, timer for interaction, and time for timer
var canInteract = false;
var interactIndex = 999; // For storing what minotaur is being talked to
var interactionTimer = null;
var INTERACTION_WINDOW = 1500; // in milliseconds

// Audio
let ambientTrack = new Audio("Audio/Ambient.mp3");
ambientTrack.loop = true; // Makes audio loop
let audioStarted = false;

// This function is necessary because js is weird, it requires some user interaction to begin playing music. 
// If our game started with a button or something, it'd be easier to implement, but with this music begins at the first
// button the player presses.
window.addEventListener("keydown", () => {
    if (!audioStarted) {
        ambientTrack.play();
        audioStarted = true;
    }
});

// Collision detection system variables
var currentMap = mapData.layers[0].map;
var collisionMap = []; 
var mapWidth = 60;
var mapHeight = 40;
var tileSize = 32;
var mapOffsetX = 0; 
var mapOffsetY = 0;

// index 0 = map0 (& map0 = Map1-Entrance) | playerSpawn = [x, y] AKA [left, top] | sendToMap = the map data point you transition to (map0 = 0)
// Each map's # is their index number in backgroundSources / wallSources | Their corresponding mapData array is also labeled with that same #
// map3 tile  indexes are reversed horizontally
var mapTransitionPoints = [
{map: 0, tiles: [28, 29, 30, 31], sendToMap: 1, playerSpawn: [978, 1218]},
{map: 1, tiles: [2368, 2369, 2370, 2371], sendToMap: 0, playerSpawn: [978, 30]},
{map: 1, tiles: [1559, 1619, 1679, 1739], sendToMap: 2, playerSpawn: [56, 856]},
{map: 1, tiles: [239, 299, 359, 419], sendToMap: 2, playerSpawn: [72, 145]},
{map: 1, tiles: [1500, 1560, 1620, 1680], sendToMap: 3, playerSpawn: [1860, 856]},
{map: 1, tiles: [180, 240, 300, 360], sendToMap: 3, playerSpawn: [1860, 145]},
{map: 1, tiles: [28, 29, 30, 31], sendToMap: 12, playerSpawn: [978, 1218]},
{map: 2, tiles: [1500, 1560, 1620, 1680], sendToMap: 1, playerSpawn: [1860, 856]},
{map: 2, tiles: [180, 240, 300, 360], sendToMap: 1, playerSpawn: [1860, 145]},
{map: 2, tiles: [33, 34, 35, 36], sendToMap: 4, playerSpawn: [1120, 1210]},
{map: 2, tiles: [2373, 2374, 2375, 2376], sendToMap: 6, playerSpawn: [1120, 50]},
{map: 3, tiles: [1500, 1560, 1620, 1680], sendToMap: 1, playerSpawn: [56, 856]},
{map: 3, tiles: [180, 240, 300, 360], sendToMap: 1, playerSpawn: [72, 145]},
{map: 3, tiles: [33, 34, 35, 36], sendToMap: 8, playerSpawn: [850, 1210]},
{map: 3, tiles: [2373, 2374, 2375, 2376], sendToMap: 10, playerSpawn: [850, 80]},
{map: 4, tiles: [2373, 2374, 2375, 2376], sendToMap: 2, playerSpawn: [1120, 50]},
{map: 4, tiles: [33, 34, 35, 36], sendToMap: 5, playerSpawn: [1120, 1210]},
{map: 5, tiles: [2373, 2374, 2375, 2376], sendToMap: 4, playerSpawn: [1120, 50]},
{map: 6, tiles: [33, 34, 35, 36], sendToMap: 2, playerSpawn: [1120, 1210]},
{map: 6, tiles: [2373, 2374, 2375, 2376], sendToMap: 7, playerSpawn: [1120, 50]},
{map: 7, tiles: [33, 34, 35, 36], sendToMap: 6, playerSpawn: [1120, 1210]},
{map: 8, tiles: [2365, 2366, 2367, 2368], sendToMap: 3, playerSpawn: [800, 80]},
{map: 8, tiles: [25, 26, 27, 28], sendToMap: 9, playerSpawn: [850, 1210]},
{map: 9, tiles: [2365, 2366, 2367, 2368], sendToMap: 8, playerSpawn: [850, 80]},
{map: 10, tiles: [25, 26, 27, 28], sendToMap: 3, playerSpawn: [800, 1210]},
{map: 10, tiles: [2365, 2366, 2367, 2368], sendToMap: 11, playerSpawn: [850, 80]},
{map: 11, tiles: [25, 26, 27, 28], sendToMap: 10, playerSpawn: [850, 1210]},
{map: 12, tiles: [2368, 2369, 2370, 2371], sendToMap: 1, playerSpawn: [978, 30]},
{map: 12, tiles: [28, 29, 30, 31], sendToMap: 13, playerSpawn: [978, 1218]},
{map: 13, tiles: [2368, 2369, 2370, 2371], sendToMap: 12, playerSpawn: [978, 30]}
];

// Can only change Maps every 3 seconds
var mapTransitionCooldown = 3000;
var lastMapChange = 0;

// Launches the game
initializeImages();

function initializeImages(){
    background.src = backgroundSources[0];
	walls.src = wallSources[0];

	background.onload = function (e) {
		if (!gameStarted) {
			console.log('loading');
			gameStarted = true;
			startGame();
		}
	}
}

//
// "player." = the player.js script
// "enemy." = the enemy.js script
// "minotaur." = the minotaur.js script
// "barrier." = the barrier.js script
//

function startGame() {
	drawBackground();
	drawWalls();
	player.initializePlayerImages();
	player.createPlayerSprite();
	enemy.initializeEnemyImages();
	enemy.createEnemySprites(currentMap);
    minotaur.initializeMinotaurImage();
	minotaur.createMinotaurSprites(currentMap);
	barrier.initializeBarrierImage();
	barrier.createBarrierSprites(currentMap);
	window.requestAnimationFrame(gameLoop);
}

function drawWalls() {
   context.drawImage(walls, 0, 0);
}

function drawBackground() {
    context.drawImage(background, 0, 0);
}

// Function for checking the collision of a point (x, y) with the tile map (doesn't work on left-right sides yet)
function checkTileCollision(x, y, now) {
	collisionMap = mapData.layers[currentMap].data;
    // Convert world coordinates to tile coordinates
    var tileX = Math.floor((x - mapOffsetX) / tileSize);
    var tileY = Math.floor((y - mapOffsetY) / tileSize);
	console.log('X:' + x + ' | ' + 'Y:' + y );
    
    // Check if coordinates are within map bounds, treat out-of-bounds as collision
    if (tileX < 0 || tileX >= mapWidth || tileY < 0 || tileY >= mapHeight) {
        return true;
    }
    
    // Get tile value from collision map (tmj file)
    var tileIndex = (tileY * mapWidth) + tileX;
	// The map zip didn't have the left hallway so I flipped the right one and this math searches through the right hallway mapData from right to left to effectively flip it horizontally as well
	if (currentMap == 3) { tileIndex = ((tileY + 1) * mapWidth) - (tileX + 1); }
    var tileValue = collisionMap[tileIndex];
	//console.log("tile index: " + tileIndex);
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
				if (tileIndex == mapTransitionPoints[i].tiles[j] && now - lastMapChange >= mapTransitionCooldown) {
					lastMapChange = now;
					currentMap = mapTransitionPoints[i].sendToMap;
					player.player.left = mapTransitionPoints[i].playerSpawn[0]
					player.player.top = mapTransitionPoints[i].playerSpawn[1]
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
	minotaur.createMinotaurSprites(currentMap);
	barrier.createBarrierSprites(currentMap);
	//player.createPlayerSprite();
}

// Updated collision detection for the minotaur, enemy, and map tiles (not fully functional yet)
function checkPlayerCollisions(now) {
    var playerRect = player.player.calculateCollisionRectangle();
    
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
	
	if (player.isAttacking) {
		playerRect.top -= 30;
		playerRect.left -= 30;
		playerRect.bottom += 30;
		playerRect.right += 30;
	}

    // Check if rectangles overlap (not perfect, sprites still clip one another currently)
	for (var i = 0; i < minotaur.sprites.length; ++i) {
		var minotaurRect = minotaur.getCollisionRectangle();
		
		if (playerRect.left < minotaurRect.right && playerRect.right > minotaurRect.left && playerRect.top < minotaurRect.bottom && playerRect.bottom > minotaurRect.top && !player.isAttacking) {
			//console.log("touching minotaur!");
			handleCollision(playerRect, minotaurRect);

			// Enable interaction window if not already active and not talking
			if (!canInteract && !talkActive) {
				enableInteraction(minotaur.sprites[i].index);
			}
		}
	}
	
	for (var i = 0; i < barrier.sprites.length; ++i) {
		var barrierRect = barrier.getCollisionRectangle();
		
		if (playerRect.left < barrierRect.right && playerRect.right > barrierRect.left && playerRect.top < barrierRect.bottom && playerRect.bottom > barrierRect.top && !player.isAttacking) {
			//console.log("touching barrier!");
			handleCollision(playerRect, barrierRect);
			
			if (keysCollected >= 4)
			{
				barrier.sprites.splice(0, 1);
				barrier.barrierData.splice(0, 1);
			}
			else
			{
				console.log('Need more keys');
			}
		}
	}
    
	for (var i=0; i < enemy.sprites.length; ++i) {
		var enemyRect = enemy.sprites[i].calculateCollisionRectangle();
		// Same check as above, but for enemy
		if (playerRect.left < enemyRect.right && playerRect.right > enemyRect.left && playerRect.top < enemyRect.bottom && playerRect.bottom > enemyRect.top) {
			//console.log("touching enemy!");
			if (player.isAttacking) {
				enemy.sprites.splice(i, 1);
				if (player.playerHealth < 3){
					player.playerHealth++;
					document.getElementById('health-meter').innerHTML = player.playerHealth;
					//console.log('Player health:' + player.playerHealth);
				}
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

// Enable the interaction window for INTERACTION_WINDOW time
function enableInteraction(index) {
    canInteract = true;
	interactIndex = index;
    
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
	interactIndex = 999;
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
		drawBackground();
		barrier.draw(context);
		player.draw(now);
		// Seperated drawing the walls and background to test drawing the player behind the walls
		drawWalls();
		minotaur.draw(context);
		enemy.draw(now);
		checkPlayerCollisions(now);
	}
	window.requestAnimationFrame(gameLoop);
};