(
SynthDef.new(\rectangle, {
    arg out = 0, freq = 440, pan = 0, lfoFreq = 1, atk = 1, dec = 1, sustime = 3, rel = 20, sus = 0.7, pMod = 0.2, amp = 1;
    var sig, env, lfo;
    
    // Safety measures, constraining values.
    amp = min(max(amp, 0), 1.5);
    freq = min(max(freq, 50), 1000);
    
    
    lfo = SinOsc.kr(lfoFreq, mul: 0.5, add: 0.5);
    env = EnvGen.ar(Env.new([0.0, 1.0, sus, sus, 0.00001], [atk, dec, sustime, rel], [\linear, \linear, \linear, \exponential]), doneAction: 2);
    sig = Pulse.ar([freq, freq+1], width: SinOsc.kr(pMod).range(0.25, 0.75), mul: 1.0, add: 0.0) * 0.11;
    sig = sig * env;
    sig = (sig * 0.75) + (sig * lfo * 0.25);
//     envf = XLine.kr(400, 20000, sustime * 0.1);
//     sig = LPF.ar(sig, envf);
sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

[0, 1, 3] * [1, 2];
[0, 1, 3].do({|item| (item * 3).postln;});
(
~rect1 = {
|amp = 1|
var ky = ~toFreq.(~key) * 8 * -4.midiratio * -1.midiratio;
ky.postln;
[[-12, 0, 12].choose, [4, 16].choose, [-5, 7].choose, 11, 14, 16].do({
    arg item, i;
    item.postln;
    x = Synth.new(\rectangle, [\freq, ky * item.midiratio, \lfoFreq, rrand(0.1, 6), \pMod, rrand(0.1, 3), \pan, rrand(-1.0, 1.0), \amp, amp]);
});
};
~rect2 = {
|amp = 1|
var ky = ~toFreq.(~key) * 8 * -7.midiratio * -1.midiratio;
ky.postln;
[[-12, 0, 12].choose, [4, 16].choose - 1, [-5, 7].choose].do({
    arg item, i;
    item.postln;
    x = Synth.new(\rectangle, [\freq, ky * item.midiratio, \lfoFreq, rrand(0.1, 6), \pMod, rrand(0.1, 3), \pan, rrand(-1.0, 1.0), \amp, amp]);
});
};
~rect3 = {
|amp = 1|
var ky = ~toFreq.(~key) * 8 * -2.midiratio * -1.midiratio;
ky.postln;
[[-12, 0].choose, [4].choose + 1, [-5, 7].choose].do({
    arg item, i;
    item.postln;
    x = Synth.new(\rectangle, [\freq, ky * item.midiratio, \lfoFreq, rrand(0.1, 6), \pMod, rrand(0.1, 3), \pan, rrand(-1.0, 1.0), \amp, amp]);
});
};
~rect4 = {
|amp = 1|
var ky = ~toFreq.(~key) * 8 * 3.midiratio * -1.midiratio;
ky.postln;
[[-12, 0].choose, [4].choose + 0, [-5, 7].choose].do({
    arg item, i;
    item.postln;
    x = Synth.new(\rectangle, [\freq, ky * item.midiratio, \lfoFreq, rrand(0.1, 6), \pMod, rrand(0.1, 3), \pan, rrand(-1.0, 1.0), \amp, amp]);
});
};
)

~creakyClusters.stop;
~noisyPestilence.();

~rect1.(0.85);
~rect2.(0.85);
~rect3.(0.85);
~rect4.(0.85);
~squeakyCloud.();

(
// ~rect1 = {
var ky = ~toFreq.(~key) * 4 * 0.midiratio;
ky.postln;
[[-12, 0, 12].choose, [4, 16].choose * 0, 2, 7, 14].do({
    arg item, i;
    item.postln;
    x = Synth.new(\rectangle, [\freq, ky * item.midiratio, \lfoFreq, rrand(0.1, 6), \pMod, rrand(0.1, 3), \pan, rrand(-1.0, 1.0), \amp, 0.85]);
});
)


(
    x = Synth.new(\rectangle, [\freq, 110, \lfoFreq, rrand(0.1, 6), \pMod, rrand(0.1, 3), \pan, rrand(-1.0, 1.0), \out, ~passesBus]);
)



(
SynthDef.new(\bass, {
    arg out, freq = 220, lon = 3, amp = 1, pan = 0, atk = 0.9, rel = 1;
    var sig, env;
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, rel]), doneAction: 2);
    sig = SinOsc.ar([freq, freq + 1]) * 0.1;
    sig = sig + (LFTri.ar([freq, freq + 1] * 1) * 0.2);
    sig = sig * env * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

Synth.new(\bass, [\freq, ~toFreq.(~key) * 4 * 1.midiratio, \amp, 1, \rel, 10, \out, 0]);
