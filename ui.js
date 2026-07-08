
/* ==========================================================
   Bubble Virus
   ui.js
========================================================== */

const UI = {

    padding: 20,

    barWidth: 220,

    barHeight: 18,

    flash: 0

};

// ----------------------------------------------------

function updateUI(dt){

    if(UI.flash>0){

        UI.flash-=dt;

        if(UI.flash<0)
            UI.flash=0;

    }

}

// ----------------------------------------------------

function drawUI(ctx){

    drawTopBar(ctx);

    drawEnergy(ctx);

    drawBottomInfo(ctx);

    if(GAME.paused){
        showGameOver(ctx);
    }

}

// ----------------------------------------------------

function drawTopBar(ctx){

    ctx.save();

    ctx.fillStyle="rgba(0,0,0,.30)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        70
    );

    ctx.fillStyle="#ffffff";

    ctx.font="bold 26px Arial";

    ctx.textBaseline="middle";

    // Lives

    let hearts="";

    for(let i=0;i<GAME.lives;i++){

        hearts+="❤ ";

    }

    ctx.fillText(
        hearts,
        20,
        35
    );

    // Wave

    ctx.textAlign="center";

    ctx.fillText(
        "Wave "+GAME.wave,
        canvas.width/2,
        35
    );

    // Virusi

    ctx.textAlign="right";

    ctx.fillText(
        "☣ "+GAME.viruses,
        canvas.width-20,
        35
    );

    ctx.restore();

}

// ----------------------------------------------------

function drawEnergy(ctx){

    const x=20;

    const y=90;

    ctx.save();

    ctx.font="18px Arial";

    ctx.fillStyle="#ffffff";

    ctx.fillText(
        "ENERGIJA",
        x,
        y-12
    );

    ctx.fillStyle="#222";

    ctx.fillRect(

        x,

        y,

        UI.barWidth,

        UI.barHeight

    );

    const percent=

        GAME.energy/100;

    ctx.fillStyle="#2cff6d";

    ctx.fillRect(

        x,

        y,

        UI.barWidth*percent,

        UI.barHeight

    );

    ctx.strokeStyle="#ffffff";

    ctx.lineWidth=2;

    ctx.strokeRect(

        x,

        y,

        UI.barWidth,

        UI.barHeight

    );

    ctx.fillStyle="#ffffff";

    ctx.font="16px Arial";

    ctx.textAlign="center";

    ctx.fillText(

        GAME.energy+"%",

        x+UI.barWidth/2,

        y+13

    );

    ctx.restore();

}

// ----------------------------------------------------

function drawBottomInfo(ctx){

    ctx.save();

    ctx.fillStyle="rgba(0,0,0,.35)";

    ctx.fillRect(

        0,

        canvas.height-70,

        canvas.width,

        70

    );

    ctx.fillStyle="#ffffff";

    ctx.font="20px Arial";

    ctx.textBaseline="middle";

    ctx.textAlign="left";

    ctx.fillText(

        "🛡 "+GAME.protected,

        20,

        canvas.height-35

    );

    ctx.textAlign="center";

    ctx.fillText(

        "🦠 "+GAME.dead,

        canvas.width/2,

        canvas.height-35

    );

    ctx.textAlign="right";

    ctx.fillText(

        "Score "+GAME.score,

        canvas.width-20,

        canvas.height-35

    );

    ctx.restore();

}

// ----------------------------------------------------

function showWaveFlash(){

    UI.flash=1;

}

// ----------------------------------------------------

function showGameOver(ctx){

    ctx.save();
    ctx.fillStyle="rgba(0,0,0,.75)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const win = GAME.result==="WIN";

    ctx.fillStyle="#fff";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.font="bold 56px Arial";
    ctx.fillText(win?"POBJEDA!":"GAME OVER",canvas.width/2,canvas.height/2-40);

    ctx.font="26px Arial";
    ctx.fillText(win?"Zaštitio si više kugli!":"Virus je osvojio više kugli!",canvas.width/2,canvas.height/2+20);

    ctx.restore();
}
