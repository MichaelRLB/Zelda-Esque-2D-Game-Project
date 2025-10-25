var canvas = document.getElementById('game-canvas'),
    context = canvas.getContext('2d')

//check snailBait chapter 1 for code

// starting positions
    PLAYER_START_LEFT = 50
    //PLAYER_START_UP(?)

// Images

    //background = new Image(),
    playerImage = new Image(),

    // Level code

// Launch game.........................................................................

initializeImages();

function initializeImages(){
    //background.src
    playerImage.src = 'game_project_sprites/player_test.png';
    //minotaurImage.src

    playerImage.onload = function (e) { //change this to background later.
        startGame();
    }
}

function startGame() {
   draw();
}

function draw() {
   //drawBackground();
   drawPlayer();
}

function drawPlayer() {
    context.drawImage(playerImage, 300, 200)
}

