s.boot;
s.quit;

~b1 = Buffer.read(s, "/Users/guillaumepelletier/Desktop/Dropbox/Création musicale/Projets Ableton Live/Avec Caroline Project/Samples/Recorded/0002 7-Audio.aif");

(
SynthDef(\bpfbuff, {
    arg buf = ~b1, rate = 1, spos = 0, pan = 1, amp = 1;
    var sig, env, lfo;
    env = EnvGen.kr(Env.new([0, 1, 0.5, 0], [0.1, 0.15, 0.75]), doneAction: 2);
    sig = PlayBuf.ar(2, buf, rate * BufRateScale.ir(buf), startPos: spos);
    sig = sig * env;
    sig = Balance2.ar(sig[0], sig[1], pan, 1);
    Out.ar(0, sig);
}).add;
)

~speed = 0.005;
~speed = 0.015;
~key = 0;
~speed = {0.015};
(
~dur = PatternProxy(Pn(0.25, inf));
~har = PatternProxy(Pn(0, inf));
~loc = PatternProxy(Pn(400000, inf));
~loc = PatternProxy(Pn(300000, inf));
)
(
p.stop;
a = 400000;
p = Pbind(
    \instrument, \bpfbuff,
    \dur, Pseq([~dur], inf),
    \spos, Pwhite(1047552 - 850000 + ~loc, 1047552 - 840000 + ~loc, inf).round,
    \rate, Pseq([1 * ~har.midiratio, 1 * 5.midiratio, 1 * -7.midiratio], inf),
    \pan, Pwhite(-1, 1, inf)
).play;
)

~dur.source = Pn(0.005, inf);
~har.source = Pn(0, inf);
~har.source = Pn(-2, inf);

(
// ~intenseListen.free;
~intenseListen = OSCdef.new(
    \intense,
    {
        arg msg, time, addr, port;
        ~dur.source = Pn(msg[1], inf);
    },
    '/intensity'
);
)

(
~harListen.free;
~harListen = OSCdef.new(
    \harmonious,
    {
        arg msg, time, addr, port;
//         msg.postln;
//         msg[2].postln;
        ~har.source = Pn(msg[1], inf);
    },
    '/har'
);
)

(
~locListen.free;
~locListen = OSCdef.new(
    \locacious,
    {
        arg msg, time, addr, port;
//         msg[1].postln;
//         msg[1].postln;
        ~loc.source = Pn(msg[1], inf);
//         msg[1].postln;
    },
    '/loc'
);
)
(
~keyListen.free;
~keyListen = OSCdef.new(
    \harmonious,
    {
        arg msg, time, addr, port;
//         msg.postln;
        msg[1].postln;
        ~key = msg[1];
//         ~har.source = Pn(msg[1], inf);
    },
    '/key'
);
)





~shimPos.source = Pn(~har - ~loc, inf);

~shimPos = PatternProxy(Pn(0.237, inf));
// Doux shimmer majeur
~shimPos.source = Pn(0.257, inf);
~shimPos.source = Pn(0.257 - 0.004, inf);
// Doux shimmer mineur
~shimPos.source = Pn(0.584, inf);
~shimPos.source = Pn(0.584 - 0.004, inf);


~shimPos.source = Pn(0.252, inf);
~shimPos.source = Pn(0.237, inf);
~shimPos.source = Pn(0.239, inf);
~shimPos.source = Pn(0.795 - 0.015, inf);

~shimPos.source = Pn(0.6775, inf);
0.585 - 0.008;


(
~shimmerC.stop;
~shimmerC = Pbind(
    \instrument, \guitare,
    \dur, 1 / 16,
    // En La majeur
    // Dmaj7, A, Dmaj7, Cm
    // IV, I, IV, iii
    \spos, Pseq([0.237, 0.2545, 0.237, 0.252].stutter(4 * 16), inf) + Pwhite(0.001, 0.002, inf),
    \spos, ~shimPos + Pwhite(-0.0001, 0.0001, inf),
//     \rel, 1 / 128 * Pseq([Pgeom(0.5, 1.1, 4 * 16)], inf),
    \rel, 0.1,
    \atk, 0.5,
    \rate, [0.5, 1] * -3.midiratio,
    \amp, Pseq([Pgeom(0.5, 1.065, 4 * 16)], inf) * 0.5,
    \amp, 4,
    \pan, Pwhite(-0.5, 0.5, inf),
    \out, 0
).play(t, quant: 1);
)


rrand(1.0, 20);

(
// Clean
~f = {
    var key = ~key;
    var modif = 1.midiratio * 0.midiratio;
    var note1 = ~toFreq.(key) * [0, 12].midiratio.choose * modif;
    var note2 = ~toFreq.(key) * [24, 36].midiratio.choose * 4.midiratio * modif;
    var note3 = ~toFreq.(key) * [24, 36].midiratio.choose * 7.midiratio * modif;
    var note4 = ~toFreq.(key) * [24, 36].midiratio.choose * 11.midiratio * modif;
    var note5 = ~toFreq.(key) * 24.midiratio * 14.midiratio * modif;
//     var mu = 1;
    var mu = [1, 2].wchoose([0.9, 0.1]);
    // var mu = {1 + SinOsc.ar(1, mul: 0.5, add:0.5) * 0.015};
    var delay = 0.125 * 1;
    var max = rrand(1.0, 20);
    var t = Routine({
        play({ PMOsc.ar([note1, note1+1], note1 * mu, Line.ar(0,max,8), 0, XLine.ar(0.1,0.0001, 8, 1, 0, 2)) });
        delay.wait;
        play({ PMOsc.ar([note2, note2+1], note2 * mu, Line.ar(0,max,8), 0, XLine.ar(0.1,0.0001, 8, 1, 0, 2)) });
        delay.wait;
        play({ PMOsc.ar([note3, note3+1], note3 * mu, Line.ar(0,max,8), 0, XLine.ar(0.1,0.0001, 8, 1, 0, 2)) });
        delay.wait;
        play({ PMOsc.ar([note4, note4+1], note3 * mu, Line.ar(0,max,8), 0, XLine.ar(0.1,0.0001, 8, 1, 0, 2)) });
        delay.wait;
        play({ PMOsc.ar([note5, note5+1], note3 * mu, Line.ar(0,max,8), 0, XLine.ar(0.1,0.0001, 8, 1, 0, 2)) });
    }).play;
    4;
};
)

~f.();

TempoClock.default.sched(0.1, {~f.()});
TempoClock.default.clear;