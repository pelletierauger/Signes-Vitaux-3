(
SynthDef.new(\bubble, {
    arg out, freq = 220, lon = 3, lfoFreq = 6, amp = 1, pan = 0;
    var sig, sig2, lin, lin2, lfo, linUp;
    lin = XLine.kr(1, 0.0001, lon, doneAction: 2);
    linUp = XLine.kr(0.0001, 1, lon * 0.01, doneAction: 0);
    // lin2 = Line.kr(1, 0, lon, don
    lfo = SinOsc.kr(lfoFreq);
    lin2 = XLine.kr(0.001, 0.1, 0.5, doneAction: 0);
    freq = freq * max(1, linUp + 0.99);
    sig = LFTri.ar([freq/2, freq/2+2]) * (12 / lon);
    sig2 = SinOsc.ar([freq*1.01, freq*1.01+2]) * (12 / lon);
    sig = (sig /2) + (sig2/2);
    sig = sig * lin * lin2 * lfo;
    sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

(
20.do({
var det = rrand(0.97, 1.03);
var lfo = rrand(16.0, 22.0);
lfo.postln();
Synth.new(\fm, [\freq, ~toFreq.("A5") * -20.midiratio * det, \amp, 4, \out, ~passesBus, \sus, 15, \freqMod, lfo, \pan, rrand(-1.0, 1.0), \atk, 3]);
});
)


x = Synth.new(\bubble, [\freq, ~toFreq.("A3") * 0.midiratio, \amp, 32, \out, ~reverbBus, \lon, 6]);


(
SynthDef.new(\simplest, {
    arg out, freq = 220, lon = 3, amp = 1, pan = 0, atk = 0.02, rel = 1;
    var sig, env;
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, rel]), doneAction: 2);
    sig = SinOsc.ar([freq, freq + 1]) * 0.1;
    sig = sig + (LFTri.ar([freq, freq + 1] * 1) * 0.02);
    sig = sig * env * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

Synth.new(\simplest, [\freq, ~toFreq.("A3") * -5.midiratio, \amp, 1, \out, 0, \rel, 0.25]);


(
~tapis.stop;
~tapis = Pbind(
    \instrument, \simplest,
    \dur, 1,
    \freq, ~toFreq.("A2") * Pseq([0, 5, -8, -3].stutter(4).midiratio, inf) * Pseq([1, 2], inf),
    \freq, ~toFreq.("A2") * Pseq([-7, 5, -3, 0].stutter(2).midiratio, inf) * Pseq([1], inf),
    \rel, 1.5,
    \amp, Pseq([9, 7], inf),
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(t, quant: [1]);
)

k = ~toFreq.("A2") * Pseq([0, 5, -8, -3].stutter(4).midiratio, inf).asStream;
k.next.cpsmidi;



(
~tapis.stop;
~tapis = Pbind(
    \instrument, \simplest,
    \dur, 1,
    \freq, ~toFreq.("A2") * Pseq([0, 5, -8, -3].stutter(4).midiratio, inf) * Pseq([1, 2], inf),
    \freq, ~toFreq.("A2") * Pseq([0, 0, 2, 2].stutter(2).midiratio, inf) * Pseq([1], inf),
    \rel, 1.5,
    \amp, Pseq([9, 7], inf),
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(t, quant: [1]);
)


(
SynthDef(\pulse, {
    arg freq = 440, pan = 0, out = 0, amp = 1, sus = 0.125, atk = 0.001;
    var sig, env;
    sig = Impulse.ar(0.1, mul: 0.4);
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, sus * 1.25]), doneAction: 2);
    sig = Ringz.ar(sig, freq, sus);
    sig = sig * env * 1.2 * amp;
    sig = Pan2.ar(sig, pan);
	Out.ar(out, sig);
}).add;
)

(
~uFreqs = PatternProxy(
    Pseq(~toFreq.("A4") * [7, 4, 0, 4, 7, 4, 2, 0].midiratio, inf)
);
u.stop;
u = Pbind(
    \instrument, \pulse,
    \dur, Pseq([1, 0.5, 0.5, Pn(0.25, 4)], inf),
    \freq, ~uFreqs * 2,
    \pan, Pwhite(-0.5, 0.5, inf),
    \amp, 1,
    \out, [~reverbBus, 0]
).play(t, quant: 1);
)