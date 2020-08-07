const startButton = document.getElementById('start-game');
const cResult = document.getElementById('cResult');
const pResult = document.getElementById('pResult');
const dResult = document.getElementById('dResult');
const finalResult = document.getElementById('final-result');
const gameFinalResultMessage = document.getElementById('gameFinalResult');

const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const DRAWN_RESULT = 'DRAW';
const PLAYER_WINS = 'YOU WIN';
const COMPUTER_WINS = 'COMPUTER WINS';
const DEFAULT_CHOICE = ROCK;
const DEFAULT_CHOICE_MESSAGE = `You enter an invalid input! We selected ${DEFAULT_CHOICE} as a default choice!`;
let computerResult = 0;
let playerResult = 0;
let drawn = 0;
let isGameStarted = false;

const getPlayerChoice = function () {
  let playerChoice = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}`,
    ''
  ).toUpperCase();
  if (
    playerChoice !== ROCK &&
    playerChoice !== PAPER &&
    playerChoice !== SCISSORS
  ) {
    alert(`${DEFAULT_CHOICE_MESSAGE}`);
    return DEFAULT_CHOICE;
  }
  return playerChoice;
};

const getComputerChoice = function () {
  let randomValue = Math.random();
  let computerChoice;
  if (randomValue < 0.34) {
    computerChoice = ROCK;
  } else if (randomValue < 0.67 && randomValue > 0.34) {
    computerChoice = PAPER;
  } else {
    computerChoice = SCISSORS;
  }
  return computerChoice;
};

const getTheWinner = function (pSelection, cSelection) {
  let result;
  if (pSelection === cSelection) {
    result = DRAWN_RESULT;
  } else if (
    (pSelection === ROCK && cSelection === PAPER) ||
    (pSelection === PAPER && cSelection === SCISSORS) ||
    (pSelection === SCISSORS && cSelection === ROCK)
  ) {
    result = COMPUTER_WINS;
  } else {
    result = PLAYER_WINS;
  }
  return result;
};

const startGame = function () {
  if (isGameStarted) {
    startButton.disable;
  }
  isGameStarted = true;

  alert('Game is started!');
  const playerSelection = getPlayerChoice();
  const computerSelection = getComputerChoice();
  const winner = getTheWinner(playerSelection, computerSelection);
  const GAME_WINNER = `You choose $${playerSelection}, computer choose ${computerSelection}. 
${winner}`;
  alert(GAME_WINNER);
  if (winner === COMPUTER_WINS) {
    computerResult++;
    cResult.innerHTML = computerResult;
  } else if (winner === PLAYER_WINS) {
    playerResult++;
    pResult.innerHTML = playerResult;
  } else {
    drawn++;
    dResult.innerHTML = drawn;
  }

  if (playerResult === 3 || computerResult === 3) {
    const resetResultMessage = `The final result of the game is Computer: ${computerResult} - You: ${playerResult}.
The result will be reset!`;
    finalResult.style.visibility = 'visible';
    gameFinalResultMessage.innerHTML = resetResultMessage;
    setTimeout(() => {
      alert('Please click "Ok" to reset the game!!!');
      cResult.innerHTML = 0;
      pResult.innerHTML = 0;
      dResult.innerHTML = 0;
      computerResult = 0;
      playerResult = 0;
      drawn = 0;
      finalResult.style.visibility = 'hidden';
      gameFinalResultMessage.innerHTML = '';
    }, 5000);
  }
};

startButton.addEventListener('click', startGame);
