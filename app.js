/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// Variables 
var scores, roundScore, activePlayer, dice, gamePlaying, winningScore;
var playerInfo = document.getElementById('player-info');

// Initializes Game
initGame();

var lastDice;

// Button roll on click
document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {

        // Random Number
        var dice = Math.floor(Math.random() * 6) + 1;

        // Diplays Results
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // when 2 6's are rolled, player looses score
        if(dice === 6 && lastDice === 6) {
            // Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = ('0');
            nextPlayer();

            playerInfo.textContent = 'You rolled a ' + dice + ' twice, lost all points!! Next Players turn.';
            playerInfo.style.color = '#EB4D4D';

        } else if (dice !== 1) {
            
            // Updates round score IF the rolled number was not a 1
            // Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

            playerInfo.textContent = 'You rolled a ' + dice;
            playerInfo.style.color = '#555';

        } else {
            playerInfo.textContent = 'You rolled a ' + dice + ', lost current points! Next Players turn.';
            playerInfo.style.color = '#EB4D4D';

            // Next Player
            nextPlayer();
        }
 
        lastDice = dice;
    }
});

// Button Hold on Click
document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying) {
        // Adds Current Score to Global Score
        scores[activePlayer] += roundScore;

        playerInfo.textContent = 'Held current points. Next Players turn';

        // Updates the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        var input = document.querySelector('.final-score').value;

        if (input) {
            winningScore = input;

        } else {
            winningScore = 100;
        }

        // Checks if Player Won the Game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            playerInfo.textContent = 'We have a Winner!!'

            // Stops any further user input
            gamePlaying = false;

        } else {
            // Next Player
            nextPlayer();
        }
    }
});

// Next Player Function
function nextPlayer() {
    // Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}


// Starts a New Game
document.querySelector('.btn-new').addEventListener('click', initGame);

// Displays changes to score
document.querySelector('.final-score').addEventListener('keyup', function() {

    var input = document.querySelector('.final-score').value;
    document.getElementById('player-goal').innerHTML = 'First to ' + input + ' Wins!';
});


// Initializes Game Function
function initGame() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    gamePlaying = true;
    document.querySelector('.final-score').value = 100;
    document.getElementById('player-goal').textContent = 'First to ' + 100 + ' Wins!';

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    playerInfo.textContent = '';
}