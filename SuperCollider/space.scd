5!5;


{|i|i*2}!5;

i = 3;
r = [ 3, 5, 8, 9 ] / 8;
d = rrand(0.25*i, 3*i).round(0.25);
f = i % 3 + 1 * 444 * r.wrapAt(i);

[1, 2, 3].choose * 444;

0.125 * 5;
1.125/0.125;
6 % 3;
a = [0, 1, 2, 3, 4];
a.wrapAt(13);


(
SynthDef(\squeak, {
    arg freq = 440, pan = 0, amp = 0.1, sustime = 0.5, out = 0, rel = 15;
    var sig, x, env, lfo, envf, mod;
    env = EnvGen.ar(Env.new([0.0, 1.0, 0.5, 0.5, 0.00001], [0.1, 0.1, sustime, rel], [\linear, \linear, \linear, \exponential]), doneAction: 2);
    envf = XLine.kr(400, 2000, sustime * 0.1);
    mod = SinOsc.kr(1, mul: 0.5, add: 0.65);
    lfo = SinOsc.kr(12) * mod;
//     lfo = 1.0;
    x = {
        |i|
        var m = i * 7;
        LFSaw.ar([freq + (m * lfo), freq + 1 + (m * lfo)]) * amp * env;
    }!16;
//     sig = SinOsc.ar([freq, freq + 1]) * amp;
    sig = Splay.ar(x, spread: 1);
//     sig = sig * LFTri.ar([freq, freq - 1] * 4);
    sig = LPF.ar(sig, envf) * mod;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)
Array.series(16, -1, 1/8);
x = Synth.new(\space, [\freq, 440 * 3.midiratio, \sustime, 3, \amp, 0.3]);



(
~squeakyCloud = {
5.do({
var modif = -4.midiratio * 0.midiratio;
var scale = [0, 4, 7, 9, 11];
var key = ~toFreq.(~key) * 48.midiratio * modif * scale.choose.midiratio;
TempoClock.default.sched(rrand(0.1, 1.75), {
    Synth.new(\squeak, [\freq, key, \sustime, 3, \amp, 0.1, \pan, rrand(-1.0, 1.0)]);
});
});
};
)

~squeakyCloud.();
-1.midiratio;
rrand(-1.0, 1.0);
~key;
s.numSynths;
s.peakCPU;
s.avgCPU;
(
~outerSpace.free;
~outerSpace = {
    x = {|i|
        r = [ 3, 5, 8, 9 ] / 8;
        d = rrand(0.25*i, 3*i).round(0.25);
        f = i % 3 + 1 * 444 * r.wrapAt(i);
        Env.sine(12, 0.01).ar(0, TDelay.ar(Impulse.ar(1/12), d)) * Resonz.ar(WhiteNoise.ar(0.5), f, 0.01);  
    } ! 8;
    HPF.ar(Limiter.ar(55 * GVerb.ar(Splay.ar(x), 99, 10).flop.sum), 30).sanitize;
}.play();
)

// The synth below is taken (and slightly adapted) from
// {}.play - SuperCollider fragments,
// a collection written by David Granström. {}.play is free software
// distributed under a GNU General Public License. 
// https://synthdef.art/function-play-license/
// My adaptation is also free software distributed under the same license.
// The fragment is titled #wavemechanics and can be found here:
// https://synthdef.art/function-play/

(
SynthDef(\space, {
    arg amp = 1, out = 0;
    var x = {|i|
        r = [ 3, 5, 8, 9 ] / 8;
        d = rrand(0.25*i, 3*i).round(0.25);
        f = i % 3 + 1 * 444 * r.wrapAt(i);
        Env.sine(12, 0.01).ar(0, TDelay.ar(Impulse.ar(1/12), d)) * Resonz.ar(WhiteNoise.ar(0.5), f, 0.01);  
    } ! 8;
    Out.ar(0, HPF.ar(Limiter.ar(55 * GVerb.ar(Splay.ar(x) * amp, 99, 10).flop.sum), 30).sanitize);
}, [3]).add;
)

~space.free;
~space = Synth.new(\space);
~space.set(\amp, 4);




~slide = Buffer.read(s, "/Users/guillaumepelletier/Desktop/Dropbox/Art/p5/Signes-Vitaux-3/SuperCollider/slide-guitar.aif");
~slide.numFrames;
~slide.numChannels;

(
SynthDef(\slideguitar, {
    arg buf = ~slide, rate = 1, spos = 0, pan = 0, amp = 1, rel = 2, atk = 0.1, out = 0;
    var sig, env, lfo;
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, rel]), doneAction: 2);
    sig = PlayBuf.ar(2, ~slide, rate * BufRateScale.ir(~slide), startPos: spos * 4325888);
    sig = sig * env;
    sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)
x = Synth.new(\slideguitar, [\spos, 0.1, \rel, 3, \amp, 1]);
(
~slidy.stop;
~slidy = Pbind(
    \instrument, \slideguitar,
    \dur, 7,
    \spos, Pwhite(0.0, 0.9, inf),
    \rel, 4,
    \rate, 0.midiratio,
    \amp, 0.125,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~slideBus
).play(quant: 1);
)

(
~slidy2.stop;
~slidy2 = Pbind(
    \instrument, \slideguitar,
    \dur, 0.05,
    \spos, Pwhite(0.0, 0.9, inf),
    \rel, 0.01,
    \rate, 0.midiratio,
    \amp, 1,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~slideBus
).play(quant: 1);
)
