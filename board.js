/* ==========================================================
   Bubble Virus
   board.js
========================================================== */

class Bubble {

    constructor(row, col, x, y, radius) {

        this.row = row;
        this.col = col;

        this.x = x;
        this.y = y;

        this.radius = radius;

        this.state = "normal";

        // normal
        // protected
        // virus
        // dead

        this.timer = 0;

        this.floatOffset = Math.random() * Math.PI * 2;

        this.scale = 1;

        this.highlight = 0;

        this.infected = false;

        this.protectedUntil = 0;

    }

    update(dt, time) {

        this.timer += dt;

        this.scale += (1 - this.scale) * 0.15;

        this.highlight += dt;

    }

    draw(ctx, time) {

     this.renderY =
    this.y +
    Math.sin(
        time * 2 +
        this.floatOffset
    ) * 2;

const yy = this.renderY;

        let color1 = "#ffffff";
        let color2 = "#dff5ff";
        let color3 = "#74c9ff";

        if (this.state === "protected") {

            color1 = "#fffde7";
            color2 = "#fff176";
            color3 = "#fbc02d";

        }

        if (this.state === "virus") {

            color1 = "#d7ffd7";
            color2 = "#77ff77";
            color3 = "#00aa22";

        }

        if (this.state === "dead") {

            color1 = "#ffb8b8";
            color2 = "#ff5555";
            color3 = "#7b0000";

        }

        // shadow

        ctx.beginPath();

        ctx.fillStyle = "rgba(0,0,0,.18)";

        ctx.arc(

            this.x + 2,

            yy + 4,

            this.radius,

            0,

            Math.PI * 2

        );

        ctx.fill();

        // bubble

        const g = ctx.createRadialGradient(

            this.x - this.radius * .35,

            yy - this.radius * .45,

            this.radius * .15,

            this.x,

            yy,

            this.radius

        );

        g.addColorStop(0, color1);
        g.addColorStop(.45, color2);
        g.addColorStop(1, color3);

        ctx.beginPath();

        ctx.fillStyle = g;

        ctx.arc(

            this.x,

            yy,

            this.radius * this.scale,

            0,

            Math.PI * 2

        );

        ctx.fill();

        // reflection

        ctx.beginPath();

        ctx.fillStyle = "rgba(255,255,255,.75)";

        ctx.arc(

            this.x - this.radius * .35,

            yy - this.radius * .35,

            this.radius * .22,

            0,

            Math.PI * 2

        );

        ctx.fill();

        if (this.state === "virus") {

            ctx.fillStyle = "#003300";

            ctx.font = `${this.radius}px Arial`;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                "☣",
                this.x,
                yy + 1
            );

        }

        if (this.state === "protected") {

            ctx.fillStyle = "#b00000";

            ctx.font = `${this.radius}px Arial`;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                "🛡",
                this.x,
                yy + 1
            );

        }

        if (this.state === "dead") {

            ctx.fillStyle = "#ffffff";

            ctx.font = `${this.radius}px Arial`;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                "✖",
                this.x,
                yy
            );

        }

    }

}

class Board {

    constructor() {

        this.bubbles = [];

        this.rows = 0;

        this.cols = 0;

        this.cell = 0;

        this.time = 0;

    }

    create(width, height) {

    this.bubbles = [];

    // Veći rubovi da se kugle ne režu
    const padding = Math.max(24, Math.min(width, height) * 0.04);

    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;

    // Dinamična veličina ćelije
    let targetCell;

    if (width < 500) {
        targetCell = 42;
    } else if (width < 900) {
        targetCell = 46;
    } else {
        targetCell = 52;
    }

    this.cols = Math.max(
        8,
        Math.floor(usableWidth / targetCell)
    );

    this.rows = Math.max(
        12,
        Math.floor(usableHeight / targetCell)
    );

    this.cell = Math.min(
        usableWidth / this.cols,
        usableHeight / this.rows
    );

    const radius = this.cell * 0.44;

    const offsetX =
        (width - this.cols * this.cell) / 2;

    const offsetY =
        (height - this.rows * this.cell) / 2;

    for (let row = 0; row < this.rows; row++) {

        for (let col = 0; col < this.cols; col++) {

            this.bubbles.push(
                new Bubble(
                    row,
                    col,
                    offsetX + col * this.cell + this.cell / 2,
                    offsetY + row * this.cell + this.cell / 2,
                    radius
                )
            );

        }

    }

}      update(dt) {

            this.time += dt;

            const now = performance.now();

            for (const bubble of this.bubbles) {

                bubble.update(dt, this.time);

                // istek zaštite

                if (
                    bubble.state === "protected" &&
                    bubble.protectedUntil > 0 &&
                    now > bubble.protectedUntil
                ) {

                    bubble.state = "normal";
                    bubble.protectedUntil = 0;

                }

            }

        }

