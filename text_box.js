//Click to track mouse position; comment out when not needed.
/*window.addEventListener('mousedown', function(event){
    console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
});*/

//textBox object.
var talkActive = false;
var textStage = 0;
const TextBox = document.getElementById('textBox');

//interact function; change this so that it just passes inputs to dialogue box later (check notebook)

function interact(){
    if(talkActive === false){
        talkActive = true;
        TextBox.classList.add('fadeIn');
        window.dialogue();
    }
    else{
        textStage += 1;
        window.dialogue();
    }
}
function dialogue(){ //look into making an array for dialogue lines to cut down on else if branches.
    console.log('textStage = ' + textStage);
    if(textStage === 0){
        document.getElementById('dialogueText').innerHTML = "This is where the first line of dialogue goes; press E to advance.";
    }
    if(textStage === 1){
        document.getElementById('dialogueText').innerHTML = "This is where the riddle will go in the final game.";
    } 
    if(textStage === 2){
        document.getElementById('dialogueText').innerHTML = "This is where you will be asked to answer the riddle; here, four buttons will pop up and you must pick the right answer with the mouse.";
    } 
    if(textStage === 3){
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

//makes the text box fade in and out when you press "e"; refactor this into dialogue system later
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

window.addEventListener('keydown', function (e){
    var key = e.keyCode;

    //if talkActive is false, opens dialogue box. If true, it advances dialogue, eventually closing the box.
    if (key === 69){ // 'e' key
        //console.log('input received = interact');
        //change this to "interact" function when ready.
        window.interact();
    }
})