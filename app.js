console.log('starting app');

const fs = require('fs');
const inquirer = require("inquirer");

const command = process.argv[2];
const cmdVal = process.argv[3];
var lives = 0
var words = ["wolf", "hyena", "tiger", "lion", "puma", "fox"]
// var letter, letters, currentWord

var validateLetter = (letter) => {
  var reg = /^[A-Za-z]+$/;
  // console.log(letter.match(reg))
  return reg.test(letter) || "should be an alphabet"
}
var checkLetter = (letter) => {
  var guessed = false
  for (let i = 0; i < word.length; i++) {
    if (letter === word[i]) {
      letters[i] = letter
      guessed = true
    }
  }
  if (!guessed) {
    // console.log(`wrong`)
    lives -= 1;
    console.log(`-----------------------\nWRONG!!\n------------------------`)
    console.log(`You have ${lives} left!!`)
    return false
  } else {
    return true
  }
}
var start = () => {
  lives = 10;
  currentWord = (words[Math.floor(Math.random() * words.length)]).toUpperCase();
  console.log(`IT IS ALWAYS WILD DOG/CAT`)
  word = currentWord.split('');
  letters = word.map(x => '_')
  hang(letters)
}

var hang = () => {
  let letterPl = letters.join(' ')
  inquirer.prompt([{
      name: "letter",
      // message: "Your letter of choice?" + '\n' + "test",
      message: `${letterPl}\n-------------------------------\n Your letter of choice?`,
      validate: validateLetter
    }])
    .then(function(answers) {
      answer = answers.letter.toUpperCase()
      // console.log(`test ${(/^[A-Za-z]+$/).test(letters)}`)
      guess(answer);
    });
}

var guess = (letter) => {
  // if ((lettersMatched && lettersMatched.indexOf(letter) > -1) || (lettersGuessed && lettersGuessed.indexOf(letter) > -1)) {
  //   output.innerHTML = '"' + letter.toUpperCase() + '"' + messages.guessed;
  //   output.classList.add("alert-warning");
  // }

  if (!checkLetter(letter)) {
    if (lives === 0) {
      console.log(`lose; you have ${lives} lives`)
      playAgain();
    }
    else {
      hang()
    }
    // (lives === 0) ? `lose; you have ${lives}` : hang()
  } else if (letters.join('').match(/^[A-Za-z]+$/)) {
    console.log(`You win!! ${currentWord}`)

  } else {
    hang()
  }
}

var playAgain = () => {
   inquirer.prompt([{
      name: "play",
      // message: "Your letter of choice?" + '\n' + "test",
      message: `Play Again??`,
      type: "confirm",
      default: true
    }])
    .then(function(answers) {
   (answers.play) ? start() : "GoodBye!"
      // console.log(message)
    });
}

start()
