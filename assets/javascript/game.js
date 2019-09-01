var wordList = ["national", "yosemite", "government", "wildlife", "conservancy", "nature", "unnapropriated", "refuge", "buffalo",
                "hiking", "backpacking", "rainier", "grandcanyon", "forest", "reservation", "preserve", "protect", "ranger",
                "conservation", "yellowstone", "glacier", "mountain", "animals", "fishing", "river", "environment", "flora",
                "fauna", "biodiversity", "biota", "community", "engagement", "habitat", "bear", "wolves", "deer", "salmon"];
var wins = 0;
var losses = 0;
var previousWord = "";
var guessesRemaining = 7;

var hiddenWordText = document.getElementById("hidden-word");
var guessedLettersText = document.getElementById("guessed-letters");
var winsText = document.getElementById("victories");
var lossesText = document.getElementById("defeats");
var remainingGuessesText = document.getElementById("guesses-remaining");

// Randomly chooses a choice from the options array.
var wordChosen = wordList[Math.floor(Math.random() * wordList.length)];
console.log(wordChosen);
var wordHolder = new Array(wordChosen.length);
var tempWord = "";
for (var i = 0; i < wordChosen.length; i++) {
    wordHolder[i] = "_ ";
    tempWord += "_ ";
}
hiddenWordText.textContent = tempWord;
var guessedLetters = new Array();

document.onkeyup = function(event) {
    var userGuess = event.key;
    if (!userGuess.match(/^[a-z]+$/i)) {
        alert("You must enter an alpha value; no other keys are allowed.");
    } else {
        var letterFound = false;
        var j = 0;
        while (letterFound == false && j < wordChosen.length) {
            if (userGuess == wordChosen[j]) {
                letterFound = true;
            }
            j++;
        }
        if (letterFound) {
            for (var k = 0; k < wordChosen.length; k++) {
                if (userGuess == wordChosen[k]) {
                    wordHolder[k] = userGuess + " ";
                }
            }
        }
        guessedLetters.push(userGuess + " ");

        var tempWord = "";
        for (var l = 0; l < wordHolder.length; l++) {
            tempWord += wordHolder[l];
        }
        hiddenWordText.textContent = tempWord;
        tempWord = "";
        for (var m = 0; m < wordHolder.length; m++) {
            tempWord += guessedLetters[m];
        }
        guessedLettersText.textContent = tempWord;
    }
}