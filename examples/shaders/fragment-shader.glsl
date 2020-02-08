precision mediump float;

struct Struct {
  vec2 u_vec2a[2];
  vec4 u_vec4;
  vec3 u_vec3;
  vec2 u_vec2;
  bool u_bool;
  float u_float;
};

struct StructSingle {
  bool u_bool;
  float u_float[2];
};

uniform Struct u_struct[2];
uniform StructSingle u_struct_single;
uniform int u_int;
uniform bool u_bool;
uniform float u_float[2];
uniform vec4 u_vec4;
uniform vec3 u_vec3;
uniform vec2 u_vec2;
uniform mat2 u_mat2;
uniform vec4 u_vec4a[2];
uniform vec3 u_vec3a[2];
uniform vec2 u_vec2a[2];
uniform sampler2D u_sampler;

void main() {
  float c = 0.0;
  c += float(u_int);
  c += u_float[0];
  c += u_float[1];
  c += u_vec2.x;
  c += u_vec3.x;
  c += u_vec4.x;
  c += u_vec2a[0].x;
  c += u_vec3a[0].x;
  c += u_vec4a[1].y;
  c += u_vec4a[0].x;
  c += texture2D(u_sampler, u_vec2).r;
  c += u_struct[0].u_vec4.x;
  c += u_struct[0].u_vec3.x;
  c += u_struct[0].u_vec2.x;
  c += u_struct[0].u_float;
  c += u_struct[0].u_bool ? 1.0 : 0.0;
  c += u_struct[0].u_vec2a[0].x;
  c += u_struct_single.u_float[1];
  c += u_struct[1].u_vec2a[1].x;
  gl_FragColor = vec4(vec3(c), 1.0);
}