"use strict";

// Game Object 
const game = {
    title: "Kendra's Game",
    isRunning: false,
    //properties
    gameBoard: document.getElementById('game-board'),
    scoreBoard: document.getElementById('score-board'),
    playerForm: document.getElementById('player-name-input'),
    joinGame: document.getElementById('join-game'),
    startGame: document.getElementById('start-game'),
    scorePointsButton: document.getElementById('score-points'),
    startGameButton: document.getElementById('start-game'),
    playerNameDisplay: document.getElementById('player-name'),
    playerScoreDisplay: document.getElementById('player-score'),
    //methods
    toggleRunning: function () {

    },
    
    updatePlayerName: function () {

    },

    updatePlayerScore: function () {

    },


}

// Player Object
const player = {
    name: "",
    score: 0
}

// Event Listeners

