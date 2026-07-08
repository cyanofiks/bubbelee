/* ==========================================================
   Bubble Virus
   player.js
========================================================== */

const PLAYER = {

    drawing: false,

    pointerX: 0,
    pointerY: 0,

    brushRadius: 38,

    energyMax: 100,
    energy: 100,

    energyDrain: 30,
    energyRecharge: 18,

    shieldDuration: 10

};

// ----------------------------------------------------
// INPUT
// ----------------------------------------------------

canvas.addEventListener("pointerdown", e => {

    PLAYER.drawing = true;

    updatePointer(e);

});

canvas.addEventListener("pointermove", e => {

    updatePointer(e);

});

window.addEventListener("pointerup", () => {

    PLAYER.drawing = false;

});

canvas.addEventListener("pointerleave", () => {

    PLAYER.drawing = false;

});

// ----------------------------------------------------

function updatePointer(e){

    const rect = canvas.getBoundingClientRect();

    PLAYER.pointerX = e.clientX - rect.left;
    PLAYER.pointerY = e.clientY - rect.top;

}

// ----------------------------------------------------
// UPDATE
// ----------------------------------------------------

function updatePlayer(dt){

    if(PLAYER.drawing){

        PLAYER.energy -= PLAYER.energyDrain * dt;

        PLAYER.energy = clamp(
            PLAYER.energy,
            0,
            PLAYER.energyMax
        );

        if(PLAYER.energy > 0){

            protectBrush();

        }

    }else{

        PLAYER.energy += PLAYER.energyRecharge * dt;

        PLAYER.energy = clamp(
            PLAYER.energy,
            0,
            PLAYER.energyMax
        );

    }


    GAME.energy = Math.round(PLAYER.energy);

}

// ----------------------------------------------------
// PROTECT
// ----------------------------------------------------

function protectBrush(){

    const bubble = gameBoard.getBubbleAt(
        PLAYER.pointerX,
        PLAYER.pointerY
    );

    if(!bubble) return;

    if(bubble.state !== "normal") return;

    bubble.state = "protected";

    bubble.scale = 1.25;

    GAME.protected = getProtectedCount();

    if(navigator.vibrate){

        navigator.vibrate(8);

    }

    if(typeof playShield === "function"){

        playShield();

    }

}

// ----------------------------------------------------
// SHIELD TIMER
// ----------------------------------------------------

function updateProtectedTimers(){
    // Shields are permanent in v2
}


// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function playerCanProtect(){

    return PLAYER.energy > 1;

}

function refillEnergy(){

    PLAYER.energy = PLAYER.energyMax;

}

function emptyEnergy(){

    PLAYER.energy = 0;

}

function playerHit(){

    GAME.lives--;

    if(GAME.lives <= 0){

        GAME.lives = 0;
        GAME.paused = true;

    }

}
