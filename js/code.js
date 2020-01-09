/* let randomLoc = Math.floor(Math.random()*5);
const location1= randomLoc;
const location2= 3;
const location3= 4;
let guess ="guess";
let hits = 0;
let guesses = 0;
let isSunk = false;

console.log(location1,location2,location3);

while(isSunk == false){
        guess = prompt("Ready, aim, fire! (enter a number 0-6):");
    if(guess < 0 || guess > 6){
        alert("Please enter a valid cell number!");
    }else{
        guesses = guesses + 1;
    }

    if (guess == location1 || guess ==location2 || guess == location3){
        hits = hits + 1;
        alert("HIT");
    } else{
        alert("MISS");
    }
    if(hits === 3 ){
        isSunk = true;
        alert("You sank my battleship!");
    }
}
let stats = `You took ${guesses} guesses to sink the battleship, which means your shooting accuracy was ${3/guesses*100}%`;
alert(stats);

 */
const view = {

    displayMessage:function(msg) { 
        const messageArea = document.getElementById('messagearea');

        messageArea.innerHTML = msg;
     },

    displayMiss:function(location) { 
        const cell = document.getElementById(location);
        cell.setAttribute("class","miss");


     },

    displayHit:function(location) { 
        const cell = document.getElementById(location);
        cell.setAttribute("class","hit");
     }
}

view.displayMiss("00");
view.displayHit("08");
view.displayMiss("17");
view.displayHit("26");
view.displayMiss("34");
view.displayHit("42");
view.displayHit("50");
view.displayMessage("you fire!");