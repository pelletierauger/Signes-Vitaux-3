

gl.enable(gl.BLEND);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
vertex_buffer = gl.createBuffer();
vertices = [];

setDotsShaders = function() {
    var vertCode = `
    // beginGLSL
    attribute vec3 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    void main(void) {
        gl_Position = vec4(coordinates, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        gl_PointSize = 50.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
    }
    // endGLSL
    `;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // fragment shader source code
    var fragCode = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // vec2 uv = gl_PointCoord.xy / vec2(1600, 1600);
        // float d = length(uv - center);
        // vec2 pos = myposition;
        vec2 uv = gl_FragCoord.xy / vec2(2560, 1600);
        // uv.x = uv.x + 1.0;
        uv = uv * 2.0;
        uv = uv + 0.5;
        // uv = uv * 1.0;
        float ALPHA = 0.75;
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float dist_squared = dot(pos, pos);
        float alpha;
        if (dist_squared < 0.25) {
            alpha = ALPHA;
        } else {
            alpha = 0.0;
        }
        alpha = smoothstep(0.0015, 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        gl_FragColor = vec4(1.0, 0.2 - dist_squared, 0.0 + alpha * 120., (0.25 - dist_squared * 3.0 - (rando * 0.1)) * 0.25 + alpha) * 1.25;
//         gl_FragColor = vec4(1.0, 1.0 - dist_squared * 1.0, 0.0, 0.35 - dist_squared - (rando * 0.2));
        // gl_FragColor = vec4(d * 0.001, uv.x, 0.0, 0.25);
    }
    // endGLSL
    `;
    // vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to store
    // the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
}


drawDots = function() {
    vertices = [];
    let xOffset = (noise(frameCount * 0.01) - 0.5) * 0.75;
    let yOffset = (noise((frameCount + 100) * 0.01) - 0.5) * 0.75;
    let t = drawCount * 0.35 + 870;
    let fx = 1;
    let fy = 1;
    let x = 1;
    let y = 1;
    for (let i = 0; i < 30000; i += 1) {
        x = sin(tan(i * 25 + t) + i * t * 0.0000001) * i * 0.00005;
        y = cos(tan(i * 25 + t) + i * t * 0.0000001) * cos(t + i * 0.0002) * i * 0.00015;
//         x *= sin(t * 50 * cos(y * 0.002));
//         x *= cos(fx * fy * 0.001) * sin(x + t * 20);
//         y *= cos(fx * fy * 0.001) * cos(x + t * 20);
        x += sin(fx * 0.12) * 5;
        y += sin(fy * 0.12) * 5;
        fx = x;
        fy = y;
//         x += (Math.random() - 0.5) * 0.00005;
//         y += (Math.random() - 0.5) * 0.00005;
        x += xOffset * 0.25;
        y += yOffset * 0.25;
        vertices.push(x * 1.5 * 0.235, y * 0.8 * 0.235 - 0.25, 0.0);
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
    gl.drawArrays(gl.POINTS, 0, 30000);
}


drawCount = 0;
drawIncrement = 0.00125;
draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // shader() sets the active shader with our shader
    // shader(shaderProgram);
    // texcoordShader.setUniform('time', frameCount);
    // rect gives us some geometry on the screen
    // rect(0, 0, width, height);
    // console.log("Drawing!");
//     setBGShaders();
//     gl.uniform1f(time, drawCount);
//     drawBG();
    if (drawCount == 0) {
        setDotsShaders();
    }
    drawDots();
//     setOverlayShaders();
//     gl.uniform1f(time, drawCount);
//     drawBG();
    drawCount += drawIncrement;
}