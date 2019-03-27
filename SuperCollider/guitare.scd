s.boot;

t = TempoClock.new;
t.tempo_(50/60);



~accords = Buffer.read(s, "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Signes-Vitaux-3/SuperCollider/accords.wav");
~guitare.numFrames;
~guitare.numChannels;
7144448/14400/2/60;
(
SynthDef(\accords, {
    arg buf = ~accords, rate = 1, pan = 0, amp = 1, rel = 2, atk = 0.1, out = 0, gate = 1;
    var sig, env, lfo;
//     env = EnvGen.kr(Env.new([0, 1, 0], [atk, rel]), doneAction: 2);
    env = EnvGen.ar(Env.new([0.0, 1.0, 0.00001], [atk, rel], [\linear, \exponential],1), gate, doneAction: 2);
    sig = PlayBuf.ar(2, ~accords, rate * BufRateScale.ir(buf), startPos: 0, doneAction: 2);
    sig = sig * env;
    sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

~accordsfinaux = Synth.new(\accords, [\out, ~reverbBus, \amp, 2]);
~accordsfinaux.set(\gate, 0);













~guitare = Buffer.read(s, "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Signes-Vitaux-3/SuperCollider/0001\ 7-Audio.aif");
~guitare.numFrames;
~guitare.numChannels;
7144448/14400/2/60;
(
SynthDef(\guitare, {
    arg buf = ~guitare, rate = 1, spos = 0, pan = 1, amp = 1, rel = 2, atk = 0.1, out = 0;
    var sig, env, lfo;
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, rel]), doneAction: 2);
    sig = PlayBuf.ar(2, ~guitare, rate * BufRateScale.ir(buf), startPos: spos * 7144448);
    sig = sig * env;
    sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

(
~shimmer.stop;
// ~vinyl = Synth.new(\vinylSynth, [\amp, 0.5, \spos, 500000]);
~shimmer = Pbind(
    \instrument, \guitare,
    \dur, 1,
    // \spos, Pwhite(1047552 - 850000 + ~loc, 1047552 - 840000 + ~loc, inf).round,
    \spos, Pseq([0.24, 0.25, 0.29, 0.3, 0.32, 0.33].stutter(4), inf),
    // \spos, 0.3,
    \spos, Pseq([0.315, 0.329].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, 0.51,
    // \spos, 0.53,
    // \spos, 0.56,
    \rate, 1,
    \amp, 10,
    \pan, Pwhite(-0.5, 0.5, inf)
).play(t, quant: 1);
~shimmerB.stop;
// ~vinyl = Synth.new(\vinylSynth, [\amp, 0.5, \spos, 500000]);
~shimmerB = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    // \spos, Pwhite(1047552 - 850000 + ~loc, 1047552 - 840000 + ~loc, inf).round,
    \spos, Pseq([0.24, 0.25, 0.29, 0.3, 0.32, 0.33].stutter(4), inf),
    // \spos, 0.3,
    \spos, Pseq([0.3245, 0.339].stutter(4 * 16), inf) + Pwhite(-0.002, 0.002, inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, 0.51,
    // \spos, 0.53,
    // \spos, 0.56,
    \rel, 1 / 16,
    \rate, [0.5, 1, 2],
    \amp, 25,
    \pan, Pwhite(-0.5, 0.5, inf)
).play(t, quant: 1);

// ~vinyl = Synth.new(\vinylSynth, [\amp, 0.5, \spos, 500000]);
)
(
~shimmer2.stop;
~shimmer2 = Pbind(
    \instrument, \guitare,
    \dur, 0.125 * 4,
    // \spos, Pwhite(1047552 - 850000 + ~loc, 1047552 - 840000 + ~loc, inf).round,
    \spos, Pseq([0.24, 0.25, 0.29, 0.3, 0.32, 0.33].stutter(4), inf),
    // \spos, 0.3,
    \spos, Pseq([0.315, 0.329].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, 0.51,
    // \spos, 0.53,
    \spos, 0.56,
    \spos, 0.68,
    \spos, 0.78, //belle grosse guitare
    \spos, 0.85,
    \spos, 0.92, //nasal et beau
    \spos, 0.93, //décisif
    \spos, 0.94, //décisif 2
    \spos, 0.41,
    \spos, Pseq([0.78, 0.77].stutter(4), inf),
    \spos, 0.78 - Pseq([0.004, 0.00235].stutter(8), inf),
    \spos, 0.778,
    \rate, 1 * Pseq([0].stutter(8).midiratio, inf) * -3.midiratio,
    \rel, 0.7,
    \amp, Pseq([15, 12, 14, 12], inf) * 2,
    \amp, Pseq([Pgeom(15, 0.9, 8)], inf) * 1,
    \pan, Pwhite(-1.0, 1.0, inf)
).play(t, quant: 1);
)



(
// ~shimmerE.stop;
// ~shimmerF.stop;
~shimmerD.stop;
~shimmer C.stop;
~shimmer.stop;
~shimmerB.stop;
// ~shimmerG.stop;
// ~shimmerH.stop;
// ~vinyl = Synth.new(\vinylSynth, [\amp, 0.5, \spos, 500000]);
// ~shimmerD.stop;
~shimmerC = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    // \spos, Pwhite(1047552 - 850000 + ~loc, 1047552 - 840000 + ~loc, inf).round,
    \spos, Pseq([0.24, 0.25, 0.29, 0.3, 0.32, 0.33].stutter(4), inf),
    // \spos, 0.3,
    \spos, Pseq([0.3245, 0.3385].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),
    \spos, Pseq([0.295, 0.3075].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),

    // De la joie à la peine résignée
    \spos, Pseq([0.237, 0.252].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),

    // De la joie à l’autre joie
    \spos, Pseq([0.237, 0.2545].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),


    // En La majeur
    // Dmaj7, A, Dmaj7, Cm
    // IV, I, IV, iii
    \spos, Pseq([0.237, 0.2545, 0.237, 0.252].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, 0.51,
    // \spos, 0.53,
    // \spos, 0.56,
    \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.1, 4 * 16)], inf),
    \atk, 0.25,
    \rate, [0.5, 1] * -3.midiratio,
    \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 0.5,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(t, quant: 1);
)
s.record;
s.stopRecording;

n = Pgeom(0.5, 1.065, 4 * 16).asStream;
n.next;


(
~shimmer.stop;
// ~vinyl = Synth.new(\vinylSynth, [\amp, 0.5, \spos, 500000]);
~shimmer = Pbind(
    \instrument, \guitare,
    \dur, 1,
    // \spos, Pwhite(1047552 - 850000 + ~loc, 1047552 - 840000 + ~loc, inf).round,
    \spos, Pseq([0.24, 0.25, 0.29, 0.3, 0.32, 0.33].stutter(4), inf),
    // \spos, 0.3,
    \spos, Pseq([0.315, 0.33].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, 0.51,
    // \spos, 0.53,
    // \spos, 0.56,
    \rate, -3.midiratio,
    \rel, 2,
    // \rate, 1,
    \amp, Pseq([Pgeom(7, 0.9, 4)], inf),
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, 0
).play(quant: 1);
)

(
~shimmerB.stop;
// ~vinyl = Synth.new(\vinylSynth, [\amp, 0.5, \spos, 500000]);
~shimmerB = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    // \spos, Pwhite(1047552 - 850000 + ~loc, 1047552 - 840000 + ~loc, inf).round,
    \spos, Pseq([0.24, 0.25, 0.29, 0.3, 0.32, 0.33].stutter(4), inf) + Pwhite(-0.002, 0.002, inf),
    // \spos, 0.3,
    // \spos, Pseq([0.3245, 0.339].stutter(4 * 16), inf) + Pwhite(-0.001, 0.001, inf),
    \spos, Pseq([0.3245, 0.339].stutter(4 * 16), inf) + Pwhite(-0.001, 0.001, inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, 0.51,
    // \spos, 0.53,
    // \spos, 0.56,
    \atk, 0.2,
    \rel, 1 / 8,
    \rate, [0.5, 1],
    \amp, 15,
    \pan, Pwhite(-1, 1, inf),
    \out, 0
).play(quant: 1);
)


(
// Low shimmer, tapis chatoyant
~shimmerD.stop;
~shimmerD = Pbind(
    \instrument, \guitare,
    \dur, 1,
    \spos, 0.56,
    \spos, Pseq([0.56, 0.535].stutter(1), inf),
    \spos, Pseq([0.58].stutter(1), inf), //ii Chord
     \spos, Pseq([0.585].stutter(1), inf), //ii Chord très doux
     \spos, Pseq([0.795 - 0.015, 0.585 - 0.008].stutter(4), inf), //ii Chord
    \rel, 4 * Pseq([Pgeom(0.5, 1.01, 4)], inf),
    \atk, 0.25,
    \rate, -3.midiratio,
    \amp, Pseq([Pgeom(0.5, 1.065, 4)], inf) * 7,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, 0
).play(quant: 1);
)



(
// Low shimmer, tapis chatoyant
~shimmerD.stop;
~shimmerD = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    \spos, 0.56,
    \spos, Pseq([0.56, 0.535].stutter(1), inf),
    \spos, Pseq([0.58].stutter(1), inf), //ii Chord
     \spos, Pseq([0.585].stutter(1), inf), //ii Chord très doux
     \spos, Pseq([0.795, 0.585].stutter(4 * 16), inf), //ii Chord
    \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.1, 4 * 16)], inf),
    \atk, 0.25,
    \rate, [0.5, 1],
    \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 1.25,
    \pan, Pwhite(-1.0, 1.0, inf),
    \out, ~reverbBus
).play(t, quant: 1);
)

