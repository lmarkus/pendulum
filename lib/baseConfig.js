/**
 * Created by lmarkus on 2/21/15.
 */
'use strict';
define(function (require) {
    require('animationPolyfill');
    var baseConfig = {
        gravity:       30,     // Simulated gravity. Larger numbers mean faster motion. (Think dropping something on the moon, vs earth)
        frequency:     20,     // How often will each pendulum sync up with the next inline.
        ballRadius:    35,     // For rendering purposes. Has no effect on motion.
        numberOfBalls: 30,     // How many pendulums to have in the simulation.
        longestLength: 200,    // This is the slowest pendulum, and dictates movement for all others.

        background: '#000000',
        shapeColor: 'green',

        isMobile: require('mobileCheck')
    };

    return baseConfig;
});