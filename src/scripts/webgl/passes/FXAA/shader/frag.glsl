varying vec2 vUv;

varying vec2 vRgbNW;
varying vec2 vRgbNE;
varying vec2 vRgbSW;
varying vec2 vRgbSE;
varying vec2 vRgbM;

uniform sampler2D uDiffuse;
uniform vec2 uResolution;

#pragma glslify: fxaa = require(glsl-fxaa/fxaa.glsl)

void main() {
    vec2 fragCoord = vUv * uResolution;
    gl_FragColor = fxaa(uDiffuse, fragCoord, uResolution, vRgbNW, vRgbNE, vRgbSW, vRgbSE, vRgbM);
}
