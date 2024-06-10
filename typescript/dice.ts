// Function to check if a string is empty or contains only whitespace
function isEmptyOrWhitespace(str: string): boolean {
    return str.trim().length === 0;
}

// Function to generate a random number between minValue and maxValue (inclusive)
function generateRandomValue(minValue: number, maxValue: number): number {
    var random = Math.random();
    random = Math.floor(random * (maxValue - minValue + 1)) + minValue;
    return random;
}

// Function to switch players
function changePlayers(): void {
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    // Swap from player to player by comparing current name to player names
    // Set currentPlayerName to the next player
    if (currentPlayerName == player1Name) {
        currentPlayerName = player2Name;
        (<HTMLInputElement>document.getElementById("current")).innerText = player2Name
    } else {
        currentPlayerName = player1Name;
        (<HTMLInputElement>document.getElementById("current")).innerText = player1Name
    }
}

// Function to be executed when the window loads
window.onload = function () {
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;
    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

// Function to create a new game
function createNewGame() {
    (<HTMLButtonElement>document.getElementById("roll")).disabled = false;
    (<HTMLButtonElement>document.getElementById("hold")).disabled = false;

    (<HTMLInputElement>document.getElementById("die")).value = "0";
    document.getElementById("winner").innerText = "";

    // Set player 1 and player 2 scores to 0
    (<HTMLInputElement>document.getElementById("score1")).value = "0";
    (<HTMLInputElement>document.getElementById("score2")).value = "0";

    // Verify each player has a name
    // If both players don't have a name display error
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    if (isEmptyOrWhitespace(player1Name) || isEmptyOrWhitespace(player2Name)) {
        alert("Both players must have a name!")
    }
    // If both players do have a name start the game!
    else {
        (<HTMLElement>document.getElementById("turn")).classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        // Lock in player names and then change players
        (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
        (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
        changePlayers();
    }
}

// Function to roll the die
function rollDie(): void {
    let score1 = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let score2 = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    // Roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let randomNum = generateRandomValue(1, 6);

    // If the roll is 1, change players and set current total to 0
    if (randomNum == 1) {
        changePlayers();
        currTotal = 0;
    }

    // If the roll is greater than 1, add roll value to current total
    if (randomNum > 1) {
        currTotal += randomNum;

        // Check if the current player has reached or exceeded 100 points
        if ((currentPlayerName == player1Name && score1 + currTotal >= 100) || (currentPlayerName == player2Name && score2 + currTotal >= 100)) {
            (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
            holdDie();
            document.getElementById("winner").innerText = "Congratulations " + currentPlayerName + ", you won the game!";

            (<HTMLButtonElement>document.getElementById("roll")).disabled = true;
            (<HTMLButtonElement>document.getElementById("hold")).disabled = true;
        }
    }

    // Set the die roll to value player rolled and display current total on form
    (<HTMLInputElement>document.getElementById("die")).value = randomNum.toString();
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
}

// Function to hold the die
function holdDie(): void {
    // Get the current turn total
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    // Determine who the current player is
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;

    // Add the current turn total to the player's total score
    if (currentPlayerName == player1Name) {
        let score1 = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
        currTotal += score1;
        (<HTMLInputElement>document.getElementById("score1")).value = currTotal.toString();
        (<HTMLInputElement>document.getElementById("die")).value = "0";
    } else {
        let score2 = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
        currTotal += score2;
        (<HTMLInputElement>document.getElementById("score2")).value = currTotal.toString();
        (<HTMLInputElement>document.getElementById("die")).value = "0";
    }

    // Reset the turn total to 0
    (<HTMLInputElement>document.getElementById("total")).value = "0";

    // Change players
    changePlayers();
}
