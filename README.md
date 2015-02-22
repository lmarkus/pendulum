Simulation of multiple pendulums with harmonic length
======================================================

> As seen on YouTube.

I recently saw [this video](https://www.youtube.com/watch?v=7_AiV12XBbI) on YouTube, and thought that it would be something
fun to simulate.

**[Live Demo Here](http://lmarkus.github.io/pendulum/)**

<a href="http://lmarkus.github.io/pendulum/" target="_blank"><img src="https://github.com/lmarkus/pendulum/blob/gh-pages/images/waves.png" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

**[Original Video](https://www.youtube.com/watch?v=7_AiV12XBbI)**

<a href="http://www.youtube.com/watch?feature=player_embedded&v=7_AiV12XBbI
" target="_blank"><img src="http://img.youtube.com/vi/7_AiV12XBbI/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


##The basics

 Not much in the way of libraries here. Just `RequireJS` to keep the code nice and tidy.

 The `pendulum` class defines some basic attributes, such as the size and length of a pendulum, as well as a time-based
 equation to determine its position at any given moment. (In this case, each animation frame).

 `main.js` creates 30 pendulums, and calculates the appropriate lengths that each one should have to achieve the wave harmonics we wanted.
 Esentially, given the length of the largest (slowest) pendulum, and a given frequency at which we want everything to sync up, it determines
 the length of each shorter pendulum as a fraction of that desired frequency. ([Further reading...](http://www.arborsci.com/cool/pendulum-wave-seems-like-magic-but-its-physics))

##Interesting Parameters

 `baseConfig.js` holds all the parameters than can be tweaked. `frequency` and `numberOfBalls` are by far the more interesting ones.
 `gravity` is basically there to speed (or slow) things up.

 ```javascript
     var baseConfig = {
        gravity:       30,     // Simulated gravity. Larger numbers mean faster motion. (Think dropping something on the moon, vs earth)
        frequency:     20,     // How often will each pendulum sync up with the next inline.
        ballRadius:    35,     // For rendering purposes. Has no effect on motion.
        numberOfBalls: 30,     // How many pendulums to have in the simulation.
        longestLength: 200,    // This is the slowest pendulum, and dictates movement for all others.
     }
 ```

##Performance

 Chrome runs like butter @ 60FPS. FF and Safari do about 40FPS.

 Feel free to dig in, and tweak things :)
 -Lenny

## Screenshots

 <hr>
 ![ScreenShot 1](https://github.com/lmarkus/pendulum/blob/gh-pages/images/waves.png)