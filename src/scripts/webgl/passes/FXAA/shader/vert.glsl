varying vec2 vUv;

varying vec2 vRgbNW;
varying vec2 vRgbNE;
varying vec2 vRgbSW;
varying vec2 vRgbSE;
varying vec2 vRgbM;

uniform vec2 uResolution;

#pragma glslify: texcoords = require(glsl-fxaa/texcoords.glsl)

void main() {
    vUv = uv;
    vec2 fragCoord = uv * uResolution;
    vec2 inverseVP = 1.0 / uResolution.xy;
    vRgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
    vRgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
    vRgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
    vRgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
    vRgbM = vec2(fragCoord * inverseVP);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
