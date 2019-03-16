Synth.new(\fm, [\freq, 220 * 12.midiratio * 2, \sus, 8, \amp, 60]);


Synth.new(\fm, [\freq, ~toFreq.("D4") * -1.midiratio, \sus, 2, \amp, 40, \out, ~reverbBus]);

(
SynthDef(\fm, {
    arg freq = 440, pan = 0, out = 0, amp = 1, sus = 2, freqMod = 3, atk = 1, mult1 = 1, mult2 = 1, mul3 = 1;
    var sig, osc, sig2, sig3, sig4, env;
	sig = SinOsc.ar([freq, freq + 1]) * 0.1;
    osc = SinOsc.ar(freqMod, 6, 0.25, 1);
    sig2 = SinOsc.ar([freq, freq + 1] * 2.01) * 1 * 1.005;
    sig3 = LFSaw.ar([freq, freq + 1] * 1.01 * 1);
    sig4 = LFSaw.ar([freq, freq + 1] * 1.005 * 2);
    sig = (sig * 0.5) + (sig * sig2) + (sig * sig3 * osc) * (sig * sig4 * 0.5 * osc);
    env = EnvGen.kr(Env.new([0, 1, 0], [atk, sus]), doneAction: 2);
    sig = sig * env * amp * osc;
    // sig = HPF.ar(in: sig, freq: 2200, mul: 1, add: 0);
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
	Out.ar(out, sig);
}).add;
)

rrand(1, 2, 4);