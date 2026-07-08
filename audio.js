/* ==========================================================
   Bubble Virus
   audio.js
========================================================== */

const AUDIO = {

    ctx: null,

    enabled: true,

    masterVolume: 0.20

};

// ----------------------------------------------------

function initAudio(){

    if(AUDIO.ctx) return;

    try{

        AUDIO.ctx =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }
    catch(e){

        AUDIO.enabled=false;

    }

}

// ----------------------------------------------------

function resumeAudio(){

    if(!AUDIO.enabled)
        return;

    if(!AUDIO.ctx)
        initAudio();

    if(
        AUDIO.ctx &&
        AUDIO.ctx.state==="suspended"
    ){

        AUDIO.ctx.resume();

    }

}

// ----------------------------------------------------

function playTone(
    freq,
    duration,
    type="sine",
    volume=1
){

    if(!AUDIO.enabled)
        return;

    if(!AUDIO.ctx)
        initAudio();

    if(!AUDIO.ctx)
        return;

    const osc =
        AUDIO.ctx.createOscillator();

    const gain =
        AUDIO.ctx.createGain();

    osc.type=type;

    osc.frequency.value=freq;

    gain.gain.value=0;

    osc.connect(gain);

    gain.connect(
        AUDIO.ctx.destination
    );

    const now =
        AUDIO.ctx.currentTime;

    gain.gain.linearRampToValueAtTime(

        volume*
        AUDIO.masterVolume,

        now+.01

    );

    gain.gain.exponentialRampToValueAtTime(

        0.0001,

        now+duration

    );

    osc.start(now);

    osc.stop(now+duration);

}

// ----------------------------------------------------
// POP
// ----------------------------------------------------

function playPop(){

    playTone(

        700,

        .06,

        "triangle",

        .9

    );

}

// ----------------------------------------------------
// SHIELD
// ----------------------------------------------------

function playShield(){

    playTone(

        1000,

        .10,

        "sine",

        1

    );

}

// ----------------------------------------------------
// VIRUS
// ----------------------------------------------------

function playVirus(){

    playTone(

        160,

        .20,

        "sawtooth",

        .9

    );

}

// ----------------------------------------------------
// DEAD
// ----------------------------------------------------

function playDead(){

    playTone(

        90,

        .30,

        "square",

        1

    );

}

// ----------------------------------------------------
// WAVE CLEAR
// ----------------------------------------------------

function playWave(){

    playTone(
        500,
        .10,
        "triangle",
        .8
    );

    setTimeout(()=>{

        playTone(
            700,
            .12,
            "triangle",
            .8
        );

    },90);

    setTimeout(()=>{

        playTone(
            950,
            .15,
            "triangle",
            .8
        );

    },180);

}

// ----------------------------------------------------
// GAME OVER
// ----------------------------------------------------

function playGameOver(){

    playTone(
        260,
        .20,
        "square",
        .9
    );

    setTimeout(()=>{

        playTone(
            180,
            .25,
            "square",
            .9
        );

    },180);

    setTimeout(()=>{

        playTone(
            120,
            .40,
            "square",
            1
        );

    },420);

}

// ----------------------------------------------------
// CLICK
// ----------------------------------------------------

window.addEventListener(

    "pointerdown",

    ()=>{

        resumeAudio();

    },

    {once:true}

);
