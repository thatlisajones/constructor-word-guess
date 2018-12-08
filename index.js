
var Word = require("./word.js");
var inquirer = require("inquirer");

// letters 
var letterArray = "abcdefghijklmnopqrstuvwxyz";

// words to guess
var highCrimes = ["bribery", "treason", "perjury", "obstruction", "fraud", "forgery", "blackmail", "extortion", "tax evasion", "murder", "arson", "kidnapping"];

// Pick random highCrime
var randomIndex = Math.floor(Math.random() * highCrimes.length);
var randomWord = highCrimes[randomIndex];

// constructor of word
computerWord = new Word(randomWord);

var requireNewWord = false;

// guessed letters
var incorrectLetters = [];
var correctLetters = [];

// guesses remaining
var guessesLeft = 10;

function play() {

    // New word for word constructor if true
    if (requireNewWord) {
        // Selects random word from highCrimes array
        var randomIndex = Math.floor(Math.random() * highCrimes.length);
        var randomWord = highCrimes[randomIndex];

    
        computerWord = new Word(randomWord);

        
        requireNewWord = false;
    }


    // If a letter guessed is correct
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess the impeachable offense. Pick a letter: ",
                    name: "userinput"
                }
            ])
            .then(function (input) {

               
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nTry again.\n");
                    play();
                } else {

                   
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nLetter already guessed or blank\n");
                        play();
                    } else {

                        // See whether guess is correct
                        var wordCheckArray = [];

                        
                        computerWord.userGuess(input.userinput);

                        // See whether guess is correct
                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }

                        
                        computerWord.log();

                        // Show guesses left
                        console.log("Guesses left: " + guessesLeft + "\n");

                        // Show letters guessed already
                        console.log("Letters already guessed: " + incorrectLetters.join(" ") + "\n");

                        // Guesses left
                        if (guessesLeft > 0) {
                            // Call function 
                            play();
                        } else {
                            console.log("You lose. We all lose.\n");

                            restartGame();
                        }


                        
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("You guessed the crime. But will anyone do jail time?\n");

        restartGame();
    }

   
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "You can:",
                choices: ["play again", "exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            console.log(input.restart);
            if (input.restart === "play again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                play();
            } else {
                return
            }
        })
}

play();
