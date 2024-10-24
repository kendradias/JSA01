"use strict";
console.log("here")

// Game Object 
const game = {
    //properties
    title: "Kendra's Game",
    isRunning: false,
    gameBoard: document.getElementById('game-board'),
    scoreBoard: document.getElementById('score-board'),
    playerForm: document.getElementById('player-name-input'),
    joinGameButton: document.getElementById('join-game'),
    startGameButton: document.getElementById('start-game'),
    scorePointsButton: document.getElementById('score-points'),
    startGameButton: document.getElementById('start-game'),
    playerNameDisplay: document.getElementById('player-name'),
    playerScoreDisplay: document.getElementById('player-score'),
    //methods
    toggleRunning: function () {
        this.isRunning = !this.isRunning;
        this.gameBoard.classList.toggle('running', this.isRunning);
        this.startGameButton.textContent = this.isRunning ? 'Pause' : 'Start Game';
    },
    updatePlayerName: function (playerName) {
        this.playerNameDisplay.textContent = playerName;
    },
    updatePlayerScore: function (playerScore) {
        this.playerScoreDisplay.textContent = playerScore;
    },
}

// Player Object
const player = {
    //properties
    name: '',
    score: 0,
    //methods
    updatePlayerName: function (playerName) {
        this.playerName = playerName;
        game.updatePlayerName(playerName);
    },
    scorePoints: function () {
        this.score += 1;
        game.updatePlayerScore(this.score);
    },
}

// recent players list properties and functionality
const recentPlayers = [];
const recentPlayersList = document.getElementById('recent-players');

function updateRecentPlayers() {
    recentPlayersList.innerHTML = ''; //clears list before update
    const playersToShow = recentPlayers.slice(-5) //shows last 5 players
    playersToShow.forEach(player => {
        const option = document.createElement('option');
        option.value = player;
        recentPlayersList.appendChild(option);
    })
};

// Event Listeners
game.joinGameButton.addEventListener('click', function() {
    const playerName = game.playerForm.value.trim();
    if (playerName) {
        player.updatePlayerName(playerName);
        recentPlayers.push(playerName);
        updateRecentPlayers();
        game.playerForm.value = '';
    } else {
        alert('Please enter player name')
    }
});

game.startGameButton.addEventListener('click', function(){
    game.toggleRunning();

});

game.scorePointsButton.addEventListener('click', function() {
    if (game.isRunning) {
        player.scorePoints();
    }
});
