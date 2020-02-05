precision mediump float;
uniform vec4 u_vec4[2];
uniform vec4 u_vec4b[2];
uniform mat2 u_mat2;
uniform bool u_bool;
uniform sampler2D u_sampler;
uniform float u_float;

void main() {
  vec3 color = vec3(1.0, u_mat2[0].x, u_vec4[0].x + u_vec4b[1].x);
  
  gl_FragColor = vec4(color + u_float, 1.0);
}