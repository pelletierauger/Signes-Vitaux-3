sendSuperCollider = function() {
//     console.log("Yeah");
    if (frameCount % 2 == 0) {
        intensity = Math.sin(drawCount);
        if ((intensity > 0) !== positive) {
            positive = (intensity > 0);
            console.log("Changed!");
            let har = (positive) ? 0.257 : 0.584;
            let key = (positive) ? "Db1" : "D#1";
//             socket.emit('supercollider', {
//                 name: "/har",
//                 value: har
//             });
            logJavaScriptConsole(har);
            socket.emit('sendOSC', {
                address: "/har",
                type: "f",
                value: har
            });
            socket.emit('sendOSC', {
                address: "/key",
                type: "s",
                value: key
            });
        }
        // console.log(intensity);
        intensity = Math.abs(intensity);
        intensity = map(intensity, 0.007, 1, 0.005, 0.015);
        intensity = constrain(intensity, 0.005, 0.015);
//         logJavaScriptConsole(intensity); 
//         let loc = Math.floor(map(intensity, 0.005, 0.015, 0, 0.004));
        let loc = map(intensity, 0.005, 0.015, 0.004, 0) ;
//         socket.emit('supercollider', {
//             name: "/loc",
//             value: loc
//         });
//         logJavaScriptConsole(loc);
        socket.emit('sendOSC', {
            address: "/loc",
            type: "f",
            value: loc
        });
        // intensity = Math.abs(intensity) * 0.1;
        socket.emit('supercollider', {
            name: "/intensity",
            value: intensity
        });
        socket.emit('sendOSC', {
            address: "/intensity",
            type: "f",
            value: intensity
        });
    }
}

drawIncrement = 0.00125;
// log("ms");