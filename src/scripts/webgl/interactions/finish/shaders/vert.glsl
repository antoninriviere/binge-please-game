#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float uTime;
uniform float uPower;
uniform float uAmp;

varying vec2 vUv;
varying vec3 vPos;
varying float vDisplacement;

void main() {
vUv = uv;
vPos = position;

vec2 uv	= vUv;
uv *= 1.95;

    float displacement = uPower + snoise3( vec3( uv.x - uTime * 0.001, uv.x * -uv.y + uTime * 0.008, uTime * 0.05 ) ) * 0.5;

vDisplacement = displacement;

vec3 animatedPosition = position + normal * (uAmp * displacement);
gl_Position = projectionMatrix * modelViewMatrix * vec4( animatedPosition, 1.0 );
}
