import Object3D from "./Object3D";

export default class Mesh extends Object3D {
  constructor(gl, {
    geometry,
    shader,
  }) {
    this.geometry = geometry;
    this.shader = shader;
  }
}