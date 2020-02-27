precision highp float;

varying vec2 v_uv;
uniform float u_float;
uniform sampler2D u_texture;

void main() {
  vec3 color = texture2D(u_texture, v_uv).rgb;
  color *= u_float;
  gl_FragColor = vec4(color, 1.0);
}
