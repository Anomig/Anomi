var cards = new Array();
cards= [
    "Ow.. you need a piece of toilet paper?",
    "I would say just take it....",
    "But you see it too.. right?",
    "Yea, like it has it's own life or something.",
    "Crazy!",
    "Well.. I think you need to find another solution.",
    "Or try and catch it.. it's your time you are wasting"
];

var b= -1;
var currentText;
 function cardCounter(){
    b++;
    if(b < cards.length){
        currentText = cards[b];
        document.getElementById("text").innerHTML = currentText;
    } else{
        b = -1;
        clearInterval(intervalTimer);
    };
 };

 var intervalTimer = setInterval(function(){cardCounter()},5000);