        draw(ctx) {

            for (const bubble of this.bubbles) {

                bubble.draw(
                    ctx,
                    this.time
                );

            }

        }

        getBubbleAt(x, y) {

            for (const bubble of this.bubbles) {

                const dx =
                    bubble.x - x;

                const dy =
    (bubble.renderY ?? bubble.y) - y;

                const dist =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

               if (dist <= bubble.radius * 1.25) {

                    return bubble;

                }

            }

            return null;

        }

        getNeighbours(bubble) {

            const result = [];

            const dirs = [

                [-1,-1],
                [-1,0],
                [-1,1],

                [0,-1],
                [0,1],

                [1,-1],
                [1,0],
                [1,1]

            ];

            for (const dir of dirs) {

                const row =
                    bubble.row + dir[0];

                const col =
                    bubble.col + dir[1];

                const n =
                    this.getBubble(
                        row,
                        col
                    );

                if (n)
                    result.push(n);

            }

            return result;

        }

        getBubble(row, col) {

            if (
                row < 0 ||
                col < 0 ||
                row >= this.rows ||
                col >= this.cols
            )
                return null;

            return this.bubbles[
                row * this.cols + col
            ];

        }

        protect(bubble) {

            if (!bubble) return;

            if (bubble.state !== "normal")
                return;

            bubble.state = "protected";

            // štit traje 10 sekundi

            bubble.protectedUntil =
                performance.now() + 10000;

            bubble.scale = 1.25;

        }

        infect(bubble) {

            if (!bubble) return;

            if (
                bubble.state === "protected" ||
                bubble.state === "dead"
            )
                return;

            bubble.state = "virus";

            bubble.scale = 1.2;

            bubble.infected = true;

        }

        kill(bubble) {

            if (!bubble) return;

            bubble.state = "dead";

            bubble.scale = .9;

            bubble.infected = false;

        }

        clear() {

            for (const bubble of this.bubbles) {

                bubble.state = "normal";

                bubble.protectedUntil = 0;

                bubble.infected = false;

            }

        }

    }


const gameBoard =
new Board();



function createBoard(){

    gameBoard.create(
        gameWidth,
        gameHeight
    );

}



function updateBoard(dt){

    gameBoard.update(dt);

}



function drawBoard(ctx){

    gameBoard.draw(ctx);

}/* ==========================================================
   Bubble Virus
   board.js (3/3)
========================================================== */

// ----------------------
// Brush helper
// ----------------------

function protectAt(x, y, radius = 35) {

    const r2 = radius * radius;

    for (const bubble of gameBoard.bubbles) {

        if (bubble.state !== "normal")
            continue;

        const dx = bubble.x - x;
        const dy = bubble.y - y;

        if ((dx * dx + dy * dy) <= r2) {

            gameBoard.protect(bubble);

        }

    }

}

// ----------------------
// Random bubble
// ----------------------

function getRandomNormalBubble() {

    const free =
        gameBoard.bubbles.filter(
            b => b.state === "normal"
        );

    if (free.length === 0)
        return null;

    return free[
        Math.floor(
            Math.random() * free.length
        )
    ];

}

// ----------------------
// Virus helpers
// ----------------------

function getVirusBubbles() {

    return gameBoard.bubbles.filter(
        b => b.state === "virus"
    );

}

function getProtectedCount() {

    return gameBoard.bubbles.filter(
        b => b.state === "protected"
    ).length;

}

function getDeadCount() {

    return gameBoard.bubbles.filter(
        b => b.state === "dead"
    ).length;

}

function getVirusCount() {

    return gameBoard.bubbles.filter(
        b => b.state === "virus"
    ).length;

}

function getNormalCount() {

    return gameBoard.bubbles.filter(
        b => b.state === "normal"
    ).length;

}

// ----------------------
// Reset board
// ----------------------

function resetBoard() {

    gameBoard.clear();

}

// ----------------------
// Debug
// ----------------------

window.gameBoard = gameBoard;


