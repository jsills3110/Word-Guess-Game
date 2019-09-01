// wordList has the full list of words that the computer randomly picks from.
var wordList = ["national", "yosemite", "government", "wildlife", "conservancy", "nature", "unnapropriated",
    "refuge", "buffalo", "hiking", "backpacking", "rainier", "grandcanyon", "forest", "reservation",
    "preserve", "protect", "ranger", "conservation", "yellowstone", "glacier", "mountain", "animals",
    "fishing", "river", "environment", "flora", "fauna", "biodiversity", "biota", "community",
    "engagement", "habitat", "bear", "wolves", "deer", "salmon"];

var wins = 0; // Keep track of the number of wins.
var losses = 0; // Keep track of the number of losses.
var previousWord = ""; // Record the last word chosen so it won't be repeated.
var guessesRemaining = 7; // Keep track of the number of guesses remaining.
var guessedLetters = new Array(); // Keep track of the guessed letters.

// Hold the text containers in the html in vars.
var hiddenWordText = document.getElementById("hidden-word");
var guessedLettersText = document.getElementById("guessed-letters");
var winsText = document.getElementById("victories");
var lossesText = document.getElementById("defeats");
var remainingGuessesText = document.getElementById("guesses-remaining");

remainingGuessesText.textContent = guessesRemaining;
winsText.textContent = wins;
lossesText.textContent = losses;

// Randomly chooses a word from the array of available words.
var wordChosen = wordList[Math.floor(Math.random() * wordList.length)];
var wordHolder = new Array(wordChosen.length); // Create an array the same length as the chosen word.
console.log(wordChosen);
// 
for (var i = 0; i < wordChosen.length; i++) {
    wordHolder[i] = "_";
    hiddenWordText.textContent += "_ ";
}

// When the user presses and releases a key...
document.onkeyup = function (event) {
    var userGuess = event.key; // Grab which key the user pressed.

    // Check that the key was a letter.
    if (!userGuess.match(/^[a-z]+$/i)) {
        alert("You must enter an alpha value; no other keys are allowed.");

        // Check that the letter was not already guessed.
    } else if (guessedLetters.indexOf(userGuess) !== -1) {
        alert("You have already guessed that letter; try a different one.");

    } else {
        var letterFound = false;
        var j = 0;

        // Loop through the chosen word to check if the letter chosen is contained in the word.
        while (letterFound == false && j < wordChosen.length) {
            if (userGuess == wordChosen[j]) {
                letterFound = true;
            }
            j++;
        }

        // If the letter was found...
        if (letterFound) {
            // Replace "_" with the letter in the correct places of the wordHolder array.
            for (var k = 0; k < wordChosen.length; k++) {
                if (userGuess == wordChosen[k]) {
                    wordHolder[k] = userGuess;
                }
            }
        }

        guessedLetters.push(userGuess); // Add the guessed letter to the guessedLetter array.

        guessesRemaining--;

        // Check to see if the word has been successfully found.
        var wordFound = false;
        if (wordHolder.indexOf("_") == -1) {
            wordFound = true;
        }
        console.log(wordFound);

        // Print the wordChosen to the document.
        var tempWord = "";
        for (var l = 0; l < wordHolder.length; l++) {
            tempWord += wordHolder[l] + " ";
        }
        hiddenWordText.textContent = tempWord;

        // Print the guessedLetters to the document.
        tempWord = "";
        for (var m = 0; m < guessedLetters.length; m++) {
            tempWord += guessedLetters[m] + " ";
        }
        guessedLettersText.textContent = tempWord;

        remainingGuessesText.textContent = guessesRemaining; // Print the remaining guesses.
    }

    if (wordFound && !(guessesRemaining < 0)) {
        alert("Congratulations! You won!");

        wins++;
        winsText.textContent = wins;

        hiddenWordText.textContent = "";
        guessedLettersText.textContent = "";

        // Randomly chooses a word from the array of available words.
        wordChosen = wordList[Math.floor(Math.random() * wordList.length)];
        wordHolder = new Array(wordChosen.length); // Create an array the same length as the chosen word.

        // 
        for (var i = 0; i < wordChosen.length; i++) {
            wordHolder[i] = "_";
            hiddenWordText.textContent += "_ ";
        }

        guessedLetters = new Array(); // Keep track of the guessed letters.
        guessesRemaining = 7; // Keep track of the number of guesses remaining.

        remainingGuessesText.textContent = guessesRemaining;
    } else if (guessesRemaining <= 0 && !wordFound) {
        alert("Sorry, you lost!");

        losses++;
        lossesText.textContent = losses;

        hiddenWordText.textContent = "";
        guessedLettersText.textContent = "";

        // Randomly chooses a word from the array of available words.
        wordChosen = wordList[Math.floor(Math.random() * wordList.length)];
        wordHolder = new Array(wordChosen.length); // Create an array the same length as the chosen word.

        // 
        for (var i = 0; i < wordChosen.length; i++) {
            wordHolder[i] = "_";
            hiddenWordText.textContent += "_ ";
        }

        guessedLetters = new Array(); // Keep track of the guessed letters.
        guessesRemaining = 7; // Keep track of the number of guesses remaining.

        remainingGuessesText.textContent = guessesRemaining;      
    }
}