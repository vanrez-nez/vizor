export default class Vec4 {
  constructor(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
  }

  add(v) {
    return VecFun.add(this, v, 4);
  }

  addScalar(scalar) {
    return VecFun.addScalar(out, scalar, 4);
  }

  addScaledVector(v, scale) {
    return VecFun.scaleAndAdd(out, v, scale, 4);
  }

  ceil() {
    return VecFun.ceil(out, 4);
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

  div(v) {
    return VecFun.div(this, v, 4);
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

  multiply(v) {
    return VecFun.mul(this, v, 4);
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

  sub(v) {
    return VecFun.sub(this, v, 4);
  }

  subScalar(scalar) {
    return VecFun.subScalar(this, scalar, 4);
  }



  applyMatrix4(m) {
    const { x, y, z, w } = this;
    const { elements: e } = m;
		this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
		this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
		this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
		return this;
  }

  clone() {
    return new Vec4(this.x, this.y, this.z, this.w);
  }

}