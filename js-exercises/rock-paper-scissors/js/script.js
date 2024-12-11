// VARIABLE INITIATIONS

// constant global variables
const NUM_CHOICES = 3;
const END_SCORE = 5;

// global variables to keep track of the scores
let playerScore = 0, computerScore = 0;

// global variable to indicate if first run or not
let firstRun = true;

// global variables to store last player and computer choice
let playerChoice, computerChoice;


// LOGIC FUNCTIONS

// function to convert generate random number (1 - max)
// consider each number a weapon and convert
// 1 => Rock, 2 => Paper, 3 => Scissors
function getRandomWeapon (max) {
  let randInt = Math.floor(Math.random() * max) + 1;
  if (randInt == 1) {
    return "rock";
  } else if (randInt == 2) {
    return "paper";
  } else {
    return "scissors";
  }
}

// function to get the computer choice
function getComputerChoice () {
  computerChoice = getRandomWeapon(NUM_CHOICES);
}

// function to implement round logic
function getRoundResult() {
  if (playerChoice == computerChoice) {
    return "tie";
  }
  if (computerChoice == "rock") {
    if (playerChoice == "paper") {
      return "you";
    } else {
      return "computer";
    }
  } else if (computerChoice == "paper") {
    if (playerChoice == "rock") {
      return "computer";
    } else {
      return "you";
    }
  } else {
    if (playerChoice == "rock") {
      return "you";
    } else {
      return "computer";
    }
  }
}

// function to decide if game completed or not
function decision () {
  if (playerScore == END_SCORE) {
    viewFinale("you");
  } else if (computerScore == END_SCORE) {
    viewFinale("computer");
  } else {
    viewSelection();
  }
}


// UI FUNCTIONS

// listen for click event and proceed
document.body.addEventListener('click', (event) => {
  if (event.target.tagName !==  'BUTTON') return;
  processBtn(event.target.value);
});

// funtion to view overlay
function viewOverlay () {
  const overlay = document.querySelector('#overlay');
  overlay.classList.add('show-flex');
}

// function to hide overlay
function hideOverlay () {
  const overlay = document.querySelector('#overlay');
  overlay.classList.remove('show-flex');
}

// function to hide intro
function hideIntro () {
  const intro = document.querySelector('header');
  intro.classList.remove('show-flex');
  intro.classList.add('hide');
}

// function to view selection
function viewSelection () {
  const selection = document.querySelector('#selection');
  selection.classList.add('show-flex');
}

// function to hide selection
function hideSelection () {
  const selection = document.querySelector('#selection');
  selection.classList.remove('show-flex');
}

// function to view battle
function viewBattle () {
  const playerImg = document.querySelector(".player > img");
  const computerImg = document.querySelector(".computer > img");
  const imageFolderPath = './images/';
  const imageExtension = '.svg';

  playerImg.src = imageFolderPath + playerChoice + imageExtension;
  playerImg.alt = 'player chose ' + playerChoice;

  computerImg.src = imageFolderPath + computerChoice + imageExtension;
  computerImg.alt = 'computer chose ' + computerChoice;

  const battle = document.querySelector("#battle");
  battle.classList.add('show-flex');
}

// function to hide battle
function hideBattle () {
  const battle = document.querySelector("#battle");
  battle.classList.remove('show-flex');
}

// function to view result
function viewResult () {
  const result = document.querySelector("#result");
  result.classList.add('show-flex');

  const winner = getRoundResult(playerChoice, computerChoice);
  resultSrcAndAlt(winner);

  const winnerSpan = result.querySelector("span");
  winnerSpan.textContent = winner.toUpperCase();
}

// function to hide result
function hideResult() {
  const result = document.querySelector("#result");
  result.classList.remove('show-flex');
  hideScore();
}

// function to view score
function viewScore () {
  const score = document.querySelector("#score");
  score.classList.add('show-flex');

  const spans = score.querySelectorAll("span");
  spans[0].textContent = playerScore;
  spans[1].textContent = computerScore;
}

// function to hide score
function hideScore () {
  const score = document.querySelector("#score");
  score.classList.remove('show-flex');
}

// function to view finale
function viewFinale (winner) {
  const finale = document.querySelector("#finale");
  finale.classList.add('show-flex');

  const winnerImg = finale.querySelector("img");
  const imageFilePath = "./images/";
  const imageExtension = ".svg";

  winnerImg.src = imageFilePath + winner + imageExtension;
  winnerImg.alt = winner;

  const para = finale.querySelector("p");

  if (winner != 'you') {
    para.textContent = "Better luck next time!";
  } else {
    para.textContent = "Congratulations!"
  }
}

// function to hide finale
function hideFinale () {
  const finale = document.querySelector("#finale");
  finale.classList.remove('show-flex');

  playerScore = computerScore = 0;
}

// LOGIC + UI FUNCTIONS

// function to process button value
function processBtn(value) {
  switch (value) {

    case 'playGame':
      if (firstRun) {
       viewOverlay();
      } else {
       hideIntro();
       viewSelection();
      };
      break;

    case 'closeInstruction':
      hideOverlay();
      hideIntro();
      viewSelection();
      break;

    case 'rock':
    case 'paper':
    case 'scissors':
      hideSelection();
      getComputerChoice();
      playerChoice = value;
      viewBattle();
      break;

    case 'closeBattle':
      hideBattle();
      viewResult();
      break;

    case 'closeResult':
      hideResult();
      decision();
      break;

    case 'playAgain':
      hideFinale();
      viewSelection();
      break;

    default:
      console.log("In development!");
  }
}

// function to add result images and alts
function resultSrcAndAlt(winner) {
  const result = document.querySelector("#result")
  const playerImg = result.querySelector(".player > img");
  const computerImg = result.querySelector(".computer > img");
  const imageFolderPath = './images/';
  const imageExtension = '.svg';

  switch (winner) {

    case 'you':
      playerImg.src = imageFolderPath + playerChoice + "-win" + imageExtension;
      computerImg.src = imageFolderPath + computerChoice + "-loss" + imageExtension;
      playerImg.alt = 'you win';
      computerImg.alt = 'computer loses';
      playerScore++;
      break;

    case 'computer':
      playerImg.src = imageFolderPath + playerChoice + "-loss" + imageExtension;
      computerImg.src = imageFolderPath + computerChoice + "-win" + imageExtension;
      playerImg.alt = "you lose";
      computerImg.alt = "computer wins";
      computerScore++;
      break;

    case 'tie':
      playerImg.src = imageFolderPath + playerChoice + "-draw-user" + imageExtension;
      computerImg.src = imageFolderPath + computerChoice + "-draw-comp" + imageExtension;
      playerImg.alt = computerImg.alt = "tie";
      break;

    default:
      console.log("In development!");
      break;
  }

  viewScore();
}