(
~shimmerE.stop;
~shimmerE = Pbind(
    \instrument, \guitare,
    \dur, 1,
    \spos, Pseq([0.93, 0.91].stutter(4), inf), //ii Chord
    \rel, 3, // * Pseq([Pgeom(1, 1.1, 4)], inf),
    \amp, 10,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(t, quant: 1);
)

(
// Grésillements moyens
~shimmerF.stop;
~shimmerF = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    \dur, Pseq([1/16, 1/32, 1/32].stutter(64), inf),
//     \spos, Pseq([0.237, 0.2545, 0.237, 0.252].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, 0.51,
    // \spos, 0.53,
    \spos, 0.56,
    \spos, Pseq([0.56, 0.535].stutter(4 * 16), inf),
//         \spos, 0.51,
//     \spos, Pseq([0.58].stutter(1), inf), //ii Chord
//      \spos, Pseq([0.585].stutter(1), inf), //ii Chord très doux
//      \spos, Pseq([0.795, 0.585].stutter(4 * 16), inf), //ii Chord


    \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.01, 4 * 16)], inf),
    \atk, 0.25,
    \rate, [0.5, 1] * -3.midiratio,
    \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 1.25,
    \pan, Pwhite(-1.0, 1.0, inf),
    \out, ~reverbBus
).play(t, quant: 1);
)

