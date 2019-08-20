(
SynthDef.new(\rectangle, {
    arg out = 0, freq = 440, pan = 0, lfoFreq = 1, atk = 1, dec = 1, sustime = 3, rel = 20, sus = 0.7, pMod = 0.2, amp = 1;
    var sig, env, lfo;
    
    // Safety measures, constraining values.
    amp = min(max(amp, 0), 1.5);
    freq = min(max(freq, 50), 3000);
    
    
    lfo = SinOsc.kr(lfoFreq, mul: 0.5, add: 0.5);
    env = EnvGen.ar(Env.new([0.0, 1.0, sus, sus, 0.00001], [atk, dec, sustime, rel], [\linear, \linear, \linear, \exponential]), doneAction: 2);
    sig = Pulse.ar([freq, freq+1], width: SinOsc.kr(pMod).range(0.25, 0.75), mul: 1.0, add: 0.0) * 0.11;
//     sig = sig * LFSaw.ar([freq + 1, freq]);
    sig = sig * env;
    sig = (sig * 0.75) + (sig * lfo * 0.25);
//     envf = XLine.kr(400, 20000, sustime * 0.1);
//     sig = LPF.ar(sig, envf);
sig = sig * amp;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)


(
Synth.new(\rectangle, [\freq, ~toFreq.("A5"), \lfoFreq, rrand(0.1, 0.1), \pMod, rrand(0.1, 3), \dec, 0.045, \sustime, 0.001, \rel, 0.001, \atk, 0.0001, \pan, rrand(-0.5, 0.5), \amp, 2])
)


(
~laserCluster = {
var key = ~toFreq.("F4");
var freqs = key * [0, 2, 4, 7, 9, -1].midiratio.choose * [1, 2].choose;
var freq2 = key * [0, 2, 4, 7, 9, -1].midiratio.choose * [1, 2].choose;
var freqList = Array.fill(16, {freqs;});
var durs = Array.fill(16, {[0.25, 0.25].wchoose([0.9, 0.1])});
var amps = Pseries(0, 1/64, 64).asStream.nextN(64).mirror2;
durs = ([0.25, 0.25].choose)!16;
~laser.stop;
Pbind(
    \instrument, \rectangle,
    \dur, Pseq(durs, inf),
    \freq, Pseq([freqs, freq2], inf),
    \dec, 0.045 * 1, 
    \sustime, 0.001, 
    \rel, 0.001,
    \atk, 0.0001,
    \amp, Pseq(amps * 10, 1) * Pseq([1, 1], inf),
    \lfoFreq, rrand(0.1, 0.1),
    \pMod, rrand(0.1, 3),
    \pan, Pwhite(-0.75, 0.75, inf),
    \out, 0
).play(t, quant: 0.25);
}
)
(
~laserClusters = Task {
{~laserCluster.(); [6, 8].choose.wait;}.loop;}.start;
)
~laserClusters.stop;