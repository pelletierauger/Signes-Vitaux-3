// beginGLSL
drawCount = 8;
logJavaScriptConsole(drawIncrement);
drawIncrement = 0.000025;

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
float circ(float speed, float size, float vx, float vy, float dist) {
//  float x = cos(time * speed) * dist * 0.012 - 0.425;
//  float y = sin(time * speed) * dist * 0.012 - 0.25;
    float t = time;
    float x = 100. * cos(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.425;
    float y = 100. * sin(t * speed * 1.0) * dist * (sin(t)) * 0.12 - 0.25;
//  float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
//  float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
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
    // float d2 = 1.0 / length(v * 25.0);
    float c = 0.0;
    float t = time;
    vec2 center = uv - vec2(11., 11.);
    float loww = sin(length(center) * 0.1) * 10.;
    // float d = circ(0.1, 25.0, uv.x, uv.y, 1.0);
    // float d2 = circ(0.07, 15.0, uv.x, uv.y, 0.5);
    for (int i = 0; i < 10; i += 1) {
        float s = float(i) + 1.0;
        float e = circ(0.5 * s, 2.0 - (s * -0.15), uv.x, uv.y, 1.0 - (s * 0.25));
        c = c + e;
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
    vec2 p = vec2(1.0, -1.4);
    vec2 p2 = vec2(0.5, 0.25);
    vec3 col = CircleRGB(uv, p2, 0.19, 0.2, vec3(1.0, 1.4, 1.0));
    col.r *= sin(length(uv - p) * 6.);
//     col.r += abs(sin(length(uv - p) * (0.1 + sin(1. * 2.) * 0.001)) * 5.);
vec2 newV = (uv + tan(uv.y * 3.)) - (p + sin(uv.x * 3.));
//     col *= sin(atan(newV.x, newV.y));
//       col += sin(sin(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + sin(t * 10.) * 100.) * 0.1;
      col *= abs(sin(cos(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + cos(t * 10.) * 100.));
      col *= abs(sin(sin(atan(newV.x, newV.y) * (sin(t * 100.) * 1.)) * 10. + cos(t * 10.) * 100.));
    float pix = 1.0 - c * 0.05 + (rando * 0.1);
    float pix2 = 1.0 - c * 0.045 + (rando * 0.1);
    vec3 finCol = vec3(1.0 - c2 * 1.0 * loww, 1.5 - pix2 * 1.2, (1. - c2 * 0.5) * 1.);
    finCol += col;
    vec3 sun = CircleRGB(uv, p2, 0.19, 0.2, vec3(2.0, 1.0, -1.0));
    finCol.r = max(sun.r, finCol.r);
    finCol.g = max(sun.g, finCol.g);
    gl_FragColor = vec4(finCol, 1.0);
    // gl_FragColor = vec4(0.475 - c2, 0.125 - pix2, pix2 - 0.5, 1.0);
    // gl_FragColor = vec4(vec3(d) + vec3(d2), 1.0);
}
`);