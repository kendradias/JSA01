"use strict";

// Game Object 
const game = {
    //properties
    title: "Kendra's Game",
    isRunning: false,
    players: [],
    activePlayerIndex: 0,
    scoreboard: document.getElementById('players-list'),

    //methods
    toggleGame: function () {
        this.isRunning = !this.isRunning;
        const toggleButton = document.getElementById('toggle-game');
        toggleButton.textContent = this.isRunning ? "Pause" : "Resume"

        document.querySelector('main').classList.toggle('game-running', this.isRunning); // toggle main bg if game is paused vs running
    },
    addPlayer: function (player) {
        this.players.push(player);
        this.updateScoreboard()
    },
    updateScoreboard: function () {
        this.scoreboard.innerHTML = ''; // clear before update
        this.players.forEach((player) => {
            const playerElement = document.createElement('div'); //creates div for each new player
            playerElement.textContent = (`${player.name} ${player.score}`);
            this.scoreboard.appendChild(playerElement);
        });
    },
    updatePlayerScore: function(player) {
        if(!this.isRunning) {
            return;
        }
        const playerIndex = this.players.indexOf(player);
        if (playerIndex !== -1) {
            player.updateScore(Math.floor(Math.random() * 10) + 1);
            this.updateScoreboard();
        }
    },
    switchPlayer: function() {
        if (this.players.length > 0) {
            this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
        }
    },
};

// Player Object
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        game.addPlayer(this); //add current player to game
    }
    updateScore(points) {
        this.score += points;
    }
}

// recent players list properties and functionality
const recentPlayers = [];
const recentPlayersList = document.getElementById('recent-players');

function updateRecentPlayers() {
    recentPlayersList.innerHTML = ''; //clear list before update
    const playersToShow = recentPlayers.slice(-5); //shows last 5 players
    playersToShow.forEach(function (player) {
        const option = document.createElement('option');
        option.value = player;
        recentPlayersList.appendChild(option);
    });
};
// Event Listeners

//Join Button
document.getElementById('join-game').addEventListener('click', function() {
    const playerName = document.getElementById('player-name-input').value.trim();
    if (playerName) {
        new Player(playerName);
        // player.score = 0; // reset to 0
        updateRecentPlayers();
        document.getElementById('player-name-input').value = ''
        game.playerFormContainer.style.display = 'none';
    } else {
        alert('Please enter player name'); //allow join only if name is entered
    } 
});

//Switch Player Button
document.getElementById('switch-player').addEventListener('click', function(){
    game.switchPlayer();
});

//Start Button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toggle-game').addEventListener('click', function(){
        game.toggleGame();
        game.querySelector('player-form-container').style.display = 'none';
    });
});
//Score Button
document.getElementById('score-points').addEventListener('click', function() {
    const activePlayer = game.players[game.activePlayerIndex];
    if (activePlayer) {
        game.updatePlayerScore(activePlayer);
    }
});
