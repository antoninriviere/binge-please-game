#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uDisplacementFactor;
uniform float uDistortion;
uniform float uDistortion2;
uniform float uSpeed;

varying vec2 vUv;

float circle(vec2 uv, vec2 pos, float rad) {
    float d = length(pos - uv) - rad;
    float innerRad = rad * 0.7;
    float range = rad - innerRad;
    float t = clamp((d - innerRad) / range, 0., 1.);
    return 1.0 - pow(t, 3.);
}

void main() {

    float alpha = circle(gl_FragCoord.xy, uCenter, uRadius);

    vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

    float ty = uTime * uSpeed;
    float yt = vUv.y - ty;
    float offset = snoise2(vec2(yt * 3.0, 5.0)) * 0.15;
    offset = offset * uDistortion * offset * uDistortion * offset;
    offset += snoise2(vec2(yt * 50.0, 0.0)) * uDistortion2 * 0.001;

    vec2 dUv = vec2(fract(vUv.x + offset), fract(vUv.y));
    vec2 uv = mix(vUv, dUv, pow(sin(uDisplacementFactor), 2.0));
    // vec2 uv = mix(vUv, dUv, 1.);

    vec4 textureColor = texture2D(uTexture, uv);

    // gl_FragColor = finalTextureColor;
    gl_FragColor = mix(black, textureColor, alpha);
}