(
// Slide guitar
~shimmerE.stop;
~shimmerE = Pbind(
    \instrument, \guitare,
    \spos, 0.51,
    \atk, 0.25,
    \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.11, 4 * 16)], inf),
    \dur, Pseq([Pseq([1 / 16, 1 / 8, Pn(1 / 32, 4)], 64/6), 4], inf),
    \rate, Pseq([-4, 3, 8, 3].midiratio, inf),

//     \dur, Pseq([1 / 16], inf),
    \rate, [-4, 3, 8].midiratio,
    \rate, 8.midiratio * -1.midiratio,

    \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 0.15,
    \pan, Pwhite(-1.0, 1.0, inf),
    \out, ~reverbBus
).play(t, quant: 1);
)

(
// Oscillation glaciale
~shimmerG.stop;
~shimmerG = Pbind(
    \instrument, \guitare,
    \spos, 0.58,
    \atk, 0.25,
    \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.11, 4 * 16)], inf),
    \dur, Pseq([1 / 16, 1 / 8, Pn(1 / 32, 4)], inf),
    \rate, Pseq([-4, 3, 8, 3].midiratio, inf),

//     \dur, Pseq([1 / 16], inf),
    \rate, [-4, 3, 8].midiratio,
    \rate, Pseq([7, 7, 5, 0].stutter(64).midiratio, inf) * -3.midiratio,
    \rate, 9.midiratio,

    \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 0.25,
    \pan, Pwhite(-1.0, 1.0, inf),
    \out, ~reverbBus
).play(t, quant: 1);
)

