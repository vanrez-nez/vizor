precision highp float;

varying vec2 v_uv;
uniform float u_time;
uniform sampler2D u_texture;

void main() {
  vec2 uv = v_uv;
  vec4 color = texture2D(u_texture, uv).rgba;
  // color += clamp(sin(u_time), 0.0, 1.0);
  gl_FragColor = color;
}
