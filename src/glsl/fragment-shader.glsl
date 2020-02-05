precision mediump float;
uniform vec4 u_vec4arr[2];
uniform vec4 u_vec4;
uniform mat2 u_mat2;
uniform bool u_bool;
uniform int u_int;
uniform sampler2D u_sampler;
uniform float u_float;

void main() {
  vec3 color = vec3(1.0, u_mat2[0].x, u_vec4arr[0].x + u_vec4.x);
  color.x += float(u_int);
  gl_FragColor = vec4(color + u_float, 1.0);
}