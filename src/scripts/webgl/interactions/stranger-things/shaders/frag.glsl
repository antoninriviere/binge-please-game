uniform float uTime;
uniform sampler2D uTexture;
uniform sampler2D uMap;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uParallaxe;
varying vec2 vUv;

void main() {
    float map = texture2D(uMap, vUv).r;

    // parallaxe value
    float parallaxe = 0.05;
    vec2 parPos = vec2(uParallaxe * uMouse.x, uParallaxe * uMouse.y);

    vec4 color = texture2D(uTexture, vec2(vUv.x + parPos.x * map, -parPos.y * map + vUv.y));

    gl_FragColor = color;
}
