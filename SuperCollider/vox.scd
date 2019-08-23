(
~voice = Buffer.read(s, "/Users/guillaumepelletier/Downloads/slackjaw vox.wav");
// ~voice.numFrames;
SynthDef(\vox, {
    arg buf = ~voice, rate = 1, spos = 0, pan = 1, amp = 1, rel = 2, atk = 0.1, out = 0, hpass = 50;
    var sig, env, lfo;
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, rel]), doneAction: 2);
    sig = PlayBuf.ar(2, ~voice, rate * BufRateScale.ir(buf), startPos: spos * 7481001);
    // sig = LPF.ar(sig, 7000);
    sig = HPF.ar(sig, hpass);
//     sig = sig + (Resonz.ar(sig, ~toFreq.("F5")) * 8);
//     sig = (Resonz.ar(sig, ~toFreq.("F5")) * 8);
    sig = sig * env;
    sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)


// lenteur, lenteur
(
~voxLentoA.stop;
~voxLentoA = Pbind(
    \instrument, \vox,
    \dur, 2,
    \spos, Pseq([0.231, 0.295], inf) + (Pwhite(0.001, 0.002, inf) * 0.15),
    \rel, 0.5,
    \atk, 0.07,
    \amp, Pseq(Pgeom(8, 0.8, 4).asStream.nextN(4), inf)
        * Pdefn(\lentoA, 0.125),
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(~vt, quant: [4]);
)
Pdefn(\lentoA, 1.5);


(
~voxLentoB.stop;
~voxLentoB = Pbind(
    \instrument, \vox,
    \dur, 2,
    \spos, Pseq([0.5, 0.531], inf) + (Pwhite(0.001, 0.002, inf) * 0.15),
    \rel, 0.5,
    \atk, 0.07,
    \amp, Pseq(Pgeom(8, 0.8, 4).asStream.nextN(4), inf)
        * Pdefn(\lentoB, 0.125),
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(~vt, quant: [4, 1]);
)
Pdefn(\lentoB, 1.5);


(
~voxLentoC.stop;
~voxLentoC = Pbind(
    \instrument, \vox,
    \dur, 2,
    \spos, Pseq([0.88, 0.89], inf) + (Pwhite(0.001, 0.002, inf) * 0.15),
    \rel, 0.5,
    \rel, Pseq([0.5, 0.75], inf),
    \atk, 0.07,
    \amp, Pseq(Pgeom(8, 0.8, 8).asStream.nextN(8), inf) 
        * Pdefn(\lentoC, 0.125) * Pseq([1, 0.25], inf),
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(~vt, quant: [1, 0.25] * 4);
)
Pdefn(\lentoC, 1.125);