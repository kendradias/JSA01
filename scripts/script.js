"use strict";

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
    updatePlayerScore: function (score) {
        this.playerScoreDisplay.textContent = score;
    },
};

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
};

// recent players list properties and functionality - double click input field to display 1st time
const recentPlayers = [];
const recentPlayersList = document.getElementById('recent-players');

function updateRecentPlayers() {
    recentPlayersList.innerHTML = ''; //clear list before update
    const playersToShow = recentPlayers.slice(-5); //shows last 5 players
    playersToShow.forEach(player => {
        const option = document.createElement('option');
        option.value = player;
        recentPlayersList.appendChild(option);
    });
};

// Event Listeners

//Join Button
game.joinGameButton.addEventListener('click', function() {
    const playerName = game.playerForm.value.trim();
    if (playerName) {
        player.updatePlayerName(playerName);
        player.score = 0; // reset to 0
        game.updatePlayerScore(player.score);
        recentPlayers.push(playerName);
        updateRecentPlayers();
        game.playerForm.value = ''; //clear input field after join
    } else {
        alert('Please enter player name'); //allow join only if name is entered
    } 
});

//Start Button
game.startGameButton.addEventListener('click', function(){
    console.log('start button clicked')
    game.toggleRunning();
    if (game.isRunning) {
        document.getElementById('player-form-container').classList.add('hidden'); //remove input field once game starts (doesnt work yet)
        document.querySelector('main').classList.add('game-running'); //change main display once game starts (doesnt work yet)
        console.log("entered if statement")
    }
});

//Score Button
game.scorePointsButton.addEventListener('click', function() {
    if (game.isRunning) {
        player.scorePoints();
    }
});
