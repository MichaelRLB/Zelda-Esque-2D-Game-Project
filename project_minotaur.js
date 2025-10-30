var canvas = document.getElementById('game-canvas'),
    context = canvas.getContext('2d')

//check snailBait chapter 1 for code

// starting positions
    PLAYER_START_LEFT = 50
    //PLAYER_START_UP(?)

// Images

    background = new Image(),

    

    playerImage = new Image(),

    // Level code

    //make walls so that Luke's collisons work.

// Launch game.........................................................................

initializeImages();

function initializeImages(){
    background.src ='Map0-TestRoom.png'
    playerImage.src = 'game_project_sprites/player_test.png';
    //minotaurImage.src

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

function gameLoop(now) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    player.draw(now);
    window.requestAnimationFrame(gameLoop);
};