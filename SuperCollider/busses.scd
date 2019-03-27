s.boot;
s.record;
s.stopRecording;

(
~sourceGroup = Group.new;
~fxGroup = Group.after(~sourceGroup);
~volumeBus = Bus.audio(s, 2);
~reverbBus = Bus.audio(s, 2);
~slideBus = Bus.audio(s, 2);
~passesBus = Bus.audio(s, 2);
~highPassBus = Bus.audio(s, 2);
)

(
SynthDef.new(\reverb, {
    arg in, out = 0;
    var sig, del;
    sig = In.ar(in, 2);
    del = CombC.ar(in: sig,
    maxdelaytime: 0.1,
    delaytime: [0.25, 0.26],
    decaytime: 20,
    mul: 1, add: 0);
    del = LPF.ar(del, 600);
	sig = sig + (del * 0.125);
    Out.ar(0, sig);
}).add;
)

(
~reverbSynth.free;
~reverbSynth = Synth.new(\reverb, [\in, ~reverbBus, \out, 0], ~fxGroup);
)

(
SynthDef.new(\slideSynthDef, {
    arg in, out = 0;
    var sig, del;
    sig = In.ar(in, 2);
//     sig = HPF.ar(sig, 2000);
//     sig = Compander.ar(sig, sig,
//         thresh: 0.9,
//         slopeBelow: 0.1,
//         slopeAbove: 1,
//         clampTime:  0.01,
//         relaxTime:  0.01
//     ) * 0.1;
    del = CombC.ar(in: sig,
    maxdelaytime: 0.1,
    delaytime: [0.1, 0.09],
    decaytime: 30,
    mul: 1, add: 0);
    sig = sig + (del * 0.25);
    sig = sig * SinOsc.ar(3, mul: 0.5, add:0.5);
    sig = sig + LPF.ar(GVerb.ar(sig, 99, 10), 1500);
    Out.ar(0, sig);
}).add;
)

(
~slideSynth.free;
~slideSynth = Synth.new(\slideSynthDef, [\in, ~slideBus, \out, 0], ~fxGroup);
)



(
SynthDef.new(\passes, {
    arg in, out = 0;
    var sig;
    sig = In.ar(in, 2);
//     sig = (sig * 0.02625) + HPF.ar(sig, FSinOsc.kr(XLine.kr(0.7, 300, 20), 0, 300, 600), 0.75);
    sig = LPF.ar(sig, 400);
    Out.ar(0, sig);
}).add;
)

(
~passesSynth.free;
~passesSynth = Synth.new(\passes, [\in, ~passesBus, \out, ~reverbBus], ~fxGroup);
)


(
SynthDef.new(\highPass, {
    arg in, out = 0;
    var sig;
    sig = In.ar(in, 2);
    sig = HPF.ar(sig, 200, 0.75);
//     sig = LPF.ar(sig, 20000);
    Out.ar(~reverbBus, sig);
}).add;
)

(
~highPassSynth.free;
~highPassSynth = Synth.new(\highPass, [\in, ~highPassBus, \out, ~reverbBus], ~fxGroup);
)