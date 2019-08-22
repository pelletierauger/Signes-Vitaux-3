// beginGLSL

drawCount = 3;
drawIncrement = 0.0000125;
// -------------------------------------------//
//-----puddle-2---entrelacs-gigantesques-3----//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
  float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
  return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  // float x = cos(time * speed) * dist * 0.012 - 0.425;
  // float y = sin(time * speed) * dist * 0.012 - 0.25;
  float t = time;
  float x = 100. * cos(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.425;
  float y = 100. * sin(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.25;
  // float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
  // float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
    d = sin(d * sin(time * 2.1) * 2000.);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // float d2 = 1.0 / length(v * 25.0);
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
    uv *= 2.;
    uv.x -= 0.5;
    uv.y -= 0.25;
    float loww = sin(length(center) * 0.1) * 10.;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
    for (int i = 0; i < 100; i += 1) {
      float s = float(i) + 1.0;
      // Spidery
      // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Classic
      // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Spidery 2
      float e = circ(1.5 * s, 4.0 - (s * -20.15), uv.x, uv.y, 1.0 - (s * 0.0125));
      c = c + e * 0.5;
    }
    c = sin(c * 10.5) + 1. * 2.0;
    float c2 = cos(c * 0.95) + 1.0 * 1.;
    float rando = rand(vec2(uv.x, uv.y));
    // float c = 0.0;
    // gl_FragColor = vec4(1.0 - c * 0.5, 1.0 - c * 0.05, 0.5 - c, 1.0);
    // gl_FragColor = vec4(vec3(1.0 - c * 0.05 + (rando * 0.1)), 1.0);
    // float pix = 1.0 - c * 0.05 + (rando * 0.1);
    // float pix2 = 1.0 - c * 0.025 + (rando * 0.1);
    // gl_FragColor = vec4(pix, 0.25 - pix2, 0.75 - pix * 0.5, 1.0);
    // warm blue, purple and cyan
    float pix = 1.0 - c * 0.05 + (rando * 0.1);
    float pix2 = 1.0 - c * 0.045 + (rando * 0.1);
    gl_FragColor = vec4(1.5 - c2 * 2.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 1., 1.0);
    // gl_FragColor = vec4(0.475 - c2, 0.125 - pix2, pix2 - 0.5, 1.0);
    // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);
}
`);


drawCount = 10;
drawIncrement *= 10;

// -------------------------------------------//
//-----puddle-2---entrelacs-gigantesques-3----//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
  float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
  return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  // float x = cos(time * speed) * dist * 0.012 - 0.425;
  // float y = sin(time * speed) * dist * 0.012 - 0.25;
  float t = time;
  float x = 100. * cos(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.425;
  float y = 100. * sin(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.25;
  // float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
  // float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
d = sin(d * sin(time * 10.) * 20000.);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    float t = time;
    // float d2 = 1.0 / length(v * 25.0);
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
    float loww = sin(length(center) * 0.1) * 10.;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
//     uv.x += 10.5 + sin(t * 100.);
//     uv.y += 2.5;
    uv *= 1000.1;
    for (int i = 0; i < 100; i += 1) {
      float ii = float(i);
      float s = float(i) * 0.5 + 50.0 * sin(uv.y * 0.01 + uv.x * 0.01);
      // Spidery
      // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Classic
      // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Spidery 2
      float e = circ(1.125 * s * cos(uv.x * 0.00025) * sin(uv.y * 0.00025) * sin(10. + time * 10.), time * (s * -0.0015), uv.x, uv.y, 1.0 - (s * 0.125));
      c = c + e * 0.5;
    }
    c = sin(c * 0.5) + 1.0 * 2.0;
    float c2 = cos(c * 0.95) + 1.0 * 1.;
    float rando = rand(vec2(uv.x, uv.y));
    // float c = 0.0;
    // gl_FragColor = vec4(1.0 - c * 0.5, 1.0 - c * 0.05, 0.5 - c, 1.0);
    // gl_FragColor = vec4(vec3(1.0 - c * 0.05 + (rando * 0.1)), 1.0);
    // float pix = 1.0 - c * 0.05 + (rando * 0.1);
    // float pix2 = 1.0 - c * 0.025 + (rando * 0.1);
    // gl_FragColor = vec4(pix, 0.25 - pix2, 0.75 - pix * 0.5, 1.0);
    // warm blue, purple and cyan
    float pix = 1.0 - c * 0.05 + (rando * 0.1);
    float pix2 = 1.0 - c * 0.045 + (rando * 0.1);
    gl_FragColor = vec4(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 1., 1.0);
    // gl_FragColor = vec4(0.475 - c2, 0.125 - pix2, pix2 - 0.5, 1.0);
    // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);
}
`);


