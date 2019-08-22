(
~nouvelleFriture.stop;
~shimmerC. stop;
~shimmerC = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    // En La majeur
    // Dmaj7, A, Dmaj7, Cm
    // IV, I, IV, iii
    \spos, Pseq([0.237, 0.2545, 0.237, 0.252].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),
    \spos, ~har - ~loc + Pwhite(-0.0001, 0.0001, inf) + 0.195,
// 
     \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.2037, 0.195].stutter(16), inf),
     \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.2065, 0.195].stutter(16), inf),
     \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.309].stutter(16), inf), //mellow
     \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.452].stutter(16), inf),
     // dans le marais
     \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.452, 0.309, 0.452, 0.24585].stutter(16), inf),
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.452, 0.309, 0.452, 0.2465].stutter(16), inf),
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.78].stutter(16), inf),
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.62].stutter(16), inf),
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.452, 0.4485].stutter(16), inf),
//     \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.1, 4 * 16)], inf),
    \rel, 0.1,
    \atk, 0.5,
    \rate, [0.5, 1] * -8.midiratio * 4.midiratio,
//     \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 0.5 * ,
    \amp, 24 * Pseq([1, 0.95, 1, 0.75].stutter(16), inf),
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~highPassBus
).play(t);
)