function isEmptyOrWhitespace(str) {
    return str.trim().length === 0;
}
function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    random = Math.floor(random * (maxValue - minValue + 1)) + minValue;
    return random;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (currentPlayerName == player1Name) {
        currentPlayerName = player2Name;
        document.getElementById("current").innerText = player2Name;
    }
    else {
        currentPlayerName = player1Name;
        document.getElementById("current").innerText = player1Name;
    }
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (isEmptyOrWhitespace(player1Name) || isEmptyOrWhitespace(player2Name)) {
        alert("Both players must have a name!");
    }
    else {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
    let randomNum = generateRandomValue(1, 6);
    if (randomNum == 1) {
        changePlayers();
        currTotal = 0;
    }
    if (randomNum > 1) {
        currTotal += randomNum;
    }
    document.getElementById("die").value = randomNum.toString();
    document.getElementById("total").value = currTotal.toString();
}
function holdDie() {
    let currTotal = parseInt(document.getElementById("total").value);
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (currentPlayerName == player1Name) {
        let score1 = parseInt(document.getElementById("score1").value);
        currTotal += score1;
        document.getElementById("score1").value = currTotal.toString();
        document.getElementById("die").value = "0";
    }
    else {
        let score2 = parseInt(document.getElementById("score2").value);
        currTotal += score2;
        document.getElementById("score2").value = currTotal.toString();
        document.getElementById("die").value = "0";
    }
    document.getElementById("total").value = "0";
    changePlayers();
}