// -------------------------------------------//
//-----puddle-2---cornes----------------------//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
  float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
  return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  // float x = cos(time * speed) * dist * 0.012 - 0.425;
  // float y = sin(time * speed) * dist * 0.012 - 0.25;
  float t = time;
  float x = 100. * cos(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.425;
  float y = 100. * sin(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.25;
  // float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
  // float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
d = sin(d * sin(time * 10.) * 20000.);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    float t = time;
    // float d2 = 1.0 / length(v * 25.0);
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
    float loww = sin(length(center) * 0.1) * 10.;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
//     uv.x += 10.5 + sin(t * 100.);
    uv.x += -20.4;
    uv.y += -0.15;
    uv *= 1000.1;
    for (int i = 0; i < 100; i += 1) {
      float ii = float(i);
      float s = float(i) * 0.5 + 50.0 * sin(uv.y * 0.01 * sin(uv.x * 0.1) + uv.x * -0.01);
      // Spidery
      // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Classic
      // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Spidery 2
      float e = circ(1.125 * s * cos(uv.x * 0.00025) * sin(uv.y * 0.00025) * sin(10. + time * 10.), time * (s * -0.0015), uv.x, uv.y, 1.0 - (s * 0.125));
      c = c + e * 0.5;
    }
    c = sin(c * 0.5) + 1.0 * 2.0;
    float c2 = cos(c * 0.95) + 1.0 * 1.;
    float rando = rand(vec2(uv.x, uv.y));
    // float c = 0.0;
    // gl_FragColor = vec4(1.0 - c * 0.5, 1.0 - c * 0.05, 0.5 - c, 1.0);
    // gl_FragColor = vec4(vec3(1.0 - c * 0.05 + (rando * 0.1)), 1.0);
    // float pix = 1.0 - c * 0.05 + (rando * 0.1);
    // float pix2 = 1.0 - c * 0.025 + (rando * 0.1);
    // gl_FragColor = vec4(pix, 0.25 - pix2, 0.75 - pix * 0.5, 1.0);
    // warm blue, purple and cyan
    float pix = 1.0 - c * 0.05 + (rando * 0.1);
    float pix2 = 1.0 - c * 0.045 + (rando * 0.1);
    gl_FragColor = vec4(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 1., 1.0);
    // gl_FragColor = vec4(0.475 - c2, 0.125 - pix2, pix2 - 0.5, 1.0);
    // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);
}
`);



// -------------------------------------------//
//-----puddle-2---cornes----------------------//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
  float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
  return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  // float x = cos(time * speed) * dist * 0.012 - 0.425;
  // float y = sin(time * speed) * dist * 0.012 - 0.25;
  float t = time;
  float x = 100. * cos(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.425;
  float y = 100. * sin(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.25;
  // float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
  // float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
d = sin(d * sin(time * 10.) * 20000.);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    float t = time;
    // float d2 = 1.0 / length(v * 25.0);
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
    float loww = sin(length(center) * 0.1) * 10.;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
//     uv.x += 10.5 + sin(t * 100.);
    uv.x += 1.15;
    uv.y += -0.125;
    uv *= 1000.;
    for (int i = 0; i < 100; i += 1) {
      float ii = float(i);
      float s = float(i) * 0.5 + 50.0 * sin(uv.y * 0.005 * sin(uv.x * 0.05) + uv.x * -0.005);
      // Spidery
      // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Classic
      // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Spidery 2
      float e = circ(1.125 * s * cos(uv.x * 0.00025) * sin(uv.y * 0.00025) * sin(10. + time * 10.), time * (s * -0.0015), uv.x, uv.y, 1.0 - (s * 0.125));
      c = c + e * 0.5;
    }
    c = sin(c * 0.5) + 1.0 * 2.0;
    float c2 = cos(c * 0.95) + 1.0 * 1.;
    float rando = rand(vec2(uv.x, uv.y));
    // float c = 0.0;
    // gl_FragColor = vec4(1.0 - c * 0.5, 1.0 - c * 0.05, 0.5 - c, 1.0);
    // gl_FragColor = vec4(vec3(1.0 - c * 0.05 + (rando * 0.1)), 1.0);
    // float pix = 1.0 - c * 0.05 + (rando * 0.1);
    // float pix2 = 1.0 - c * 0.025 + (rando * 0.1);
    // gl_FragColor = vec4(pix, 0.25 - pix2, 0.75 - pix * 0.5, 1.0);
    // warm blue, purple and cyan
    float pix = 1.0 - c * 0.05 + (rando * 0.1);
    float pix2 = 1.0 - c * 0.045 + (rando * 0.1);
    gl_FragColor = vec4(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 1., 1.0);
    // gl_FragColor = vec4(0.475 - c2, 0.125 - pix2, pix2 - 0.5, 1.0);
    // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);
}
`);