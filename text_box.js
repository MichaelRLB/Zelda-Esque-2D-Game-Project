//Click to track mouse position; comment out when not needed.
/*window.addEventListener('mousedown', function(event){
    console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
});*/

//textBox object.
var talkActive = false;
var textStage = 0;
const TextBox = document.getElementById('textBox');
const Choices = document.getElementById('answers');

const riddleAnswers = ["False", "False", "True", "Falsetto"];

//interact function; change this so that it just passes inputs to dialogue box later (check notebook)

function interact(){
    if(talkActive === false){
        talkActive = true;
        TextBox.classList.add('fadeIn');
        //window.dialogue();
        window.riddleTest();
    }
    else{ //add an else if; if the riddle answers are on screen (aka "textStage === 2" / "buttonVisibility = on") and the player hits "e", textStage will go back one so you can read the riddle again (and stop players from skipping it).
        textStage += 1;
        //window.dialogue();
        window.riddleTest();
    }
}
function riddleTest(){ 
    var playerChoice;
    //console.log('textStage = ' + textStage);
    if(textStage === 0){
        document.getElementById('dialogueText').innerHTML = "Riddle me this:";
    }
    if(textStage === 1){
        document.getElementById('dialogueText').innerHTML = "I am answer number three.";
    } 
    if(textStage === 2){ 
        document.getElementById('dialogueText').innerHTML = "What am I?";
        Choices.classList.add('activate');
        //pass riddleAnswers to the buttons
        document.getElementById('choice1').innerHTML = riddleAnswers[0];
        document.getElementById('choice2').innerHTML = riddleAnswers[1];
        document.getElementById('choice3').innerHTML = riddleAnswers[2];
        document.getElementById('choice4').innerHTML = riddleAnswers[3];
    } 
    if(textStage === 3){ //change this to an if-else statement based on whether the player is right or wrong.
        Choices.classList.remove('activate');
        document.getElementById('dialogueText').innerHTML = "This is where you're told if you're right or wrong; after this, the dialogue box will close.";
    } 
    //close dialogue, reset talkActive and textStage values.
    else if (textStage === 4){
        document.getElementById('dialogueText').innerHTML = "ok bye lol.";      
        TextBox.classList.remove('fadeIn');
        talkActive = false;
        textStage = 0;
    }
}

function dialogue(){ //look into making an array for dialogue lines to cut down on else if branches.
    //console.log('textStage = ' + textStage);
    if(textStage === 0){
        document.getElementById('dialogueText').innerHTML = "This is where the first line of dialogue goes; press E to advance.";
    }
    if(textStage === 1){
        document.getElementById('dialogueText').innerHTML = "This is where the riddle will go in the final game.";
    } 
    if(textStage === 2){ 
        document.getElementById('dialogueText').innerHTML = "This is where you will be asked to answer the riddle; here, four buttons will pop up and you must pick the right answer with the mouse.";
        Choices.classList.add('activate');
        
    } 
    if(textStage === 3){
        Choices.classList.remove('activate');
        document.getElementById('dialogueText').innerHTML = "This is where you're told if you're right or wrong; after this, the dialogue box will close.";
    } 
    //close dialogue.
    else if (textStage === 4){
        document.getElementById('dialogueText').innerHTML = "ok bye lol.";      
        TextBox.classList.remove('fadeIn');
        talkActive = false;
        textStage = 0;
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

    //if talkActive is false, opens dialogue box. If true, it advances dialogue, eventually closing the box.
    if (key === 69){ // 'e' key
        //console.log('input received = interact');
        window.interact();
    }
})