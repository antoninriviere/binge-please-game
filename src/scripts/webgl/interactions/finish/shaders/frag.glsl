uniform float uTime;
uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    vec4 texture = texture2D( uTexture, vUv );
    texture.a -= vDisplacement * 0.2;
    texture.rgb += uColor;
    gl_FragColor = texture;
}
