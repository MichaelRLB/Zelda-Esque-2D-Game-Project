//Click to track mouse position; comment out when not needed.
/*window.addEventListener('mousedown', function(event){
    console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
});*/

//textBox object.
var talkActive = false;
const TextBox = document.getElementById('textBox');

//interact function; change this so that it just passes inputs to dialogue box later (check notebook)
function interact() {
    //console.log('fadeIn function active')
    var testDialogue;
    if (talkActive === false) {
        talkActive = true;
        console.log('talkActive is true');
        testDialogue = "This is a test for passing data to the dialogue box.";
        document.getElementById('dialogueText').innerHTML = testDialogue;
        //makes the text box fade in when function is active
        TextBox.classList.add('fadeIn');
    } 
    else {
        talkActive = false;
        console.log('talkActive is false');
        TextBox.classList.remove('fadeIn');
    };        
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
        console.log('input received');
        //change this to "interact" function when ready.
        window.interact();
    }
})