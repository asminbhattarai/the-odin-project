// Check whether the JS is linked
// console.log("Hello World!");

// Initiate constant global variables
const NUM_CHOICES = 3;
const NUM_GAMES = 5;

// Initiate variables to keep track of the players score
let humanScore = 0, computerScore = 0;

// Function to capitalize a word
function capitalize (word) {
  return (word[0].toUpperCase() + word.slice(1).toLowerCase());
}

// Function to convert generate random number (1 - max)
// Consider each number a tool and convert
// 1 => Rock, 2 => Paper, 3 => Scissors
function getRandomTool (max) {
  let randInt = Math.floor(Math.random() * max) + 1;
  if (randInt == 1) {
    return "rock";
  } else if (randInt == 2) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Function to get the computer choice
function getComputerChoice () {
  let choice = getRandomTool(NUM_CHOICES);
  return choice;
}

// Check whether the getComputerChoice() works as intended
// console.log(getComputerChoice());

// Function to process human choice
function processHumanChoice(text) {
  if (text == null) {
    return null;
  } else {
    return validateHumanChoice(text);
  }
}

// Function to validate human choice
function validateHumanChoice(text) {
  text = text.toLowerCase();
  if (text === "rock" || text === "paper" || text === "scissors") {
    return true;
  } else {
    return false;
  }
}

// Function to get human input
function getHumanChoice () {
  let text = "What\'s your move? Rock, paper or scissors?";
  let keepGoing = true, choice;
  while (keepGoing) {
    choice = prompt(text);
    let result = processHumanChoice(choice);
    if (result == null) {
      return "exit";
    } else if (result) {
      keepGoing = false;
    } else {
      text = "Type (any one) exactly as shown: rock, paper or scissors?";
    }
  }
  return choice.toLowerCase();
}

// Check whether the getHumanChoice() works as intended
// console.log(getHumanChoice());

// Function to display round choices
function displayRoundBattle (computerChoice, humanChoice) {
  if (humanChoice == "exit") {
    console.log("Cancelling...");
  } else {
    console.log("You chose " + humanChoice + " and computer chose " + computerChoice + ".");
  }
}

// Function to implement round logic
function getRoundResult(computerChoice, humanChoice) {
  if (computerChoice == humanChoice) {
    return "draw";
  }
  if (computerChoice == "rock") {
    if (humanChoice == "paper") {
      return "human";
    } else {
      return "computer";
    }
  } else if (computerChoice == "paper") {
    if (humanChoice == "rock") {
      return "computer";
    } else {
      return "human";
    }
  } else {
    if (humanChoice == "rock") {
      return "human";
    } else {
      return "computer";
    }
  }
}

// Function to display round result
function displayRoundResult(computerChoice, humanChoice) {
  const capitalHumanChoice = capitalize(humanChoice);
  const capitalComputerChoice = capitalize(computerChoice);
  const humanWin = "You win! " + capitalHumanChoice  + " beats " + capitalComputerChoice + ".";
  const computerWin = "You lose! " + capitalComputerChoice + " beats " + capitalHumanChoice + ".";
  const draw = "It's a draw! " + capitalHumanChoice + " = " + capitalHumanChoice + ", obviously?";

  if (humanChoice != "exit") {
    const result = getRoundResult(computerChoice, humanChoice);
    if (result == "human") {
      console.log(humanWin);
     humanScore++;
    } else if (result == "computer") {
      console.log(computerWin);
     computerScore++;
    } else {
      console.log(draw);
    }
    return true;
  } else {
    return false;
  }
}

// Function to play a round
function playRound() {
  let humanChoice = getHumanChoice();
  let computerChoice = getComputerChoice();

  displayRoundBattle(computerChoice, humanChoice);

  return displayRoundResult(computerChoice, humanChoice);

}

// Check whether the playRound() works as intended
// playRound();

// Function to display game result
function displayGameResult() {
  if (humanScore > computerScore) {
    console.log("You win! You beat the computer by " + (humanScore-computerScore) + ".");
  } else if (computerScore > humanScore) {
    console.log("You lose! Computer beat you by " + (computerScore-humanScore) + ".");
  } else {
    console.log("You and computer tied! Maybe, just maybe, play again to determine the true winner?")
  }
}

// Function to play a game
function playGame() {
  console.clear();
  let continueGame = true;
  for (let i = 0; i < NUM_GAMES && continueGame; i++) {
    continueGame = playRound();
  }
  displayGameResult();
}

// Function to replay the game
function playAgain() {
  const replay = confirm("Play again?");
  return replay;
}

// Function to introduce the player to the game
function intro () {
  alert("Welcome to the Rock, Paper and Scissors Game");
  console.log("This is the console. Congratulations!");
  if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
    alert("Press COMMAND + OPTION + J together to open the console.");
  } else {
    alert("Press CONTROL + SHIFT + J together to open the console.");
  }
  alert("Enjoy the game!");
}

// Function to start
function start() {
  let keepGoing = true;
  intro();
  while (keepGoing) {
    computerScore = humanScore = 0;
    playGame();
    keepGoing = playAgain();
  }
}

start();
