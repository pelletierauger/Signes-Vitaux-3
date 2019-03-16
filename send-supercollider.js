sendSuperCollider = function() {
//     console.log("Yeah");
    if (frameCount % 2 == 0) {
        intensity = Math.sin(drawCount);
        if ((intensity > 0) !== positive) {
            positive = (intensity > 0);
            console.log("Changed!");
            let har = (positive) ? 0 : -2;
//             socket.emit('supercollider', {
//                 name: "/har",
//                 value: har
//             });
            socket.emit('sendOSC', {
                address: "/har",
                type: "f",
                value: har
            });
        }
        // console.log(intensity);
        intensity = Math.abs(intensity);
        intensity = map(intensity, 0.007, 1, 0.005, 0.015);
        intensity = constrain(intensity, 0.005, 0.015);
        let loc = Math.floor(map(intensity, 0.005, 0.015, 400000, 350000));
//         socket.emit('supercollider', {
//             name: "/loc",
//             value: loc
//         });
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

// drawIncrement = 0.01;
// log("ms");