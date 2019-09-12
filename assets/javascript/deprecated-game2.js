// ***************************
// ******* DEPRECATED ********
// ***************************
// *SAVED FOR REVIEW PURPOSES*
// ***************************

let game = {
    // wordList has the full list of words that the computer randomly picks from.
    wordList: ["national", "yosemite", "government", "wildlife", "conservancy", "nature", "unnapropriated",
        "refuge", "buffalo", "hiking", "backpacking", "rainier", "grandcanyon", "forest", "reservation",
        "preserve", "protect", "ranger", "conservation", "yellowstone", "glacier", "mountain", "animals",
        "fishing", "river", "environment", "flora", "fauna", "biodiversity", "biota", "community",
        "engagement", "habitat", "bear", "wolves", "deer", "salmon"],
    wins: 0, // The number of wins.
    losses: 0, // The number of losses.
    wordChosen: "", // The word chosen by the computer.
    wordHolder: new Array(), // An array of _ to represent the wordChosen.
    previousWord: "", // The last word chosen.
    userGuess: "", // The character that the user guessed.
    guessedLetters: new Array(), // All of the guessed letters.
    guessesRemaining: 0, // How many guesses are remaining.

    // Public function. 
    initializeGame: function () {
        // Randomly chooses a word from the array of available words.
        while (this.wordChosen == this.previousWord) {
            this.wordChosen = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        }
        this.previousWord = this.wordChosen;
        this.wordHolder = new Array(this.wordChosen.length); // Create an array the same length as the chosen word.
        this.userGuess = "";
        this.guessedLetters = new Array();
        this.guessesRemaining = this.wordChosen.length + 2; // Keep track of the number of guesses remaining.

        // Fill the wordHolder array with "_" equal to the length of the wordChosen.
        for (var i = 0; i < this.wordChosen.length; i++) {
            this.wordHolder[i] = "_";
        }
    },

    // Public function.
    guessLetter: function (theGuess) {
        this.userGuess = theGuess;
        var letterFound = false;
        var j = 0;

        // Loop through the chosen word to check if the letter chosen is contained in the word.
        while (letterFound == false && j < this.wordChosen.length) {
            if (this.userGuess == this.wordChosen[j]) {
                letterFound = true;
                this.replaceLetters();
            }
            j++;
        }

        this.adjustGuesses();
    },

    // Private function.
    replaceLetters: function () {
        // Replace "_" with the letter in the correct places of the wordHolder array.
        for (var k = 0; k < this.wordChosen.length; k++) {
            if (this.userGuess == this.wordChosen[k]) {
                this.wordHolder[k] = this.userGuess;
            }
        }
    },

    // Private function.
    adjustGuesses: function () {
        this.guessedLetters.push(this.userGuess); // Add the guessed letter to the guessedLetter array.
        this.guessesRemaining--;
    },

    // Public function.
    isWordFound: function () {
        console.log("isWordFound: " + (this.wordHolder.indexOf("_") == -1));
        return (this.wordHolder.indexOf("_") == -1);
    },

    isOutOfGuesses: function () {
        console.log("isOutOfGuesses: " + (this.guessesRemaining <= 0));
        return (this.guessesRemaining <= 0);
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
        for (var i = 0; i < this.wordHolder.length; i++) {
            tempWord += this.wordHolder[i] + " ";
        }
        return tempWord;
    },

    // Public function.
    guessedLettersToString: function () {
        var tempWord = "";
        for (var i = 0; i < this.guessedLetters.length; i++) {
            tempWord += this.guessedLetters[i] + " ";
        }
        return tempWord;
    },

    // Public function.
    alreadyGuessed: function (theGuess) {
        return (this.guessedLetters.indexOf(theGuess) !== -1);
    }
}

// Hold the text containers in the html in vars.
var hiddenWordText = document.getElementById("hidden-word");
var guessedLettersText = document.getElementById("guessed-letters");
var winsText = document.getElementById("victories");
var lossesText = document.getElementById("defeats");
var remainingGuessesText = document.getElementById("guesses-remaining");

game.initializeGame();
winsText.textContent = game.wins;
lossesText.textContent = game.losses;
remainingGuessesText.textContent = game.guessesRemaining;
hiddenWordText.textContent = game.wordHolderToString();
guessedLettersText.textContent = game.guessedLettersToString();

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
            winsText.textContent = game.wins;
            game.initializeGame();
        } else if (game.isOutOfGuesses() && !(game.isWordFound())) {
            alert("Sorry, you lost!");
            game.gameLost();
            lossesText.textContent = game.losses;
            game.initializeGame();
        }
        
        hiddenWordText.textContent = game.wordHolderToString();
        guessedLettersText.textContent = game.guessedLettersToString();
        remainingGuessesText.textContent = game.guessesRemaining;
    }
}