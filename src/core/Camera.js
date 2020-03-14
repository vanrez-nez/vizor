import Object3D from "./Object3D";
import { toRadians } from "../utils/MathUtils";
import Mat4 from "../math/Mat4";

export default class Camera extends Object3D {
  constructor(gl, {
    type = 'perspective',
    fov = 50,
    near = 0.1,
    far = 2000,
    aspect = 1
  }) {
    super();
    this.type = type;
    this.fov = fov;
    this.near = near;
    this.far = far;
    this.aspect = aspect;
    this.zoom = 1;
    this.projectionMatrix = new Mat4();
    this.projectionMatrixInverse = new Mat4();
    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const { projectionMatrix, fov, far, near, zoom } = this;
    const top = near * Math.tan(toRadians(fov * 0.5)) / zoom;
    const height = 2 * top;
    const width = aspect * height;
    const left = -0.5 * width;
    const right = left + width;
    const bottom = top - height;
    projectionMatrix.fromPerspective(left, right, top, bottom, near, far);
  }
}