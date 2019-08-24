
t.tempo_(50 * 4/60);
50 * 4/60 * 0.25;
t.tempo;
(
~vt = TempoClock.new;
~vt.tempo_(50 * 4/60);
)

(
~shimmer.stop;
~shimmer = Pbind(
    \instrument, \guitare,
    \dur, 0.25,
    \spos, Pseq([0.141, 0.2545, 0.141, 0.2545].stutter(64), inf)
    + Pdefn(\shimPos, 0.001) + Pwhite(0.001, 0.002, inf),
    \rel, 0.1,
    \atk, 0.7,
    \rate, Pseq([-4, -4, -6, -4].midiratio.stutter(64), inf)
    * 0.midiratio,
    \amp, 6 * Pdefn(\shimmerAmp, 2) * 1,
    \pan, Pwhite(-1.0, 1.0, inf),
    \out, ~reverbBus
).play(~vt, quant: [4, -0.5]);
)


(
// Les recherches lentes, les ruisseaux nuiteux
// le long desquels on pense à Neptune
~shimmerNuits.stop;
~shimmerNuits = Pbind(
    \instrument, \guitare,
    \dur, 16,
    \spos, Pseq([0.136, 0.252, 0.136, 0.776].stutter(1), inf) + Pwhite(0.001, 0.002, inf),
    \rel, 6,
    \atk, 0.7,
    \rate, Pseq([-4, -4, -6, -4].midiratio.stutter(1), inf),
    \amp, 8 * Pdefn(\nuitsAmp, 2),
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(~vt);
)

Pdefn(\nuitsAmp, 2);
