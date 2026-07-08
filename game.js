/* ===========================================================
   Bubble Virus
   game.js
=========================================================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameWidth = 0;
let gameHeight = 0;

let lastTime = 0;
let deltaTime = 0;
let elapsedTime = 0;

let gameRunning = true;

// --------------------------------------------------
// Resize
// --------------------------------------------------

function resizeGame() {

    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;

    canvas.width = gameWidth;
    canvas.height = gameHeight;

    if (typeof createBoard === "function") {
        createBoard(gameWidth, gameHeight);
    }

}

window.addEventListener("resize", resizeGame);

// --------------------------------------------------
// Init
// --------------------------------------------------

function initGame() {

    resizeGame();

}

// --------------------------------------------------
// Update
// --------------------------------------------------

function update(dt) {

    if (!gameRunning) return;

    if (typeof updateBoard === "function") {
        updateBoard(dt);
    }

    if (typeof updatePlayer === "function") {
        updatePlayer(dt);
    }

    if (typeof updateVirus === "function") {
        updateVirus(dt);
    }

    if (typeof updateEffects === "function") {
        updateEffects(dt);
    }

    if (typeof updateUI === "function") {
        updateUI(dt);
    }

}

// --------------------------------------------------
// Draw
// --------------------------------------------------

function draw() {

    ctx.clearRect(
        0,
        0,
        gameWidth,
        gameHeight
    );

    if (typeof drawBoard === "function") {
        drawBoard(ctx);
    }

    if (typeof drawVirus === "function") {
        drawVirus(ctx);
    }

    if (typeof drawEffects === "function") {
        drawEffects(ctx);
    }

    if (typeof drawUI === "function") {
        drawUI(ctx);
    }

}

// --------------------------------------------------
// Main Loop
// --------------------------------------------------

function gameLoop(timestamp) {

    if (!lastTime)
        lastTime = timestamp;

    deltaTime =
        (timestamp - lastTime) / 1000;

    lastTime = timestamp;

    elapsedTime += deltaTime;

    update(deltaTime);
   if(gameBoard){
    console.log(gameBoard.bubbles.length);
}

    draw();

    requestAnimationFrame(gameLoop);

}

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function random(min, max) {

    return Math.random() * (max - min) + min;

}

function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}

function distance(x1, y1, x2, y2) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(dx * dx + dy * dy);

}

// --------------------------------------------------
// Global Game State
// --------------------------------------------------

const GAME = {

    wave: 1,

    lives: 3,

    energy: 100,

    score: 0,

    viruses: 0,

    protected: 0,

    dead: 0,

    brushRadius: 36,

    shieldDuration: 10,

    paused: false,

    result: ""

};

// --------------------------------------------------
// Start
// --------------------------------------------------

window.addEventListener("load", () => {

    initGame();

    requestAnimationFrame(gameLoop);

});
