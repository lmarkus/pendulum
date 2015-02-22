/**
 * Created by lmarkus on 12/25/14.
 */
'use strict';
define(function (require) {

    var Pendulum = require('pendulum'),
        pendulums = [],
        canvas = null,
        ctx = null,

    //Some config
        baseConfig = require('baseConfig'),
        t0 = (new Date()).getTime(),

    //Some instrumentation for performance
        frameId = null,
        fpsId = null,
        lastCall = (new Date()).getTime(),
        duration = 0,
        frames = 0;


    /**
     * Some initial config of the drawing surface.
     */
    function
    setup() {
        var resolution = baseConfig.isMobile ? 1 : 4;
        canvas = document.getElementById('field');
        canvas.width = resolution * window.innerWidth;
        canvas.height = resolution * window.innerHeight;

        ctx = canvas.getContext('2d');
        canvas.addEventListener('click', init);
    }

    /**
     * Reset the canvas and draw;
     */
    function init() {

        //Clear any previous timers
        destroy();

        //Clear canvas
        clearCanvas();

        //Create pendulums
        pendulums = [];

        //Each pendulum's lenght has to be a multiple of the frequency at which we want them to sync up.
        //http://www.arborsci.com/cool/pendulum-wave-seems-like-magic-but-its-physics
        for (var i = 0; i < baseConfig.numberOfBalls; i++) {
            var p = new Pendulum(ctx, 'p' + i, baseConfig.longestLength * Math.pow(baseConfig.frequency / (baseConfig.frequency + i), 2) * 10);
            p.root.x = canvas.width / 2;
            p.radius -= i;
            pendulums.push(p);
        }
        //Start drawing loop
        drawLoop();

        //Instrument fps;
        fpsId = setInterval(function () {
            console.log((frames / duration), 'fps');
        }, 1000);

    }

    /**
     * Stop the animation. (And reset the instrumentation)
     */
    function destroy() {
        window.cancelAnimationFrame(frameId);
        clearInterval(fpsId);
        fpsId = frameId = null;
        duration = frames = 0;

    }

    /**
     * Paints over the canvas with the background color.
     */
    function clearCanvas(){
        ctx.background = ctx.fillStyle = baseConfig.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * FPS calculator
     */
    function sampleFPS() {
        var after = (new Date()).getTime();
        frames++;
        duration += (after - lastCall) / 1000;
        lastCall = after;
    }

    /**
     * Drawing loop.
     */
    function drawLoop() {
        var time = ((new Date()).getTime() - t0)/100;
        clearCanvas();
        pendulums.forEach(function (p) {
            p.draw(time);
        });
        sampleFPS();
        frameId = window.requestAnimationFrame(drawLoop);
    }

    setup();
    init();
});