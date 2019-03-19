(
SynthDef.new(\mymoog, {
    arg pan = 0, amp = 0.1, cutoff = 500, gain = 3.3, atk = 0.1, dec = 0.1, sus = 0.7, sustime = 1, rel = 0.2, atkf = 0.1, decf = 0.1, susf = 0.9, sustimef = 0.9, relf = 0.2, freq = 440, out = 0;
    var ampEnv = EnvGen.ar(Env.new([0.0, 1.0, sus, sus, 0.00001], [atk, dec, sustime, rel], [\linear, \linear, \linear, \exponential]), doneAction: 2);
    var filterEnv = EnvGen.ar(Env.new([0.0, 1.0, susf, susf, 0.00001], [atkf, decf, sustimef, relf], [\linear, \linear, \linear, \exponential]));
    var sig = LFTri.ar([freq, freq + 1]);
    var lfo = SinOsc.kr(2, mul: 0.5);
    sig = sig * LFTri.ar([freq + 2, freq + 1] * 1) * lfo;
    sig = MoogFF.ar(sig, cutoff * filterEnv, gain) * amp * ampEnv;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(out, sig);
}).add;
)

x = Synth.new(\mymoog, [\rel, 2, \relf, 2, \cutoff, 1000, \sustime, 1, \sustimef, 1, \amp, 2, \freq, 220]);
x.set(\gate, 0);

(
~moogArp = {
if (~dur.asStream.next > 0.01, {
    var delay = 0;
    var degrees = Array.fill(3, {[1, 1, 1, 2].choose}) ++ [1, 1];
    var modif = -4.midiratio;
    var key = ~toFreq.(~key) * modif * 2;
    var notes = key * [0, 4, 7, 11, 14].midiratio;
    var arr = (notes * degrees).scramble;
    var cutoff = 500;
    var amplitude = 6;
    var steps = Array.fill(5, {[0.125, 0.25].choose});
    var melody = Pbind(
        \instrument, \mymoog,
        \dur, Pseq(steps, 20),
        \freq, Pseq(arr, inf),
        \cutoff, Pseries(500, 100, inf),
        \atk, 0.15, 
        \atkf, 0.1, 
        \rel, 0.75 * \dur, 
        \relf, 1,
        \sustime, 0.125, \sustimef, 0.125,
        \amp, Pseries(6, -0.06, inf),
        \pan, Pwhite(-0.5, 0.5, inf)
    ).play();
});
floor(rrand(10.0, 20.0));
};
)

~moogArp.();

TempoClock.default.sched(0, {~moogArp.()});
TempoClock.default.clear;
