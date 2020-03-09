import * as VecFun from './VecFun';

export default class Vec3 {
  constructor(x, y, z) {
    this.x = x || x;
    this.y = y || y;
    this.z = z || z;
  }

  add(v1, v2) {
    return VecFun.add(this, v2 || this, v1, 3);
  }

  addScalar(scalar) {
    return VecFun.addScalar(out, scalar, 3);
  }

  addScaledVector(v, scale) {
    return VecFun.scaleAndAdd(out, v, scale, 3);
  }

  ceil() {
    return VecFun.ceil(out, 3);
  }

  clamp(min, max) {
    return VecFun.clamp(this, min, max, 3);
  }

  clampLength(min, max) {
    return VecFun.clampLength(this, min, max, 3);
  }

  clampScalar(minScalar, maxScalar) {
    return VecFun.clampScalar(this, minScalar, maxScalar, 3);
  }

  copy(v) {
    return VecFun.copy(this, v, 3);
  }

  distanceTo(v) {
    return VecFun.distanceTo(this, v, 3);
  }

  distanceSquared(v) {
    return VecFun.distanceSquared(this, v, 3);
  }

  div(v1, v2) {
    if (v2) return VecFun.div(this, v1, v2, 3);
    return VecFun.div(this, this, v1, 3);
  }

  divScalar(scalar) {
    return VecFun.mulScalar(this, 1 / scalar, 3);
  }

  dot(v) {
    return VecFun.dot(this, v, 3);
  }

  equals(v) {
    return VecFun.equals(this, v, 3);
  }

  floor() {
    return VecFun.floor(this, 3);
  }

  length() {
    return VecFun.length(this, 3);
  }

  lengthSqrt() {
    return VecFun.lengthSqrt(this, 3);
  }

  lerp(v, alpha) {
    return VecFun.lerp(this, v, alpha, 3);
  }

  max(v) {
    return VecFun.max(this, v, 3);
  }

  manhattanDistance(v) {
    return VecFun.manhattanDistance(this, v, 3);
  }

  manhattanLength() {
    return VecFun.manhattanLength(this, 3);
  }

  min(v) {
    return VecFun.min(this, v, 3);
  }

  multiply(v1, v2) {
    return VecFun.mul(this, v2 || this, v1, 3);
  }

  multiplyScalar(scalar) {
    return VecFun.mulScalar(this, scalar, 3);
  }

  negate() {
    return VecFun.negate(this, 3);
  }

  normalize() {
    return VecFun.normalize(this, 3);
  }

  round() {
    return VecFun.round(this, 3);
  }

  set(x, y, z) {
    return VecFun.set(this, x, y, z, 0, 3);
  }

  setLength(length) {
    return VecFun.setLength(this, length, 3);
  }

  sub(v1, v2) {
    if (v2) return VecFun.sub(this, v1, v2, 3);
    return VecFun.sub(this, this, v1, 3);
  }

  subScalar(scalar) {
    return VecFun.subScalar(this, scalar, 3);
  }

  // angleTo() {}
  // applyEuler(euler) {}
  // applyAxisAngle(axis, angle) {}
  // applyQuaternion(quat) {}

  // applyNormalMatrix(mat) {}
  // project(camera) {}
  // unproject(camera) {}
  // transformDirection(mat4) {}
  // projectOnVector(v) {}
  // projectOnPlane(plane) {}
  // reflect(normal) {}

  // setFromSpherical(s) {}
  // setFromSphericalCoords() {}
  // setFromCylindrical(c) {}
  // setFromCylindricalCoords(radius, theta, y) {}
  // setFromMatrixScale(mat) {}
  // setFromMatrixColumn(mat, index) {}
  // setFromMatrix3Column(mat, index) {}


  applyMatrix4(mat4) {
    const { x, y, z } = this;
    const { elements: e } = mat4;
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return this;
  }

  applyMatrix3(mat3) {
    const { x, y, z } = this;
    const { elements: e } = mat3;
    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;
    return this;
  }

  cross(v1, v2) {
    const a = v2 ? v1 : this;
    const b = v2 ? v2 : v1;
    const { x: ax, y: ay, z: az } = a;
    const { x: bx, y: by, z: bz } = b;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }

  clone() {
    return new Vec3(this.x, this.y, this.z);
  }
}