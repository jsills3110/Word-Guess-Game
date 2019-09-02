let NationalParkWordGuess = {
    // wordList has the full list of words that the computer randomly picks from.
    wordList =["national", "yosemite", "government", "wildlife", "conservancy", "nature", "unnapropriated",
        "refuge", "buffalo", "hiking", "backpacking", "rainier", "grandcanyon", "forest", "reservation",
        "preserve", "protect", "ranger", "conservation", "yellowstone", "glacier", "mountain", "animals",
        "fishing", "river", "environment", "flora", "fauna", "biodiversity", "biota", "community",
        "engagement", "habitat", "bear", "wolves", "deer", "salmon"],
    wins = 0, // Keep track of the number of wins.
    losses = 0, // Keep track of the number of losses.
    wordChosen = "",
    wordHolder = "",
    previousWord = "", // Record the last word chosen so it won't be repeated.
    guessedLetters = new Array(), // Keep track of the guessed letters.
    guessesRemaining = 0,

    initializeGame: function () {

        // Randomly chooses a word from the array of available words.
        wordChosen = wordList[Math.floor(Math.random() * wordList.length)];
        wordHolder = new Array(wordChosen.length); // Create an array the same length as the chosen word.
        guessedLetters = new Array();
        guessesRemaining = wordChosen.length + 2; // Keep track of the number of guesses remaining.

        // Fill the wordHolder array with "_" equal to the length of the wordChosen.
        for (var i = 0; i < wordChosen.length; i++) {
            wordHolder[i] = "_";
        }
    },

    guessLetter: function (userGuess) {
        var letterFound = false;
        var j = 0;

        // Loop through the chosen word to check if the letter chosen is contained in the word.
        while (letterFound == false && j < wordChosen.length) {
            if (userGuess == wordChosen[j]) {
                letterFound = true;
                // Replace "_" with the letter in the correct places of the wordHolder array.
                for (var k = 0; k < wordChosen.length; k++) {
                    if (userGuess == wordChosen[k]) {
                        wordHolder[k] = userGuess;
                    }
                }
            }
            j++;
        }

        guessedLetters.push(userGuess); // Add the guessed letter to the guessedLetter array.
        guessesRemaining--;
    },

    isWordFound: function () {
        if (wordHolder.indexOf("_") == -1) {
            return true;
        } else {
            return false;
        }
    },
}