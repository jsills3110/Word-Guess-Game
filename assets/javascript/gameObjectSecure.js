var NationalParkWordGuess = function () {
    // wordList has the full list of words that the computer randomly picks from.
    var wordList = ["national", "yosemite", "government", "wildlife", "conservancy", "nature", "unnapropriated",
        "refuge", "buffalo", "hiking", "backpacking", "rainier", "grandcanyon", "forest", "reservation",
        "preserve", "protect", "ranger", "conservation", "yellowstone", "glacier", "mountain", "animals",
        "fishing", "river", "environment", "flora", "fauna", "biodiversity", "biota", "community",
        "engagement", "habitat", "bear", "wolves", "deer", "salmon"],
        wordChosen = "", // The word chosen by the computer.
        wordHolder = [], // An array of _ to represent the wordChosen.
        previousWord = "", // The last word chosen.
        userGuess = "", // The character that the user guessed.
        guessedLetters = [], // All of the guessed letters.
        guessesRemaining = 0, // How many guesses are remaining.
        wins = 0, // The number of wins.
        losses = 0; // The number of losses.

    // Private function. Only usable by internal functions of NationalParkWordGuess.
    // Replaces the underscores of wordHolder with the letters that the user has guessed. 
    var replaceLetters = function () {
        // Replace "_" with the letter in the correct places of the wordHolder array.
        for (var k = 0; k < wordChosen.length; k++) {
            if (userGuess == wordChosen[k]) {
                wordHolder[k] = userGuess;
            }
        }
    }

    // Private function. Only usable by internal functions of NationalParkWordGuess.
    // Reduces the number of guesses remaining by 1.
    var adjustGuesses = function () {
        guessedLetters.push(userGuess);
        guessesRemaining--;
    }

    // Private function. Only usable by internal functions of NationalParkWordGuess.
    // Resets the wins and losses to 0 and the previousWord to "".
    var resetWinsAndLosses = function () {
        wins = 0;
        losses = 0;
        previousWord = "";
    }

    // Everything after this is publically accessible.
    return {

        // An array that holds the alphabet.
        alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
            "s", "t", "u", "v", "w", "x", "y", "z"],

        // Initializes the game by picking a new random word, resetting variables, and printing the letter buttons.
        initializeGame: function () {
            // Randomly chooses a word from the array of available words.
            while (wordChosen == previousWord) {
                wordChosen = wordList[Math.floor(Math.random() * wordList.length)];
            }
            previousWord = wordChosen; // Set previousWord to wordChosen for the next time initializeGame is called.
            wordHolder = []; // Create an array the same length as the chosen word.
            userGuess = "";
            guessedLetters = [];
            guessesRemaining = wordChosen.length + 2; // Keep track of the number of guesses remaining.

            // Fill the wordHolder array with "_" equal to the length of the wordChosen.
            for (var i = 0; i < wordChosen.length; i++) {
                wordHolder.push("_");
            }
            this.printButtons();
        },

        // Check to see if the guessed letter is present in the chosen word.
        guessLetter: function (theGuess) {
            var letterFound = false;
            var j = 0;

            // Loop through the chosen word to check if the letter chosen is contained in the word.
            while (letterFound == false && j < wordChosen.length) {
                if (theGuess == wordChosen[j]) {
                    letterFound = true;
                    replaceLetters(); // If the letter was found, put the letter(s) in the wordHolder.
                }
                j++;
            }

            adjustGuesses(); // Call the private function to adjust the number of guesses.
        },

        // Pick a random letter from the chosen word as a hint to the user.
        giveHint: function () {
            var randomLetter = wordChosen[Math.floor(Math.random() * wordChosen.length)];
            
            // In case we get a random letter that has already been guessed...
            if (guessedLetters.length != 0) {
                while (guessedLetters.indexOf(randomLetter) != -1) {
                    randomLetter = wordChosen[Math.floor(Math.random() * wordChosen.length)];
                }
            }
            this.guessLetter(randomLetter);
        },

        // Check if the word has been fully guessed.
        isWordFound: function () {
            return (wordHolder.indexOf("_") == -1);
        },

        // Check if the user is out of guesses.
        isOutOfGuesses: function () {
            return (guessesRemaining <= 0);
        },

        // Increment the wins count.
        gameWon: function () {
            wins++;
        },

        // Increment the losses count.
        gameLost: function () {
            losses++;
        },

        // Convert the wordHolder array to a string that can be printed.
        wordHolderToString: function () {
            var tempWord = "";
            for (var i = 0; i < wordHolder.length; i++) {
                tempWord += wordHolder[i] + " ";
            }
            return tempWord.toUpperCase();
        },

        // Convert the guessedLetters array to a string that can be printed.
        guessedLettersToString: function () {
            var tempWord = "";
            for (var i = 0; i < guessedLetters.length; i++) {
                tempWord += guessedLetters[i] + " ";
            }
            return tempWord.toUpperCase();
        },

        // Check if the letter has already been guessed.
        alreadyGuessed: function (theGuess) {
            return (guessedLetters.indexOf(theGuess) !== -1);
        },

        // Return the number of guesses remaining.
        getGuessesRemaining: function () {
            return guessesRemaining;
        },

        // Return the number of wins.
        getWins: function () {
            return wins;
        },

        // Return the number of losses.
        getLosses: function () {
            return losses;
        },

        // Dynamically append buttons to the document. The buttons represent the letters of the alphabet.
        printButtons: function () {
            // Clear the button-holder div so that we delete the previous buttons, if there were any.
            document.getElementById("button-holder").innerHTML = "";
            
            // For each letter in the alphabet array...
            for (const letter of this.alphabet) {
                var upperLetter = letter.toUpperCase();
                var v = document.createElement('input'); // Create a new input element.
                v.type = "button"; // Make the element a button.
                
                // If the letter was guessed correctly...
                if (guessedLetters.indexOf(letter) != -1 && wordChosen.indexOf(letter) != -1) {
                    v.setAttribute('class', 'btn btn-success p-3 m-1'); // Make the button green.
                
                // If the letter was guessed incorrectly...
                } else if (guessedLetters.indexOf(letter) != -1 && wordChosen.indexOf(letter) == -1) {
                    v.setAttribute('class', 'btn btn-danger p-3 m-1'); // Make the button red.
                
                // If the letter has not been guessed yet...
                } else {
                    v.setAttribute('class', 'btn btn-secondary p-3 m-1'); // Make the button grey.
                }

                v.setAttribute('style', 'min-width: 4rem'); // Set the style of the button.
                v.setAttribute('onclick', 'alphabetClicked(this)'); // Trigger a function when the button is clicked.
                v.value = upperLetter; // Set content of the button.
                document.getElementById('button-holder').appendChild(v); // Append the button to the button-holder div.
            }
        },

        // Reset the wins, losses, and previousWord, and initialize the game.
        reset: function () {
            resetWinsAndLosses();
            this.initializeGame();
        }
    }
}

