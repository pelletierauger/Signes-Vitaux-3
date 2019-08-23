// beginGLSL

drawCount = 20;
logJavaScriptConsole(drawIncrement);
drawIncrement = 0.0000125;
// drawIncrement *= 2;
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
vec3 CircleRGB(vec2 uv, vec2 p, float r, float blur, vec3 col) {
    float d = length(uv - p); 
    float c = smoothstep(r, r - blur, d); 
    return col * c;
}
vec3 InvCircleRGB(vec2 uv, vec2 p, float r, float blur, vec3 col) {
    float d = length(p - uv); 
    float c = smoothstep(r - blur, r, d); 
    return col * c;
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
    float d = length(uv);
    float t = time * 0.125 * 0.06125 * 0.5;
    t *= 2.;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
//     uv.x 
//     uv *= 1.5;
    for (int i = 0; i < 10; i += 1) {
      float s = float(i) + 1.0;
      // Spidery
      // float e = circ(0.0025 * s, 10.0 * (4.0 * s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Classic
      // float e = circ(0.0025 * s, 10000.0 * (4.0 / s * 0.05), uv.x, uv.y, 1.0 - (s * 0.25));
      // Spidery 2
      float e = circ(0.5 * s, 2.0 - (s * -0.15), uv.x, uv.y, 1.0 - (s * 0.25));
      c = c + e;
    }
    c = sin(c * 0.5) + 1.0 * 2.0;
    float c2 = cos(c * 0.95) + 1.0 * 1.;
    
    
//     float c = d;
//     if (d < 0.3) c = 1.; else c = 0.;
    float r = 0.3;
//     c = smoothstep(r, r - 0.1, d);
//     c = c - smoothstep(r * 0.5, r * 0.5 - 0.1, d);
    vec2 p = vec2(1.0, -1.4);
    vec2 p2 = vec2(0.1 * sin(t * 100.), 0.1 * cos(t * 100.)) * 0.4;
    vec2 p3 = vec2(0.1 * sin(t * 50.), 0.1 * cos(t * 50.)) * 0.4;
    float siz = sin(t * 100.);
    float siz2 = sin(t * 50.);
    p2 = vec2(0.0, 0.0);
    vec3 col = CircleRGB(uv, p2, 1.9, 0.2, vec3(1., 1.4, 1.0));
    col.r *= sin(length(uv - p) * (6. + sin(1. * 20.) * 0.0001));
    col.r += abs(sin(length(uv - p) * (0.1 + sin(1. * 2.) * 0.001)) * 5.);
//     col.g *= sin(length(uv - p) * (6. + sin(1. * 20.) * 0.01));
    vec2 newV = (uv + tan(uv.y * 3.)) - (p + sin(uv.x * 3.));
    newV += cos(sin(uv * 20.));
//     
//     lignes contours
//     newV.x *= cos(uv.y * sin(t * 100.) * 100.) * 100.;
//     
//     col *= sin(atan(newV.x, newV.y));
      col *= sin(sin(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + sin(t * 10.) * 100.);
      col *= sin(cos(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + cos(t * 10.) * 100.);
      col *= sin(sin(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + cos(t * 10.) * 100.);
//col -=  CircleRGB(uv, p2, 0.2, 0.2, vec3(1.0, 1.0, 1.0));
//     col = max(col, 0.);
//col += CircleRGB(uv, p2, 0.5, 0.1, vec3(0.2, 0.0, 0.8));
    col += CircleRGB(uv, p2, 0.4, 0.2, vec3(0.0, 0.4, 1.0));
            col += CircleRGB(uv, p2, 0.5, 0.2, vec3(0.5, 0.7, 0.0) * 0.75);
//             col += CircleRGB(uv, p2, 0.5, 0.2, vec3(0.5, 0.7, 0.0));
//     col -= InvCircleRGB(uv, p2, 0.6, 0.2, vec3(1.5, 1.7, 1.0));
//     float rando = rand(uvf) * 0.1;
//     col.r -= rando * 1.;
     col.g *= 0.5;
    float rando = rand(uv);
    // float c = 0.0;
    // gl_FragColor = vec4(1.0 - c * 0.5, 1.0 - c * 0.05, 0.5 - c, 1.0);
    // gl_FragColor = vec4(vec3(1.0 - c * 0.05 + (rando * 0.1)), 1.0);
    // float pix = 1.0 - c * 0.05 + (rando * 0.1);
    // float pix2 = 1.0 - c * 0.025 + (rando * 0.1);
    // gl_FragColor = vec4(pix, 0.25 - pix2, 0.75 - pix * 0.5, 1.0);
    // warm blue, purple and cyan
    float pix = 1.0 - c * 0.05 + (rando * 0.1);
    float pix2 = 1.0 - c * 0.045 + (rando * 0.1);
    vec3 finCol = vec3(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 1.);
    finCol -= col * 1.85;
    gl_FragColor = vec4(finCol, 1.0);
    // gl_FragColor = vec4(0.475 - c2, 0.125 - pix2, pix2 - 0.5, 1.0);
    // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);
}
`);




drawCount = 20;
logJavaScriptConsole(drawIncrement);
drawIncrement = 0.0000125;
// drawIncrement *= 2;
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
d = sin(d * sin(time * 10.) * 5000.);
  return d;
}
vec3 CircleRGB(vec2 uv, vec2 p, float r, float blur, vec3 col) {
    float d = length(uv - p); 
    float c = smoothstep(r, r - blur, d); 
    return col * c;
}
vec3 InvCircleRGB(vec2 uv, vec2 p, float r, float blur, vec3 col) {
    float d = length(p - uv); 
    float c = smoothstep(r - blur, r, d); 
    return col * c;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    float c = 0.0;
    vec2 center = uv - vec2(11., 11.);
    float loww = sin(length(center) * 0.1) * 10.;
    float d = length(uv);
    float t = time * 0.125 * 0.06125;
    uv.y += -0.25; 
    uv.x += -0.25; 
    uv *= 2.5;
    for (int i = 0; i < 10; i += 1) {
      float s = float(i) + 1.0;
      float e = circ(20.5 * s, 2.0 - (s * -0.15), uv.x, uv.y, 1.0 - (s * 0.025));
      c = c + e;
    }
    c = sin(c * 0.5) + 1.0 * 2.0;
    float c2 = cos(c * 0.95) + 1.0 * 1.;
    vec2 p = vec2(1.0, -1.4);
    vec2 p2 = vec2(0.0, 0.0);
    vec3 col = CircleRGB(uv, p2, 1.9, 0.2, vec3(1., 1.4, 1.0));
    col.r *= sin(length(uv - p) * (6. + sin(1. * 20.) * 0.0001));
    col.r += abs(sin(length(uv - p) * (0.1 + sin(1. * 2.) * 0.001)) * 5.);
    vec2 newV = (uv + tan(uv.y * 3.)) - (p + sin(uv.x * 3.));
    newV += cos(sin(uv * 20.));
    col *= sin(sin(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + sin(t * 10.) * 100.);
    col *= sin(cos(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + cos(t * 10.) * 100.);
    col *= sin(sin(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + cos(t * 10.) * 100.);
    col += CircleRGB(uv, p2, 0.4, 0.2, vec3(0.0, 0.4, 1.0));
    col += CircleRGB(uv, p2, 0.5, 0.2, vec3(0.5, 0.7, 0.0) * 0.75);
    col.g *= 0.5;
    float rando = rand(uv);
    float pix = 1.0 - c * 0.045 + (rando * 0.1);
    vec3 finCol = vec3(1.0 - c2 * 1.0 * loww, 1.5 - pix * 1.2, (1. - c2 * 0.5) * 1.);
    finCol -= col * 1.85;
    gl_FragColor = vec4(finCol, 1.0);
}
`);