const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
}

const game = {
  playerHand: "",
  aiHand: "",
}

const hands = [...document.querySelectorAll('.select img')];

function handSelection() {
  game.playerHand = this.dataset.option;
  hands.forEach(hand => hand.style.boxShadow = '');
  this.style.boxShadow = '0 0 0 4px blue';
}

function aiChoice() {
  return hands[Math.floor(Math.random() * hands.length)].dataset.option;
}

function checkResult(player, ai) {
  if (player === ai) {
    return 'draw';
  } else if (player === 'papier' && ai === 'kamień' || player === 'kamień' && ai === 'nożyczki' || player === 'nożyczki' && ai === 'papier') {
    return 'win';
  } else return 'loss';
}

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector('[data-summary="who-win"]').textContent = result;

  gameSummary.numbers++;
  document.querySelector('.numbers span').textContent = gameSummary.numbers;

  if (result === 'win') {
    gameSummary.wins++;
    document.querySelector('.wins span').textContent = gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "Wygrałeś :)";
    document.querySelector('[data-summary="who-win"]').style.color = 'green';
  } else if (result === 'loss') {
    gameSummary.losses++;
    document.querySelector('.losses span').textContent = gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent = "Przegrałeś :(";
    document.querySelector('[data-summary="who-win"]').style.color = 'red';
  } else {
    gameSummary.draws++;
    document.querySelector('.draws span').textContent = gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Remis :\\";
    document.querySelector('[data-summary="who-win"]').style.color = 'black';
  }

}

function gameEnd() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
  game.playerHand = '';
  game.aiHand = "";
}

function gameStart() {
  if (!game.playerHand) return alert('Wybierz dłoń');
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResult(game.playerHand, game.aiHand, gameResult);
  gameEnd();
};

document.querySelector('.start').addEventListener('click', gameStart);
hands.forEach(hand => hand.addEventListener('click', handSelection));
