~marimBus = Bus.audio(s, 2);

(
SynthDef(\marimVerb, {
    arg	amp=1, lPos=0, mix=0.085, revTime=1.8, preDel=0.1, in, out;
    var sig, verbSig, totalSig, outSig;
    //no wacky values please
    mix = mix.clip(0,1);
    sig = In.ar(in, 2);
    //pre-delay
    verbSig = DelayN.ar(sig, preDel, preDel);
    totalSig = 0;
    12.do{
        verbSig = AllpassN.ar(verbSig, 0.06, {Rand(0.001,0.06)}!2, revTime);
        verbSig = LPF.ar(verbSig, 4500);
        totalSig = totalSig + verbSig;
    };
    //dry/wet mix
    totalSig = XFade2.ar(sig, totalSig, mix.linlin(0,1,-1,1));
    outSig = totalSig * amp;
    Out.ar(out, outSig);
}).add;
)


(
~marimVerbSynth.free;
~marimVerbSynth = Synth.new(\marimVerb, [\in, ~marimBus, \out, 0], ~fxGroup);
)

(
SynthDef(\marimba, {
    arg	freq=440, detune=3.0, atk=6, sus=4, rel=6, curve1=1, curve2=(-1),
    minCf=30, maxCf=6000, minRq=0.005, maxRq=0.04,
    minBpfHz=0.02, maxBpfHz=0.25,
    lowShelf=220, rs=0.85, db=6,
    gate=1, amp=1, spread=1.0, out=0;
    var sig, env;
    env = EnvGen.kr(Env([0,1,1,0],[atk,sus,rel],[curve1,0,curve2]), gate, levelScale:amp, doneAction:2);
    sig = Saw.ar(
        freq +
        LFNoise1.kr({LFNoise1.kr(0.5).range(0.15,0.4)}!8).range(detune.neg,detune));
    sig = BPF.ar(
        sig,
        LFNoise1.kr({LFNoise1.kr(0.13).exprange(minBpfHz,maxBpfHz)}!8).exprange(minCf, maxCf),
        LFNoise1.kr({LFNoise1.kr(0.08).exprange(0.08,0.35)}!8).range(minRq, maxRq)
    );
    sig = BLowShelf.ar(sig, lowShelf, rs, db);
    sig = SplayAz.ar(4, sig, spread);
    sig = sig * env * 2;
    Out.ar(out, sig);
}).add;
)

(
// ~marim.free;
// var fr = (([23,35,47,50,52,59,61,63,64,76,78].choose) + rrand(-7,7)).midicps * ((1..8).choose);
~marimCluster = {
var fr = ~toFreq.(~key) * [16].choose * [12, 24, 19].choose.midiratio;
~marim = Synth(
    \marimba,
    [
        \freq, [4, 8].choose,
        \detune, 0,
        \minBpfHz, 0.01,
        \maxBpfHz,8.expexp(1.0,16.0,0.1,16.0),
        \minRq, 0.003,
        \maxRq, exprand(0.008,0.08),
        \minCf, fr,
        \maxCf, fr * [1,1.1,1.5].wchoose([0.87,0.1,0.03]),
        \amp, 1,
        \atk, exprand(0.7,8),
        \rel, 5,
        \sus, rrand(6,10.0),
        \spread, exprand(1.5,8.0),
        \out, ~reverbBus,
    ],
);
4;
};
)

~marimCluster.();
TempoClock.default.sched(0, {~marimCluster.()});
TempoClock.default.clear;

(
~marimClusters = Task {
{~marimCluster.(); [4].choose.wait;}.loop;}.start;
)
~marimClusters.stop;