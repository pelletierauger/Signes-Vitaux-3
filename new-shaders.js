// -------------------------------------------//
// -----les-flaques-bleues--------------------//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  // float x = cos(time * speed) * dist * 0.012 - 0.425;
  // float y = sin(time * speed) * dist * 0.012 - 0.25;
  float x = cos(time * speed * 1000.0) * dist * (sin(time)) * 0.12 - 0.425;
  float y = sin(time * speed * 1000.0) * dist * (sin(time)) * 0.12 - 0.25;
  // float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
  // float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
  d = sin(sin(d * 0.1) * time * 0.1);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // float d2 = 1.0 / length(v * 25.0);
    float c = 0.0;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
    for (int i = 0; i < 100; i += 1) {
        float s = float(i) + 1.0;
        // Spidery
        // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
        // Classic
        // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
        // Spidery 2
        float e = circ(0.0000125 * s, 20.0 - (s * -0.0115), uv.x, uv.y, 1.0 - (s * 0.25));
    c = c + e;
    }
    c = sin(c * 0.5) + 1.0 * 2.0;
    float c2 = cos(c * 1.) + 1.0 * 1.;
//     c2 = sin(c2 * 3.);
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
    gl_FragColor = vec4(1.0 - c2 * 1.0, 1.15 - pix2 * 1.2, (1. - c2 * 0.5) * 1., 1.0);
    // gl_FragColor = vec4(0.475 - c2, 0.125 - pix2, pix2 - 0.5, 1.0);
    // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);
}
`);



// -------------------------------------------//
// -----les-flaques-bleues--------------------//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  float t = time;
  float x = cos(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.4;
  float y = tan(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
  d = sin(d * 0.1 * time * 0.05);
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
        float e = circ(0.00125 * s, 20.0 - (s * -0.0115), uv.x, uv.y, 1.0 - (s * 0.25));
    c = c + e;
    }
    c = sin(c * 0.5 * time * 0.005) + 1.0 * 2.0;
    float c2 = cos(c * 1.) + 1.025 * 1.;
//     c2 = sin(c2 * 3.);
    c2 = tan(c2);
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
    gl_FragColor = vec4(1.5 - pix2 * 1.2, 1.0 - c2 * 1.0 * loww, (1. - c2 * 0.5) * 0.7, 1.0);
}
`);





// -------------------------------------------//
// -----les-flaques-mauves--------------------//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  float t = time;
  float x = cos(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.4;
  float y = tan(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
  d = sin(d * 0.1 * time * 0.05);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // float d2 = 1.0 / length(v * 25.0);
//      uv = uv * vec2(cos(uv.y) - 25., cos(uv.x) * 10. + 15.);
//     uv.x = uv.x + cos(time) * 10.;
//     uv.y = uv.y + sin(time) * 10é;
    float t = time;
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
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
        float e = circ(sin(t * 0.001) * s, 2.0 - (s * -0.0115), uv.x, uv.y, 1.0 - (s * 0.25));
    c = c + e;
    }
    c = sin(c * 0.5 * time * sin(t) * 0.025) + 1.0 * 2.0;
    float c2 = cos(c * 1.) + 1.025 * 1.;
//     c2 = sin(c2 * 3.);
    c2 = tan(c2);
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
    gl_FragColor = vec4(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 0.7, 1.0);
}
`);





// -------------------------------------------//
// -----les-flaques-vertes, roses et bleues---//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  float t = time;
  float x = cos(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.4;
  float y = tan(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
  d = sin(d * 0.1 * time * 0.05);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // float d2 = 1.0 / length(v * 25.0);
//      uv = uv * vec2(cos(uv.y) - 25., cos(uv.x) * 10. + 15.);
//     uv.x = uv.x + cos(time) * 10.;
//     uv.y = uv.y + sin(time) * 10é;
    float t = time;
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
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
        float e = circ(sin(t * 0.001) * s, 2.0 - (s * sin(t * 5.)), uv.x, uv.y, 1.0 - (s * 0.25));
    c = c + e;
    }
    c = sin(c * 0.5 * time * sin(t) * 0.025) + 1.0 * 2.0;
    float c2 = cos(c * 1.) + 1.025 * 1.;
//     c2 = sin(c2 * 3.);
    c2 = tan(c2);
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
    gl_FragColor = vec4(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 0.7, 1.0);
}
`);




// -------------------------------------------//
// -----scintillements-verts, roses et bleus--//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  float t = time;
  float x = 0.05 * cos(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.4;
  float y = 0.05 * sin(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
  d = sin(d * 0.1 * time * 0.05);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // float d2 = 1.0 / length(v * 25.0);
//      uv = uv * vec2(cos(uv.y) - 25., cos(uv.x) * 10. + 15.);
//     uv.x = uv.x + cos(time) * 10.;
//     uv.y = uv.y + sin(time) * 10é;
    float t = sin(time * 0.005) * 100.;
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
    float loww = sin(length(center) * 0.01) * 10.;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
    for (int i = 0; i < 100; i += 1) {
        float s = float(i) + 1.0;
        // Spidery
        // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
        // Classic
        // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
        // Spidery 2
        float e = circ(t * 0.1 * s, 2.0 - (s * (10.)), uv.x, uv.y, 1.0 - (s * 0.25));
    c = c + e;
    }
    c = sin(c * 0.5 * t * 0.025) + 1.0 * 2.0;
    float c2 = cos(c * 1.) + 1.025 * 1.;
//     c2 = sin(c2 * 3.);
    c2 = tan(c2);
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
    gl_FragColor = vec4(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 0.7, 1.0);
}
`);




// -------------------------------------------//
// -----scintillements-verts, roses et bleus--//
// -------------------------------------------//
setBothShaders(`
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  float t = time;
  float x = 0.05 * cos(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.4;
  float y = 0.05 * sin(t * speed * 1.0) * dist * abs((sin(t))) * 1. - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size * 0.1);
//   d = sin(d * 0.1 * time * 0.5);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    // float d2 = 1.0 / length(v * 25.0);
//      uv = uv * vec2(cos(uv.y) - 25., cos(uv.x) * 10. + 15.);
//     uv.x = uv.x + cos(time) * 10.;
//     uv.y = uv.y + sin(time) * 10é;
    float t = sin(time * 0.005) * 100.;
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
    float loww = sin(length(center) * 0.01) * 10.;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
    for (int i = 0; i < 100; i += 1) {
        float s = float(i) + 1.0;
        // Spidery
        // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
        // Classic
        // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
        // Spidery 2
        float e = circ(t * 0.001 * s, 0.001 - (s * 10.), uv.x, uv.y, 1.0 - (s * 0.25));
    c = c + e;
    }
    c = sin(c * 0.5 * t * 0.0125) + 1.0 * 2.0;
    float c2 = cos(c * 0.89) + 1.025 * 1.;
//     c2 = sin(c2 * 3.);
    c2 = pow(tan(c2), 0.85) * 0.05;
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
    pix2 = pow(pix2, 1.6);
    gl_FragColor = vec4(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.3, (1. - c2 * 0.5) * 0.7, 1.0);
}
`);