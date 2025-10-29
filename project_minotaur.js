var canvas = document.getElementById('game-canvas'),
    context = canvas.getContext('2d')

//check snailBait chapter 1 for code

// starting positions
    PLAYER_START_LEFT = 50
    //PLAYER_START_UP(?)

// Images

    background = new Image(),

    //how to get rid of this without interfering with Joshua's player code?
    playerImage = new Image(),

    // Level code

// Launch game.........................................................................

initializeImages();

function initializeImages(){
    background.src ='Map0-TestRoom.png'
    playerImage.src = 'game_project_sprites/player_test.png';
    //minotaurImage.src

    background.onload = function (e) { //change this to background later.
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
   //drawPlayer();
}

/* function drawPlayer() {
    context.drawImage(playerImage, 300, 200)
}*/

function drawBackground() {
    context.drawImage(background, 300, 200);
}

function gameLoop(now) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(now);
	draw();
    window.requestAnimationFrame(gameLoop);
};