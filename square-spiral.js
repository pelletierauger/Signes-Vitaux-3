drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.035 + 10;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        x = sin(tan(i * 24.9 + t * 1e3) + i * 1e-10 + t * 1e-1) + sin(i * 1.5e-4 + t * 1e5) * i * 0.00005;
        y = cos(tan(i * 24.9 + t * 1e3) + i * 1e-10 + t * 1e-1) + cos(i * 1.5e-4 + t * 1e5) * i * 0.00015
        //         x *= sin(t * 50 * cos(y * 0.002));
        //         x *= cos(fx * fy * 0.001) * sin(x + t * 20);
        //         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x += sin(fx * 0.4) * 2;
        y += sin(fy * 0.4) * 2;
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.15, y * 0.8 * 0.15 - 0.11, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}





drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.035 + 1;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        x = sin(tan(i * 24.9 + t * 1e2) + i * 1e-9 + t * 1e5) * i * 0.00005;
        y = cos(tan(i * 24.9 + t * 1e2) + i * 1e-9 + t * 1e5) * i * 0.00015
//        x *= sin(t * 50 * cos(y * 0.002));
//                 x *= cos(fx * fy * 0.001) * sin(x + t * 20000);
        //         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x += sin((fx + fy * 1 * sin(t * 1e4)) * 0.4) * 0.5 * sin(i * 1e-4);
        y += sin((fy + fy * 1 * sin(t * 1e4)) * 0.4) * cos(i * 1e-3) * 0.5 * sin(i * 1e-4);
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.25, y * 0.8 * 0.25 - 0.0, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}



drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.00005 + 10;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        x = sin(tan(i * 25 + t * 1e4) * cos(fx * 1e-1 + i * 1e-4) + i * 1e-5 + t * 1e2) * i * 0.00005 * 1.5;
        y = cos(tan(i * 25 + t * 1e4) * cos(fx * 1e-1 + i * 1e-4) + i * 1e-5 + t * 1e2) * i * 0.00015 * 1.5;
        //         x *= sin(t * 50 * cos(y * 0.002));
        //         x *= cos(fx * fy * 0.001) * sin(x + t * 20);
        //         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x += sin(fx * 1.5) * 0.5;
        y += sin(fy * 1.5) * 0.5;
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.15, y * 0.8 * 0.15 - 0.11, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}


drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.00005 + 10;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        x = sin(tan(i * 25 + t * 1e4) * cos(fx * 1e-1 + i * 1e-4) * sin(i * 2e-5) + i * 1e-5 + t * 1e2) * i * 0.00005 * 1.5;
        y = cos(tan(i * 25 + t * 1e4) * cos(fx * 1e-1 + i * 1e-4) * sin(i * 2e-5) + i * 1e-5 + t * 1e2) * i * 0.00015 * 1.5;
        //         x *= sin(t * 50 * cos(y * 0.002));
        //         x *= cos(fx * fy * 0.001) * sin(x + t * 20);
        //         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x += sin(fx * 1.5) * 0.5 + cos(fx * 0.1);
        y += sin(fy * 1.5) * 0.5 + cos(fx * 0.1);
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.18 - 0.5, y * 0.8 * 0.15 - 0.19, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}



drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.00005 + 10;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        x = sin(tan(i * 25 + t * 1e4) * cos(fx * 1e-4 + i * 1e-4) * sin(i * 2e-5) + i * 1e-5 + t * 11.4) * i * 0.00005 * 1.5;
        y = cos(tan(i * 25 + t * 1e4) * cos(fx * 1e-4 + i * 1e-4) * sin(i * 2e-5) + i * 1e-5 + t * 11.4) * i * 0.00015 * 1.5;
        //         x *= sin(t * 50 * cos(y * 0.002));
        //         x *= cos(fx * fy * 0.001) * sin(x + t * 20);
        //         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x += sin(fx * 1.5) * 0.5 + cos(fx * 0.1);
        y += sin(fy * 1.5) * 0.5 + cos(fx * 0.1);
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.18 - 0.5, y * 0.8 * 0.15 - 0.19, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}



drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.00005 + 10;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        x = sin(tan(i * 25 + t * 1e4) * pow(cos(fx * 1e-1 + i * 1e-4), -1) * sin(i * 2e-5) + i * 1e-5 + t * 11.4) * i * 0.00005 * 1.5;
        y = cos(tan(i * 25 + t * 1e4) * pow(cos(fx * 1e-1 + i * 1e-4), -1) * sin(i * 2e-5) + i * 1e-5 + t * 11.4) * i * 0.00015 * 1.5;
        //         x *= sin(t * 50 * cos(y * 0.002));
        //         x *= cos(fx * fy * 0.001) * sin(x + t * 20);
        //         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x += sin(fx * 0.1) * 0.25 + cos(fx * 0.01);
        y += sin(fy * 0.1) * 0.25 + cos(fx * 0.01);
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.15 - 0.25, y * 0.8 * 0.15 - 0.19, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}



drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.00005 + 10;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        x = sin(tan(i * 24.9 + t * 1e4) * pow(cos(fx * 1e-4 + i * 1e-4), -1) * sin(i * 2e-5) + i * 1e-5 + t * 11.4) * i * 0.00005 * 1.5;
        y = cos(tan(i * 24.9 + t * 1e4) * pow(cos(fx * 1e-4 + i * 1e-4), -1) * sin(i * 2e-5) + i * 1e-5 + t * 11.4) * i * 0.00015 * 1.5;
        //         x *= sin(t * 50 * cos(y * 0.002));
        //         x *= cos(fx * fy * 0.001) * sin(x + t * 20);
        //         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
//         x += sin(fx * 0.01) * 0.25 + cos(fx * 0.01);
//         y += sin(fy * 0.01) * 0.25 + cos(fx * 0.01);
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.15, y * 0.8 * 0.15, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}




drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.00005 + 10;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        let ax = pow(cos(fx * 1e-4 + i * 1e-4), -1);
        let ay = pow(cos(fx * 1e-4 + i * 1e-4), -1);
        let aax = 0.5 - ax;
        let aay = 0.5 - ay;
        x = sin(tan(i * 24.9 + t * 1e-1) * aax * sin(i * 1e-10 + ax * 0.35) + i * 1e-5 + t * 11e4) * i * 0.00005 * 1.5;
        y = cos(tan(i * 24.9 + t * 1e-1) * aay * sin(i * 1e-10 + ax * 0.35) + i * 1e-5 + t * 11e4) * i * 0.00015 * 1.5;
        //         x *= sin(t * 50 * cos(y * 0.002));
        //         x *= cos(fx * fy * 0.001) * sin(x + t * 20);
        //         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x *= sin(fx * 0.05) + cos(fy * 0.05);
        y *= sin(fy * 0.05) + cos(fy * 0.05);
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.15, y * 0.8 * 0.15, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}



drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.00005 + 0;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 60000; i += 1) {
        let ax = pow(cos(fx * 1e-2 + i * 1e-4), -1);
        let ay = pow(cos(fx * 1e-2 + i * 1e-4), -1);
        let aax = 0.5 - ax;
        let aay = 0.5 - ay;
        let bx = tan(i * 1e-10 + ax * 0.85);
        let by = tan(i * 1e-10 + ax * 0.85);
        x = sin(tan(i * 1e-1 + t * 1e-2 * i) + t * 11e4) * i * 0.00005 * 1.5;
        y = cos(tan(i * 1e-1 + t * 1e-2 * i) + t * 11e4) * i * 0.00015 * 1.5;
        //         x *= sin(t * 50 * cos(y * 0.002));
//                 x += cos(fx * fy * 0.001) * sin(x + t * 20);
//                 y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x += tan(fx * 5e-3) * 100;
        y += tan(fy * 5e-3) * 100;
        fx = x;
        fy = y;
        //         x += (Math.random() - 0.5) * 0.00005;
        //         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.125;
        y += yOffset * 0.125;
        vertices.push(x * 1.5 * 0.15, y * 0.8 * 0.15, 0.0);
    }
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 60000);
}