(
// room
~shimmerH.stop;
~shimmerH = Pbind(
    \instrument, \guitare,
    \spos, 0.73,
    \atk, 0.25,
    \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.11, 4 * 16)], inf) * 2,
    \dur, Pseq([1 / 16, 1 / 8, Pn(1 / 32, 4)], inf),
    \rate, Pseq([-4, 3, 8, 3].midiratio, inf),
    \rate, 0.midiratio,
    \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 1.85,
    \pan, Pwhite(-1.0, 1.0, inf),
    \out, ~highPassBus
).play(t, quant: 1);
)

(
// Sub shimmer
~shimmerB.stop;
// ~vinyl = Synth.new(\vinylSynth, [\amp, 0.5, \spos, 500000]);
~shimmerB = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    // \spos, Pwhite(1047552 - 850000 + ~loc, 1047552 - 840000 + ~loc, inf).round,
    \spos, Pseq([0.24, 0.25, 0.29, 0.3, 0.32, 0.33].stutter(4), inf) + Pwhite(-0.002, 0.002, inf),
    // \spos, 0.3,
    // \spos, Pseq([0.3245, 0.339].stutter(4 * 16), inf) + Pwhite(-0.001, 0.001, inf),
    \spos, Pseq([0.339, 0.324].stutter(4 * 16), inf) + Pwhite(-0.001, 0.001, inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, Pseq([0.288, 0.298].stutter(4), inf),
    // \spos, 0.51,
    // \spos, 0.53,
    // \spos, 0.56,
    \atk, 0.2,
    \rel, 1 / 8,
    \rate, [0.5, 1],
    \amp, 15,
    \pan, Pwhite(-1, 1, inf),
    \out, ~reverbBus
).play(t, quant: 1);
)


0.2595, 0.0035
~har range = 0.258, 0.584
~loc range = 0.004, 0
(
~shimmerC.stop;
~shimmerC = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    // En La majeur
    // Dmaj7, A, Dmaj7, Cm
    // IV, I, IV, iii
    \spos, Pseq([0.237, 0.2545, 0.237, 0.252].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),
    \spos, 0.584 - 0.003 + Pwhite(-0.0001, 0.0001, inf),
//     \spos, 0.2167 - 0.003 + Pwhite(-0.0001, 0.0001, inf),
//     \spos, 0.2595 - 0.003 + Pwhite(-0.0001, 0.0001, inf),
//         \spos, 0.792 - 0.003 + Pwhite(-0.0001, 0.0001, inf),
//     \spos, 0.93 - 0.003 + Pwhite(-0.0001, 0.0001, inf),
//     \spos, 0.584 - 0.004 + Pwhite(-0.0001, 0.0001, inf),
//     \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.1, 4 * 16)], inf),
    \rel, 0.1,
    \atk, 0.5,
    \rate, [0.5, 1] * -8.midiratio,
    \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 0.5,
    \amp, 8,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~highPassBus
).play(t);
)