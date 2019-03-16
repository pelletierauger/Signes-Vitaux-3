(
~sourceGroup = Group.new;
~fxGroup = Group.after(~sourceGroup);
~volumeBus = Bus.audio(s, 2);
~reverbBus = Bus.audio(s, 2);
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
	sig = sig + (del * 0.125);
    Out.ar(0, sig);
}).add;
)

(
~reverbSynth.free;
~reverbSynth = Synth.new(\reverb, [\in, ~reverbBus, \out, 0], ~fxGroup);
)

(
SynthDef.new(\passes, {
    arg in, out = 0;
    var sig;
    sig = In.ar(in, 2);
//     sig = (sig * 0.02625) + HPF.ar(sig, FSinOsc.kr(XLine.kr(0.7, 300, 20), 0, 300, 600), 0.75);
    sig = LPF.ar(sig, 200);
    Out.ar(0, sig);
}).add;
)

(
~passesSynth.free;
~passesSynth = Synth.new(\reverb, [\in, ~passesBus, \out, ~reverbBus], ~fxGroup);
)


(
SynthDef.new(\highPass, {
    arg in, out = 0;
    var sig;
    sig = In.ar(in, 2);
    sig = HPF.ar(sig, 1000, 0.75);
    Out.ar(0, sig);
}).add;
)

(
~highPassSynth.free;
~highPassSynth = Synth.new(\reverb, [\in, ~highPassBus, \out, ~reverbBus], ~fxGroup);
)