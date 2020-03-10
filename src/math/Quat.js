import * as VecFunc from "./VecFun";
const { cos: Cos, sin: Sin, sqrt: Sqrt } = Math;
const Noop = () => {};

export default class Quat {
  constructor(x, y, z, w) {
    this._x = x || 0;
    this._y = y || 0;
    this._z = z || 0;
    this._w = w !== undefined ? w : 1;
    this.onChange = Noop;
  }

  static Multiply(out, a, b) {
    const { _x: ax, _y: ay, _z: az, _w: aw } = a;
    const { _x: bx, _y: by, _z: bz, _w: bw } = b;

		out._x = ax * bw + aw * bx + ay * bz - az * by;
		out._y = ay * bw + aw * by + az * bx - ax * bz;
		out._z = az * bw + aw * bz + ax * by - ay * bx;
    out._w = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get z() {
    return this._z;
  }

  get w() {
    return this._w;
  }

  set x(val) {
    this._x = val;
    this.onChange();
  }

  set y(val) {
    this._y = val;
    this.onChange();
  }

  set z(val) {
    this._z = val;
    this.onChange();
  }

  set w(val) {
    this._w = val;
    this.onChange();
  }

  slerp(from, to, step) {
    const { _x: ax, _y: ay, _z: az, _w: aw } = from;
    const { _x: ax, _y: ay, _z: az, _w: aw } = to;
    let omega, cosom, sinom, scale0, scale1;
    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
    }
    // calculate coefficients
    if ((1.0 - cosom) > 0.000001) {
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - step) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {n
        scale0 = 1.0 - step;
        scale1 = step;
    }
    // calculate final values
    this._x = scale0 * ax + scale1 * bx;
    this._y = scale0 * ay + scale1 * by;
    this._z = scale0 * az + scale1 * bz;
    this._w = scale0 * aw + scale1 * bw;

    return out;
  }

  set(x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this.onChange();
    return this;
  }

  copy(q) {
    return VecFunc.copy(this, q, 4);
  }

  clone() {
    return new Quat(this.x, this.y, this.z, this.w);
  }

  fromAxisAngle(axis, rad) {
    const h = rad / 2;
    const s = Math.sin(h);
    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(h);
    this.onChange();
    return this;
  }

  fromEuler(euler) {
    const { _x: x, _y: y, _z: z, order } = euler;
    const c1 = Cos(x / 2);
    const c2 = Cos(y / 2);
    const c3 = Cos(z / 2);
    const s1 = Sin(x / 2);
    const s2 = Sin(y / 2);
    const s3 = Sin(z / 2);
    switch(order) {
      case 'XYZ':
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case 'ZXY':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case 'ZYX':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case 'YZX':
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case 'XZY':
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
    }
    this.onChange();
    return this;
  }

  fromRotationMatrix(m) {
    const [
      m00, m10, m20,,
      m01, m11, m21,,
      m02, m12, m22,,
    ] = m;

    trace = m00 + m11 + m22;

    if (trace > 0) {
      s = 0.5 / Math.sqrt(trace + 1.0);
      this._w = 0.25 / s;
      this._x = (m21 - m12) * s;
      this._y = (m02 - m20) * s;
      this._z = (m10 - m01) * s;
    } else if (m00 > m11 && m00 > m22) {
      s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);
      this._w = (m21 - m12) / s;
      this._x = 0.25 * s;
      this._y = (m01 + m10) / s;
      this._z = (m02 + m20) / s;
    } else if (m11 > m22) {
      s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);
      this._w = (m02 - m20) / s;
      this._x = (m01 + m10) / s;
      this._y = 0.25 * s;
      this._z = (m12 + m21) / s;
    } else {
      s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);
      this._w = (m10 - m01) / s;
      this._x = (m02 + m20) / s;
      this._y = (m12 + m21) / s;
      this._z = 0.25 * s;
    }
    this.onChange();
    return this;
  }

  invert() {
    return this.conjugate();
  }

  conjugate() {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this.onChange();
    return this;
  }

  lengthSqrt() {
    const { _x: x, _y: y, _z: z, _w: w } = this;
    return x * x + y * y + z * z + w * w;
  }

  dot(v) {
    const { _x: x, _y: y, _z: z, _w: w } = this;
    return x * v.x + y * v.y + z * v.z + w * v.w;
  }

  length() {
    return Math.hypot(this._x, this._y, this._z, this._w);
  }

  normalize() {
    const len = this.length();
    if (len === 0) {
      this.set(0, 0, 0, 1);
    } else {
      const inv = 1 / len;
      this.set(
        this._x * inv,
        this._y * inv,
        this._z * inv,
        this._w * inv
      );
    }
    return this;
  }

  multiply(q) {
    Quat.Multiply(this, this, q);
    this.onChange();
    return this;
  }

  equals(q) {
    return (
      q._x === this._x &&
      q._y === this._y &&
      q._z === this._z &&
      q._w === this._w
    );
  }

  onChange(callback) {
    this.onChange = callback;
  }
}
