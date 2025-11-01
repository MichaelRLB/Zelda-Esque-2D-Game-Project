//Click to track mouse position; comment out when not needed.
/*window.addEventListener('mousedown', function(event){
    console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
});*/

//textBox object.
var talkActive = false;
var textStage = 0;
const TextBox = document.getElementById('textBox');
const Choices = document.getElementById('answers');

//riddle array (will include questions later)
const riddleAnswers = ["False", "Fals", "True", "Falsetto"];

//interact function

function interact(){
    if(talkActive === false){
        talkActive = true;
        TextBox.classList.add('fadeIn');
        textStage = 1;
        //window.dialogue();
        window.riddleTest();
    }

    else{
        textStage += 1;
        //window.dialogue();
        window.riddleTest();
    }
}
function riddleTest(){ 
    var playerChoice;
    //console.log('textStage = ' + textStage);
    if(textStage === 1){
        document.getElementById('dialogueText').innerHTML = "Riddle me this:";
    }
    if(textStage === 2){
        document.getElementById('dialogueText').innerHTML = "I am answer number three.";
    } 
    if(textStage === 3){ 
        document.getElementById('dialogueText').innerHTML = "What am I?";
        Choices.classList.add('activate');
        //pass riddleAnswers to the buttons -- figure out how to imbed value into html buttons.
        document.getElementById('choice1').innerHTML = riddleAnswers[0];
        document.getElementById('choice2').innerHTML = riddleAnswers[1];
        document.getElementById('choice3').innerHTML = riddleAnswers[2];
        document.getElementById('choice4').innerHTML = riddleAnswers[3];

        document.getElementById('choice1').setAttribute("value", riddleAnswers[0]);
        document.getElementById('choice2').setAttribute("value", riddleAnswers[1]);
        document.getElementById('choice3').setAttribute("value", riddleAnswers[2]);
        document.getElementById('choice4').setAttribute("value", riddleAnswers[3]);

        Choices.addEventListener('click', function(){ 
            playerChoice = event.target.innerHTML;
            //console.log("You chose: " + playerChoice);
            Choices.classList.remove('activate');
            if(playerChoice === "True"){
                textStage = 4;
                document.getElementById('dialogueText').innerHTML = "Correct. You may have my key... Is what I would be saying if such a feature was implemented yet.";
            } 
            else if(playerChoice != "True"){
                textStage = 4;
                document.getElementById('dialogueText').innerHTML = "INCORRECT. DIE. ...Is what I would be saying if I had any attack animations.";
            }
        })
    } 
    
    //close dialogue, reset talkActive and textStage values.
    else if (textStage === 5){
        document.getElementById('dialogueText').innerHTML = "ok bye lol.";      
        TextBox.classList.remove('fadeIn');
        talkActive = false;
        textStage = 0;

        window.disableInteraction();
    }
}

function dialogue(){ //look into making an array for dialogue lines to cut down on else if branches.
    console.log('textStage in dialogue = ' + textStage);
    if(textStage === 1){
        document.getElementById('dialogueText').innerHTML = "This is where the first line of dialogue goes; press E to advance.";
    }
    if(textStage === 2){
        document.getElementById('dialogueText').innerHTML = "This is where the riddle will go in the final game.";
    } 
    if(textStage === 3){ 
        document.getElementById('dialogueText').innerHTML = "This is where you will be asked to answer the riddle; here, four buttons will pop up and you must pick the right answer with the mouse.";
        Choices.classList.add('activate');
        
    } 
    if(textStage === 4){
        Choices.classList.remove('activate');
        document.getElementById('dialogueText').innerHTML = "This is where you're told if you're right or wrong; after this, the dialogue box will close.";
    } 
    //close dialogue.
    else if (textStage === 5){
        document.getElementById('dialogueText').innerHTML = "ok bye lol.";      
        TextBox.classList.remove('fadeIn');
        talkActive = false;
        textStage = 0;

        window.disableInteraction();
    }
}

//makes the text box fade in and out when you press "e";
/*function fadeInTextBox() {
    //console.log('fadeIn function active')
    var testDialogue;
    if (TextBox.classList.contains('fadeIn')) {
        console.log('fade out')
        TextBox.classList.remove('fadeIn');
    } 
    else {
        console.log('fade in')
        testDialogue = "This is a test for passing data to the dialogue box.";
        document.getElementById('dialogueText').innerHTML = testDialogue;
        TextBox.classList.add('fadeIn');
    };
}*/

//event listeners / controls

window.addEventListener('keyup', function (e){
    var key = e.keyCode;

    //if talkActive is false, opens dialogue box. If true, it advances dialogue, eventually closing the box. It is disabled when riddles are visible.
    if (key === 69 && textStage != 3){ // 'e' key
        // Check if interaction is available (must be near minotaur)
        if (window.getCanInteract && window.getCanInteract()) {
            console.log('input received = interact');
            window.interact();
        } 
        // If dialogue is already active, advance it further
        else if (talkActive) {
            window.interact();
        }
        // If not near minotaur and not talking currently
        else {
            console.log('Nothing to interact with within range.');
        }
    }
})