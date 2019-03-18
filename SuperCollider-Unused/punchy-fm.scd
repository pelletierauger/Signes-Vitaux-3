(
SynthDef.new(\mynewmoog, {
    arg pan = 0, amp = 0.1, cutoff = 500, gain = 3.3, atk = 0.1, dec = 0.1, sus = 0.7, sustime = 1, rel = 0.2, atkf = 0.1, decf = 0.1, susf = 0.9, sustimef = 0.9, relf = 0.2, freq = 440, out = 0;
    var ampEnv = EnvGen.ar(Env.new([0.0, 1.0, sus, sus, 0.00001], [atk, dec, sustime, rel], [\linear, \linear, \linear, \exponential]), doneAction: 2);
    var filterEnv = EnvGen.ar(Env.new([0.0, 1.0, susf, susf, 0.00001], [atkf, decf, sustimef, relf], [\linear, \linear, \linear, \exponential]));
    var sig = LFTri.ar([freq, freq + 1]);
    var newEnv = XLine.kr(1, 0.0001, 2);
    var newFM = LFSaw.ar([freq+1, freq] * 8.001) * newEnv;
    var newFM2 = LFTri.ar([freq+1, freq] * 1.001) * newEnv;
    var lfo = SinOsc.kr(2, mul: 0.5);
    sig = sig * LFTri.ar([freq + 2, freq + 1] * 1) * lfo;
    sig = sig + (sig * newFM) + (sig * newFM2);
    sig = MoogFF.ar(sig, cutoff * filterEnv, gain) * amp * ampEnv;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)
x = Synth.new(\mynewmoog, [\rel, 2, \relf, 2, \cutoff, 1000, \sustime, 0.75, \sustimef, 0.5, \amp, 2, \freq, 50]);
x.set(\gate, 0);