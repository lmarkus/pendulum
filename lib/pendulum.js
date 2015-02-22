/**
 * Created by lmarkus on 2/21/15.
 */
define(function (require) {
    'use strict';

    var baseConfig = require('baseConfig');

    var deg2rad = Math.PI / 180,
        initialAngle = 45 * deg2rad,  //Let's use 45 degrees as the starting angle. Need to convert into radians.
        fullCircle = 360 * deg2rad, //Useful for filling a circle in canvas.
        gravity = baseConfig.gravity; //Determines speed of the pendulum's swing.

    var Pendulum = function (ctx, name, length) {

        //2D Canvas where we're drawing the shape
        this.ctx = ctx;

        //Where the "string" of the pendulum is pinned
        this.root = {
            x: 600,
            y: 200
        };

        //Position (and size) of the ball at any given moment.
        this.current = {
            x: 0,
            y: 0
        };
        this.angle = this.initialAngle = initialAngle;
        this.radius = baseConfig.ballRadius;
        this.length = length;

        // Other attributes of the pendulum
        this.frequency = Math.sqrt(gravity / length);
        this.name = name;

    };

    /**
     * This functions calculates the exact position of the ball, for a given moment in time.
     * See, kids? You will get to use physics and trigonometry....
     *
     * @param time A given moment
     */
    Pendulum.prototype.step = function step(time) {

        //Simple pendulum motion equation, to determine angle.
        this.angle = this.initialAngle * Math.cos(this.frequency * time);

        //Given the angle and the length of the string, determine {x,y} coords for the ball.
        this.current.x = this.root.x + Math.sin(this.angle) * this.length;
        this.current.y = this.root.y + Math.cos(this.angle) * this.length;
    };

    /**
     * Renders a circle on the current coordinates of the ball.
     */
    Pendulum.prototype.render = function () {
        var context = this.ctx;
        context.beginPath();
        context.arc(this.current.x, this.current.y, this.radius, 0, fullCircle, false);
        var grad =  context.createRadialGradient(this.current.x, this.current.y,5,this.current.x, this.current.y,this.radius);
        grad.addColorStop(0,baseConfig.shapeColor1);
        grad.addColorStop(1,baseConfig.shapeColor2);
        context.fillStyle = grad;//baseConfig.shapeColor;
        context.fill();
    };

    /**
     * Draw operation: Assumes a clear canvas, calculates new position, draws it.
     * @param time Moment in time used to determine position.
     */
    Pendulum.prototype.draw = function (time) {
        this.step(time);
        this.render();
    };

    return Pendulum;
});