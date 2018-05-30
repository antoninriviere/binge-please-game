uniform float uTime;
uniform float uVisibility;
uniform vec3 uColor;
varying float intensity;
void main()
{
	vec3 glow = uColor * intensity * min(0.5, pow( sin(uTime), 2.0 ));
    gl_FragColor = vec4( glow, uVisibility );
}
