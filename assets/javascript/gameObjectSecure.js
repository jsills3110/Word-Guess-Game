var NationalParkWordGuess = function () {
    // wordList has the full list of words that the computer randomly picks from.
    var wordList = ["national", "yosemite", "government", "wildlife", "conservancy", "nature", "unnapropriated",
        "refuge", "buffalo", "hiking", "backpacking", "rainier", "grandcanyon", "forest", "reservation",
        "preserve", "protect", "ranger", "conservation", "yellowstone", "glacier", "mountain", "animals",
        "fishing", "river", "environment", "flora", "fauna", "biodiversity", "biota", "community",
        "engagement", "habitat", "bear", "wolves", "deer", "salmon"],
        wordChosen = "", // The word chosen by the computer.
        wordHolder = new Array(), // An array of _ to represent the wordChosen.
        previousWord = "", // The last word chosen.
        userGuess = "", // The character that the user guessed.
        guessedLetters = new Array(), // All of the guessed letters.
        guessesRemaining = 0; // How many guesses are remaining.

    // Private function.
    var replaceLetters = function () {
        // Replace "_" with the letter in the correct places of the wordHolder array.
        for (var k = 0; k < wordChosen.length; k++) {
            if (userGuess == wordChosen[k]) {
                wordHolder[k] = userGuess;
            }
        }
    }

    // Private function.
    var adjustGuesses = function () {
        guessedLetters.push(userGuess); // Add the guessed letter to the guessedLetter array.
        guessesRemaining--;
        console.log(guessesRemaining);
    }

    return {

        wins: 0, // The number of wins.
        losses: 0, // The number of losses.

        // Public function.
        initializeGame: function () {
            // Randomly chooses a word from the array of available words.
            while (wordChosen == previousWord) {
                wordChosen = wordList[Math.floor(Math.random() * wordList.length)];
            }
            previousWord = wordChosen;
            wordHolder = new Array(wordChosen.length); // Create an array the same length as the chosen word.
            userGuess = "";
            guessedLetters = new Array();
            guessesRemaining = wordChosen.length + 2; // Keep track of the number of guesses remaining.

            // Fill the wordHolder array with "_" equal to the length of the wordChosen.
            for (var i = 0; i < wordChosen.length; i++) {
                wordHolder[i] = "_";
            }
        },

        // Public function.
        guessLetter: function (theGuess) {
            userGuess = theGuess;
            var letterFound = false;
            var j = 0;

            // Loop through the chosen word to check if the letter chosen is contained in the word.
            while (letterFound == false && j < wordChosen.length) {
                if (userGuess == wordChosen[j]) {
                    letterFound = true;
                    replaceLetters();
                }
                j++;
            }

            adjustGuesses();
        },

        // Public function.
        isWordFound: function () {
            console.log("isWordFound: " + (wordHolder.indexOf("_") == -1));
            return (wordHolder.indexOf("_") == -1);
        },

        isOutOfGuesses: function () {
            console.log("isOutOfGuesses: " + (guessesRemaining <= 0));
            return (guessesRemaining <= 0);
        },

        // Public function.
        gameWon: function () {
            this.wins++;
        },

        // Public function.
        gameLost: function () {
            this.losses++;
        },

        // Public function.
        wordHolderToString: function () {
            var tempWord = "";
            for (var i = 0; i < wordHolder.length; i++) {
                tempWord += wordHolder[i] + " ";
            }
            return tempWord;
        },

        // Public function.
        guessedLettersToString: function () {
            var tempWord = "";
            for (var i = 0; i < guessedLetters.length; i++) {
                tempWord += guessedLetters[i] + " ";
            }
            return tempWord;
        },

        // Public function.
        alreadyGuessed: function (theGuess) {
            return (guessedLetters.indexOf(theGuess) !== -1);
        },

        // Public function.
        guessesRemaining: function () {
            return guessesRemaining;
        }
    }
}

// Hold the text containers in the html in vars.
var hiddenWordText = document.getElementById("hidden-word");
var guessedLettersText = document.getElementById("guessed-letters");
var winsText = document.getElementById("victories");
var lossesText = document.getElementById("defeats");
var remainingGuessesText = document.getElementById("guesses-remaining");

var game = new NationalParkWordGuess();

game.initializeGame();
updateText();

// When the user presses and releases a key...
document.onkeyup = function (event) {
    var userGuess = event.key; // Grab which key the user pressed.

    // Check that the key was a letter.
    if (!userGuess.match(/^[a-z]+$/i)) {
        alert("You must enter an alpha value; no other keys are allowed.");

        // Check that the letter was not already guessed.
    } else if (game.alreadyGuessed(userGuess)) {
        alert("You have already guessed that letter; try a different one.");
    } else {
        game.guessLetter(userGuess);

        if (game.isWordFound() && !(game.isOutOfGuesses())) {
            alert("Congratulations! You won!");
            game.gameWon();
            game.initializeGame();
        } else if (game.isOutOfGuesses() && !(game.isWordFound())) {
            alert("Sorry, you lost!");
            game.gameLost();
            game.initializeGame();
        }

        updateText();
    }
}

function updateText() {
    winsText.textContent = game.wins;
    lossesText.textContent = game.losses;
    remainingGuessesText.textContent = game.guessesRemaining();
    hiddenWordText.textContent = game.wordHolderToString();
    guessedLettersText.textContent = game.guessedLettersToString();
}