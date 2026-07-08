/* ==========================================================
   Bubble Virus
   effects.js
========================================================== */

const EFFECTS = {

    particles: [],

    screenShake: 0,

    flash: 0

};

// ----------------------------------------------------

class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.vx = (Math.random() - 0.5) * 180;
        this.vy = (Math.random() - 0.5) * 180;

        this.life = 1;
        this.size = 4 + Math.random() * 6;

        this.color = color;

    }

    update(dt) {

        this.life -= dt;

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        this.vy += 260 * dt;

    }

    draw(ctx) {

        if (this.life <= 0) return;

        ctx.globalAlpha = this.life;

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size * this.life,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha = 1;

    }

}

// ----------------------------------------------------

function updateEffects(dt){

    for(let i=EFFECTS.particles.length-1;i>=0;i--){

        EFFECTS.particles[i].update(dt);

        if(EFFECTS.particles[i].life<=0){

            EFFECTS.particles.splice(i,1);

        }

    }

    if(EFFECTS.screenShake>0){

        EFFECTS.screenShake-=dt*5;

        if(EFFECTS.screenShake<0)
            EFFECTS.screenShake=0;

    }

    if(EFFECTS.flash>0){

        EFFECTS.flash-=dt*2;

        if(EFFECTS.flash<0)
            EFFECTS.flash=0;

    }

}

// ----------------------------------------------------

function drawEffects(ctx){

    ctx.save();

    if(EFFECTS.screenShake>0){

        ctx.translate(

            (Math.random()-0.5)*
            EFFECTS.screenShake*8,

            (Math.random()-0.5)*
            EFFECTS.screenShake*8

        );

    }

    for(const p of EFFECTS.particles){

        p.draw(ctx);

    }

    ctx.restore();

    if(EFFECTS.flash>0){

        ctx.save();

        ctx.globalAlpha=
            EFFECTS.flash*.4;

        ctx.fillStyle="#ffffff";

        ctx.fillRect(

            0,
            0,

            canvas.width,

            canvas.height

        );

        ctx.restore();

    }

}

// ----------------------------------------------------

function popEffect(x,y,color="#ffffff"){

    for(let i=0;i<10;i++){

        EFFECTS.particles.push(

            new Particle(

                x,

                y,

                color

            )

        );

    }

}

// ----------------------------------------------------

function virusEffect(x,y){

    popEffect(

        x,

        y,

        "#00ff55"

    );

}

// ----------------------------------------------------

function shieldEffect(x,y){

    popEffect(

        x,

        y,

        "#ffe95c"

    );

}

// ----------------------------------------------------

function deadEffect(x,y){

    popEffect(

        x,

        y,

        "#ff4444"

    );

}

// ----------------------------------------------------

function flashScreen(){

    EFFECTS.flash=1;

}

// ----------------------------------------------------

function shakeScreen(power=1){

    if(power>EFFECTS.screenShake)

        EFFECTS.screenShake=power;

}

// ----------------------------------------------------

function clearEffects(){

    EFFECTS.particles=[];

    EFFECTS.flash=0;

    EFFECTS.screenShake=0;

}
