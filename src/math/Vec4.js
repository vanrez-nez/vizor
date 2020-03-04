export default class Vec4 {
  constructor(x, y, z, w) {
    this.set(x, y, z, w);
  }

  set(x, y, w, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
    return this;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  }

  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;
    return this;
  }

  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    this.w /= v.w;
    return this;
  }

  addScalar(v) {}

  subScalar(v) {}

  multiplyScalar(scalar) {}

  divideScalar(scalar) {}

  copy(v) {
    return this.set(v.x, v.y, v.z, v.w);
  }

  equals(v) {
    return (
    this.x === v.x &&
    this.y === v.y &&
    this.z === v.z &&
    this.w === v.w );
  }

  lerp(v, alpha) {
    this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;
		return this;
  }
}