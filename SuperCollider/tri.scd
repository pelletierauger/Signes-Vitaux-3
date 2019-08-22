(
SynthDef.new(\tri, {
    arg out = 0, freq = 440, pan = 0, lfoFreq = 1, 
    atk = 1, dec = 1, sustime = 3, rel = 20, sus = 0.7, pMod = 0.2, amp = 1,
    mod1 = 1, mod2 = 1, amp1 = 4;
    var sig, env, lfo, mod;
    
    // Safety measures, constraining values.
    amp = min(max(amp, 0), 1.5);
    freq = min(max(freq, 30), 1000);
    
    lfo = SinOsc.kr(lfoFreq, mul: 0.5, add: 0.5);
    env = EnvGen.ar(Env.new([0.0, 1.0, sus, sus, 0.00001], [atk, dec, sustime, rel], [\linear, \linear, \linear, \exponential]), doneAction: 2);
//     sig = Pulse.ar([freq, freq+1], width: SinOsc.kr(pMod).range(0.25, 0.75), mul: 1.0, add: 0.0) * 0.11;
    mod = SinOsc.ar(freq * mod1) * 800 * amp1;
    sig = LFTri.ar([freq, freq+1] + mod) * SinOsc.ar(freq * mod2) * 0.1;
    sig = sig * env;
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
var f = ~toFreq.("F3") * 12.midiratio;
var amp = 1;
var p = {rrand(-0.75, 0.75)}!6.();
var fr = [-28, 2, 5, 7, 9, 14];
{
    |i| 
    Synth.new(\tri, 
        [\freq, f * fr[i].midiratio * 0.midiratio, 
         \lfoFreq, rrand(10, 6), 
         \pan, p[i],
         \atk, 4,
         \mod1, [0.5, 1, 2, 4].choose,
         \mod2, [0.5, 1, 2, 4].choose,
         \amp, 0.5 * amp
    ]);
}!6.();
// Synth.new(\tri, [\freq, f * 0.5 * -17.midiratio, \lfoFreq, rrand(0.1, 6), \pan, p[0], \amp, 0.85 * 1]);
// Synth.new(\tri, [\freq, f * -1.midiratio * 1, \lfoFreq, rrand(0.1, 6), \pan, p[1], \amp, 0.5 * amp]);
// Synth.new(\tri, [\freq, f * 2.midiratio * 1, \lfoFreq, rrand(0.1, 6), \pan, p[2], \amp, 0.5 * amp]);
// Synth.new(\tri, [\freq, f * 7.midiratio * 1, \lfoFreq, rrand(0.1, 6), \pan, p[3], \amp, 0.5 * amp]);
// Synth.new(\tri, [\freq, f * 9.midiratio * 1, \lfoFreq, rrand(6, 12), \pan, p[4], \amp, 0.5 * amp]);
// Synth.new(\tri, [\freq, f * 14.midiratio * 1, \lfoFreq, rrand(6, 12), \pan, p[5], \amp, 0.5 * amp]);
)
// {rrand(-0.5, 0.5)}!5.();

{|i| i.postln;}!5.();