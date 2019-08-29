(
SynthDef.new(\tri, {
    arg out = 0, freq = 440, pan = 0, lfoFreq = 1, 
    atk = 1, dec = 1, sustime = 3, rel = 20, sus = 0.7, pMod = 0.2, amp = 1,
    mod1 = 1, mod2 = 1, amp1 = 4, lfo2Freq = 10;
    var sig, env, lfo, lfo2, mod;
    
    // Safety measures, constraining values.
    amp = min(max(amp, 0), 1.5);
    freq = min(max(freq, 30), 1000);
    
    lfo = SinOsc.kr(lfoFreq, mul: 0.5, add: 0.5);
     lfo2 = SinOsc.kr(lfo2Freq, mul: 0.5, add: 0.5);
    env = EnvGen.ar(Env.new([0.0, 1.0, sus, sus, 0.00001], [atk, dec, sustime, rel], [\linear, \linear, \linear, \exponential]), doneAction: 2);
//     sig = Pulse.ar([freq, freq+1], width: SinOsc.kr(pMod).range(0.25, 0.75), mul: 1.0, add: 0.0) * 0.11;
    mod = SinOsc.ar(freq * mod1) * 800 * amp1;
    sig = LFTri.ar([freq, freq+1] + mod) * SinOsc.ar(freq * mod2) * 0.1;
    sig = sig * env * lfo2;
    sig = (sig * 0.75) + (sig * lfo * 0.25);
// sig = sig * lfo;
//     envf = XLine.kr(400, 20000, sustime * 0.1);
//     sig = LPF.ar(sig, envf);
sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

(
var f = ~toFreq.("F3") * 0.midiratio;
var amp = 0.5;
var p = {rrand(-0.75, 0.75)}!6.();
var fr = [-24, 0, 4, 7, 11, 16];
{
    |i| 
    Synth.new(\tri, 
        [\freq, f * fr[i].midiratio * [0, 12].midiratio.choose, 
         \lfoFreq, rrand(10, 6), 
         \lfo2Freq, rrand(10, 16), 
         \pan, p[i],
         \atk, 4,
         \amp1, 8,
         \mod1, [2, 4].choose * 4,
         \mod2, [2, 4].choose * 4,
         \amp, 1 * amp
    ]);
}!6.();
)

Synth.new(\ponddrop, [\freq, ~toFreq.(["F4", "F5"].choose) * 2 * [0, 2, 4, 5, 7, 9, 11, 12].choose.midiratio, \amp, 4.7, \out, ~reverbBus, \rel, 20, \pan, rrand(0.0, 2.0) - 1, \freqOsc, 2 * 0.25, \triMod, 0.5, \dec, [0.075, 0.1, 0.05].choose, \low, rrand(200, 800)]);



Synth.new(\ponddrop, [\freq, ~toFreq.(["F2"].choose) * 2 * 0.midiratio, \amp, 4.7, \out, ~reverbBus, \rel, 2, \pan, rrand(0.0, 2.0) - 1, \freqOsc, 20 * 0.25, \triMod, 1.5, \dec, 1, \low, rrand(200, 800)]);


(
var fr1 = [0!8, 2!4, 4!3, 2].flat.midiratio;
var fr2 = [0!8, 2!4, -5!3, 2].flat.midiratio;
var fr = fr1 ++ fr2;
~oceanBlue.stop;
~oceanBlue = Pbind(
    \instrument, \ponddrop,
    \dur, Pseq([0.5], inf),
    \freq, ~toFreq.("F2") * 2 * Pseq(fr, inf),
    \atk, 0.15,
    \freqOsc, 20 * 0.25,
    \triMod, Pseq([0.5, 0.5], inf),
    \dec, 4,
    \amp, 7.7 * Pseq([1, 1.75], inf) * 0.5,
    \rel, 2,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, ~reverbBus
).play(t, quant: [1]);
)


(
~friturePerc.stop;
~friturePerc = Pbind(
    \instrument, \friture,
    \dur, Pseq([0.5], inf),
    \freq, Pseq([Rest(), 1], inf) * ~toFreq.("F5") * 0.5,
    \amp, 0.75 * 16 * 2,
    \rel, 0.125 * 5.95 * Pwhite(0.5, 2, inf),
    \atk, 0.01,
    \lpff, 20000,
    \sustain, 0.001,
    \fm1freq, 4.001 * 1.5,
    \pan, Pwhite(-0.2, 0.2, inf),
    \out, ~reverbBus
).play(t, quant: [0.5, 0.125 * 1]);
)

t.tempo_(58/60);