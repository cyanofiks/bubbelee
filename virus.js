
/* ==========================================================
   Bubble Virus
   virus.js
========================================================== */

const VIRUS = {

    spreadInterval: 2.5,

    timer: 0,

    waveTimer: 0,

    viruses: [],

    started: false

};

// --------------------------------------------------------

function updateVirus(dt){

    VIRUS.timer += dt;

    VIRUS.waveTimer += dt;

    if(!VIRUS.started){

        spawnRandomVirus();

        VIRUS.started = true;

    }

    if(VIRUS.timer >= VIRUS.spreadInterval){

        VIRUS.timer = 0;

        spreadViruses();

    }

    GAME.viruses = getVirusCount();

    GAME.dead = getDeadCount();

}

// --------------------------------------------------------

function drawVirus(ctx){

    // Virus se trenutno crta kroz board.js

}

// --------------------------------------------------------

function spawnRandomVirus(){

    const bubble = getRandomNormalBubble();

    if(!bubble) return;

    bubble.state = "virus";

    bubble.scale = 1.25;

}

// --------------------------------------------------------

function spreadViruses(){

    const viruses = getVirusBubbles();

    const targets = [];

    for(const virus of viruses){

        const neighbours =
            gameBoard.getNeighbours(virus);

        for(const n of neighbours){

            if(
                n.state === "normal"
            ){

                targets.push(n);

            }

        }

        virus.state = "dead";

        virus.scale = 1;

    }

    for(const bubble of targets){

        bubble.state = "virus";

        bubble.scale = 1.2;

    }

    if(getNormalCount()===0){
        const player=getProtectedCount();
        const virus=getVirusCount()+getDeadCount();
        GAME.paused=true;
        GAME.result = player>=virus ? "WIN":"LOSE";
    }

}

// --------------------------------------------------------

function clearViruses(){

    for(const bubble of gameBoard.bubbles){

        if(bubble.state==="virus"){

            bubble.state="normal";

        }

    }

}

// --------------------------------------------------------

function countVirus(){

    return getVirusCount();

}

// --------------------------------------------------------

function countDead(){

    return getDeadCount();

}