// Hold the text containers in the html in vars.
var hiddenWordText = document.getElementById("hidden-word");
var winsText = document.getElementById("victories");
var lossesText = document.getElementById("defeats");
var remainingGuessesText = document.getElementById("guesses-remaining");

var game = new NationalParkWordGuess(); // Initialize a new NationalParkWordGuess game.

game.initializeGame(); 
updateText();

// When the user presses and releases a key...
document.onkeyup = function (event) {
    var userInput = event.key; // Grab which key the user pressed.
    playTheGame(userInput); // Send the key to playTheGame() function.
}

// When the user clicks on one of the alphabet buttons...
function alphabetClicked(userClick) {
    var userInput = userClick.value.toLowerCase(); // Grab the letter that the user clicked.
    playTheGame(userInput); // Send the letter to playTheGame() function.
}

// When the user clicks on the Hint button...
function hintClicked() {
    // Ask the user if they are sure.
    var areYouSure = confirm("Are you sure? This will give you a letter, but deduct your remaining guesses by 1.");
    
    // If the user is sure...
    if (areYouSure) {
        game.giveHint();
        checkWinCondition(); 
        game.printButtons();
        updateText();
    }
}

// When the user clicks on the New Word button...
function newWordClicked() {
    // Ask the user if they are sure.
    var areYouSure = confirm("Are you sure? This will count as a loss.");
    
    // If the user is sure...
    if (areYouSure) {
        game.initializeGame();
        game.gameLost();
        updateText();
    }
}

// When the user clicks on the Reset Game button...
function resetGameClicked() {
    // Ask the user if they are sure.
    var areYouSure = confirm("Are you sure? This will give you a new word and reset your wins and losses to 0.");
    
    // If the user is sure...
    if (areYouSure) {
        game.reset();
        updateText();
    }
}

// Check whether or not the word has been found.
function checkWinCondition() {
    if (game.isWordFound() && (!game.isOutOfGuesses() || game.guessesRemaining() == 0)) {
        alert("Congratulations! You won!");
        game.gameWon();
        game.initializeGame();
    } else if (game.isOutOfGuesses() && !(game.isWordFound())) {
        alert("Sorry, you lost!");
        game.gameLost();
        game.initializeGame();
    }
}

// Update the document to reflect the latest values.
function updateText() {
    winsText.textContent = game.getWins();
    lossesText.textContent = game.getLosses();
    remainingGuessesText.textContent = game.getGuessesRemaining();
    hiddenWordText.textContent = game.wordHolderToString();
}

// Check for valid input and guess the letter.
function playTheGame(userGuess) {
    // If the input is not a letter...
    if (game.alphabet.indexOf(userGuess) == -1) {
        alert("You must enter an alpha value; no other keys are allowed.");
    
    // If the letter has already been guessed...
    } else if (game.alreadyGuessed(userGuess)) {
        alert("You have already guessed that letter; try a different one.");
    
    // Guess the letter and update the document.
    } else {
        game.guessLetter(userGuess);
        checkWinCondition();
        game.printButtons();
        updateText();
    }
}