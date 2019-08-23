

(
~nouvelleFriture.stop;
~shimmerC.stop;
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
     \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.452!2, 0.309, 0.452!2, 0.24585].flat.stutter(16), inf),
     \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.452].stutter(16), inf),
//       0.096
//   incomplet
// -1e-4
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.452, 0.452, 0.452, 0.309].stutter(16), inf),
//   beau et complet
     \spos, Pwhite() * 2 - 1 * 1e-4
         + Pseq([0.452!3, 0.309, 0.452!3, 0.0285].flat.stutter(16), inf),
//   autre
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.932, 0.795].stutter(32), inf),
     // dans le marais
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.452, 0.309, 0.452, 0.24585].stutter(16), inf),
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

Pwhite().asStream.next;

(
SynthDef(\guitare2, {
    arg buf = ~accords, rate = 1, spos = 0, pan = 1, amp = 1, rel = 2, atk = 0.1, out = 0;
    var sig, env, lfo;
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, rel]), doneAction: 2);
    sig = PlayBuf.ar(2, ~accords, rate * BufRateScale.ir(buf), startPos: spos * 7144448);
    sig = sig * env;
    sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)


(
// ~nouvelleFriture.stop;
~shimmerD.stop;
~shimmerD = Pbind(
    \instrument, \guitare2,
    \dur, 1 / 16 * 2,
//     0.345, 0.398, 0.48
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.529!3, 0.295, 0.529!3, 0.25].flat.stutter(16), inf),
          \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.564!3, 0.295, 0.529!3, 0.25].flat.stutter(16), inf),
          \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.294].flat.stutter(4), inf) + Pseq(Pseries(0, 0.00007, 16).asStream.nextN(16).mirror, inf),
          \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.55].flat.stutter(4), inf) + Pseq(Pseries(0, 0.00017, 16).asStream.nextN(16).reverse.mirror.stutter(2), inf),
    \rel, 0.1,
    \atk, 0.5,
    \rate, 4.midiratio,
    \amp, 4 * 0.5,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~highPassBus
).play(t);
)
(
// ~nouvelleFriture.stop;
~shimmerE.stop;
~shimmerE = Pbind(
    \instrument, \guitare2,
    \dur, 1 / 16 * 2,
//     0.345, 0.398, 0.48
//      \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.529!3, 0.295, 0.529!3, 0.25].flat.stutter(16), inf),
          \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.564!3, 0.295, 0.529!3, 0.25].flat.stutter(16), inf),
          \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.294].flat.stutter(4), inf) + Pseq(Pseries(0, 0.00007, 16).asStream.nextN(16).reverse.mirror, inf),
//           \spos, Pwhite(-0.0001, 0.0001, inf) + Pseq([0.55].flat.stutter(4), inf) + Pseq(Pseries(0, 0.00017, 16).asStream.nextN(16).mirror.stutter(2), inf),
    \rel, 0.1,
    \atk, 0.5,
    \rate, 4.midiratio,
    \amp, 4 * 0.5,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~highPassBus
).play(t);
)

[1!2, 2, 3].flat;
s.peakCPU;