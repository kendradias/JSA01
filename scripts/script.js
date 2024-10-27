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

        document.querySelector('main').classList.toggle('game-running', this.isRunning); // toggle background if game is paused vs running
    },
    addPlayer: function (player) {
        this.players.push(player);
        this.activePlayerIndex = this.players.length -1;
        this.updateScoreboard()
    },
    updateScoreboard: function () {
        this.scoreboard.innerHTML = ''; // clear before update
        this.players.forEach((player, index) => {
            const playerElement = document.createElement('div'); //declare player Element creates div for each new player
            playerElement.classList.add('player-entry'); // add class for styling
            playerElement.dataset.name = player.name;
            playerElement.dataset.score =  player.score;

            if (index === this.activePlayerIndex) {
                playerElement.classList.add('current-player'); //selects current player and applies highlight class styling
            }
            this.scoreboard.appendChild(playerElement); //append to scoreboard
        });
    },
    updatePlayerScore: function(player) {
        if(!this.isRunning) return;
        const playerIndex = this.players.indexOf(player);
        if (playerIndex !== -1) {
            player.updateScore(2);
            this.updateScoreboard();
        }
    },
    switchPlayer: function() {
        if (this.players.length > 0) {
            //remove highlight
            const previousPlayer = this.scoreboard.children[this.activePlayerIndex];
            if (previousPlayer) {
                previousPlayer.classList.remove('current-player');
            }

            //update active player
            this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;

            //highlist active player
            const currentPlayer = this.scoreboard.children[this.activePlayerIndex]
            if (currentPlayer) {
                currentPlayer.classList.add('current-player');
            }
        }
    },
};

// Player Class
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        game.addPlayer(this); //add current player to game
    }
    updateScore(points) {
        this.score += points;
    }
};

// Event Listeners

//Join Button
document.getElementById('join-game').addEventListener('click', function() {
    const playerName = document.getElementById('player-name-input').value.trim();
    if (playerName) {
        new Player(playerName);
        document.getElementById('player-name-input').value = ''
    } else {
        alert('Please enter player name'); //allow join only if name is entered
    } 
});

//Switch Player Button
document.getElementById('switch-player').addEventListener('click', function(){
    game.switchPlayer();
});

//Start/Toggle Button
document.getElementById('toggle-game').addEventListener('click', function(){
    if(game.players.length > 0) {
        game.toggleGame();
        if (game.isRunning) {
            document.getElementById('player-form-container').style.display = 'none'; // Adjust as needed
        } 
    } else {
        alert('Please enter Player Name');
    }
});

//Score Button
document.getElementById('score-points').addEventListener('click', function() {
    const activePlayer = game.players[game.activePlayerIndex];
    if (activePlayer) {
        game.updatePlayerScore(activePlayer);
    }
});
