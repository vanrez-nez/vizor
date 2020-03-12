import * as VecFun from './VecFun';

export default class Vec4 {
  constructor(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
  }

  add(v1, v2) {
    return VecFun.add(this, v2 || this, v1, 4);
  }

  addScalar(scalar) {
    return VecFun.addScalar(this, scalar, 4);
  }

  addScaledVector(v, scale) {
    return VecFun.scaleAndAdd(this, v, scale, 4);
  }

  ceil() {
    return VecFun.ceil(this, 4);
  }

  clamp(min, max) {
    return VecFun.clamp(this, min, max, 4);
  }

  clampLength(min, max) {
    return VecFun.clampLength(this, min, max, 4);
  }

  clampScalar(minScalar, maxScalar) {
    return VecFun.clampScalar(this, minScalar, maxScalar, 4);
  }

  copy(v) {
    return VecFun.copy(this, v, 4);
  }

  distanceTo(v) {
    return VecFun.distanceTo(this, v, 4);
  }

  distanceSquared(v) {
    return VecFun.distanceSquared(this, v, 4);
  }

  div(v1, v2) {
    if (v2) return VecFun.div(this, v1, v2, 4);
    return VecFun.div(this, this, v1, 4);
  }

  divScalar(scalar) {
    return VecFun.mulScalar(this, 1 / scalar, 4);
  }

  dot(v) {
    return VecFun.dot(this, v, 4);
  }

  equals(v) {
    return VecFun.equals(this, v, 4);
  }

  floor() {
    return VecFun.floor(this, 4);
  }

  length() {
    return VecFun.length(this, 4);
  }

  lengthSqrt() {
    return VecFun.lengthSqrt(this, 4);
  }

  lerp(v, alpha) {
    return VecFun.lerp(this, v, alpha, 4);
  }

  max(v) {
    return VecFun.max(this, v, 4);
  }

  manhattanDistance(v) {
    return VecFun.manhattanDistance(this, v, 4);
  }

  manhattanLength() {
    return VecFun.manhattanLength(this, 4);
  }

  min(v) {
    return VecFun.min(this, v, 4);
  }

  multiply(v1, v2) {
    return VecFun.mul(this, v2 || this, v1, 4);
  }

  multiplyScalar(scalar) {
    return VecFun.mulScalar(this, scalar, 4);
  }

  negate() {
    return VecFun.negate(this, 4);
  }

  normalize() {
    return VecFun.normalize(this, 4);
  }

  round() {
    return VecFun.round(this, 4);
  }

  set(x, y, z, w) {
    return VecFun.set(this, x, y, z, w, 4);
  }

  setLength(length) {
    return VecFun.setLength(this, length, 4);
  }

  setScalar(scalar) {
    return VecFun.set(this, scalar, scalar, scalar, scalar, 4);
  }

  sub(v1, v2) {
    if (v2) return VecFun.div(this, v1, v2, 4);
    return VecFun.sub(this, this, v1, 4);
  }

  subScalar(scalar) {
    return VecFun.subScalar(this, scalar, 4);
  }

  // setAxisAngleFromQuaternion(quat) {}
  // setAxisAngleFromRotationMatrix(mat) {}

  applyMatrix4(m) {
    const { x, y, z, w } = this;
		this.x = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
		this.y = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
		this.z = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
		this.w = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
		return this;
  }

  clone() {
    return new Vec4(this.x, this.y, this.z, this.w);
  }

}