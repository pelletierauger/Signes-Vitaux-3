(
SynthDef(\ChicagoPad2, { |out = 0, freq = 440, freq2=660, freq3=528, cutoff = 500, amp = 0.2, gate=1|

    var snd;
    var delay = 0.045+0.05;

    freq = freq + SinOsc.kr(freq*1/2, 0, freq/2, 0);

    snd = Saw.ar([freq, freq+1, freq-1, freq2, freq3] * [0.99,1])*0.1;

    snd = snd + VarSaw.ar(0.99*[freq, freq+1, freq-1, freq2, freq3, freq2+1, freq3+1],0, LFTri.kr(7.13).range(0.00,0.1))*0.1;


    snd = Mix(snd);
    snd = FreeVerb.ar(snd, 0.51,10,0.1)*2;
    snd = snd *8;
    snd = RLPF.ar(snd, SinOsc.kr([0.1,4.2], 0, [1700,480], [4000,700,5000])/[20.51,20], SinOsc.ar(0.1,1.5*pi)+1.05)/3;
    snd = Mix(snd);

    snd = MoogFF.ar(snd, SinOsc.kr(0.08, 0.5, cutoff/10, cutoff), 3, 0);

    snd = snd * EnvGen.ar(Env.dadsr(delay,0.4, 0.01,0.8,0.4), gate, doneAction:2);
    //snd = snd * EnvGen.ar(Env.adsr(0.4, 0.01,0.8,0.4), gate, doneAction:2);

    snd = [snd , AllpassC.ar(snd, delay, 0.05+SinOsc.ar(0.11).range(0,0.045), 0.3)];
    snd = snd * amp;
    Out.ar(out, snd);

}).add;
)

(
~pad.free;
~pad = Synth.new(\ChicagoPad2, [
    \freq, ~toFreq.("A3"),
    \freq2, ~toFreq.("C#4"),
    \freq3, ~toFreq.("E4"),
    \sus, 2,
    \legato, 1,
	\cutoff, 4500,
	\dur, 4,
	\amp, 1,
    \out, 0
]);
)

~pad.set(\gate, 0);


(
~pad2.free;
~pad2 = Synth.new(\ChicagoPad2, [
    \freq, ~toFreq.("D4"),
    \freq2, ~toFreq.("F#5"),
    \freq3, ~toFreq.("C#4"),
    \sus, 2,
    \legato, 1,
	\cutoff, 4500,
	\dur, 4,
	\amp, 2,
    \out, 0
]);
)

(
~chic.stop;
~chic = Pdef(\plop2, Pbind(
	\instrument, \ChicagoPad2,
	\degree, Pseq([0,4,0,3,1],inf),
	\root, -4,
	\freq2, Pkey(\freq)*(3/2) / 2,
	\freq3, Pkey(\freq)*(5/6) / 2,
	\legato, 1,
	\cutoff, 4500,
	\dur, 4,
	\amp, 0.2
)).play;
);