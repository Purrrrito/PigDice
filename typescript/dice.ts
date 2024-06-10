function isEmptyOrWhitespace(str:string):boolean {
    return str.trim().length === 0;
}

function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random();
    
    random = Math.floor(random * (maxValue - minValue + 1)) + minValue;

    return random;
}


function changePlayers():void{
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName == player1Name) {
        currentPlayerName = player2Name;
        (<HTMLInputElement>document.getElementById("current")).innerText = player2Name
    }
    else {
        currentPlayerName = player1Name;
        (<HTMLInputElement>document.getElementById("current")).innerText = player1Name
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0
    (<HTMLInputElement>document.getElementById("score1")).value = "0";
    (<HTMLInputElement>document.getElementById("score2")).value = "0";

    //verify each player has a name
    //if both players don't have a name display error
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    if (isEmptyOrWhitespace(player1Name) || isEmptyOrWhitespace(player2Name)) {
        alert("Both players must have a name!")
    }
    //if both players do have a name start the game!
    else {
        (<HTMLElement>document.getElementById("turn")).classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
        (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
        changePlayers();
    }
}

function rollDie():void{
    let score1 = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let score2 = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let randomNum = generateRandomValue(50, 100);

    //if the roll is 1
    if (randomNum == 1) {
        //  change players
        changePlayers();
        //  set current total to 0
        currTotal = 0;
    }
    
    //if the roll is greater than 1
    if (randomNum > 1) {
        //  add roll value to current total
        currTotal += randomNum;

        if (currentPlayerName == player1Name && score1 + currTotal >= 100) {
            (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
            holdDie();
            document.getElementById("winner").innerText = "Congratulations " + currentPlayerName + ", you won the game!";
        }
        else if (currentPlayerName == player2Name && score2 + currTotal >= 100) {
            (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
            holdDie();
            document.getElementById("winner").innerText = "Congratulations " + currentPlayerName + ", you won the game!";
        }
    }

    //set the die roll to value player rolled
    (<HTMLInputElement>document.getElementById("die")).value = randomNum.toString();
    //display current total on form
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();

}

function holdDie():void{
    //get the current turn total
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //determine who the current player is
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;

    //add the current turn total to the player's total score
    if (currentPlayerName == player1Name) {
        let score1 = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
        currTotal += score1;
        (<HTMLInputElement>document.getElementById("score1")).value = currTotal.toString();
        (<HTMLInputElement>document.getElementById("die")).value = "0";
    }
    else {
        let score2 = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
        currTotal += score2;
        (<HTMLInputElement>document.getElementById("score2")).value = currTotal.toString();
        (<HTMLInputElement>document.getElementById("die")).value = "0";
    }

    //reset the turn total to 0
    (<HTMLInputElement>document.getElementById("total")).value = "0";

    //change players
    changePlayers();
}