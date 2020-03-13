import * as VecFunc from "./VecFun";
import { clamp } from '../utils/MathUtils';
import EventEmitter from "../core/EventEmitter";
const { atan2: Atan2, abs: Abs, acos: Acos, cos: Cos, sin: Sin, sqrt: Sqrt } = Math;

const CHANGE_EVENT = 'change';

export default class Quat {
  constructor(x, y, z, w) {
    this._x = x || 0;
    this._y = y || 0;
    this._z = z || 0;
    this._w = w !== undefined ? w : 1;
    this.events = new EventEmitter();
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
    this.events.emit(CHANGE_EVENT);
  }

  set y(val) {
    this._y = val;
    this.events.emit(CHANGE_EVENT);
  }

  set z(val) {
    this._z = val;
    this.events.emit(CHANGE_EVENT);
  }

  set w(val) {
    this._w = val;
    this.events.emit(CHANGE_EVENT);
  }

  angleTo(q) {
    return 2 * Acos( Abs( clamp( this.dot( q ), - 1, 1 ) ) );
  }

  slerpTo(to, t) {
    return this.slerp(this, to, t);
  }

  slerp(from, to, t) {
    if (t === 0) return this.copy(from);
    if (t === 1) return this.copy(to);

    const { _x: x, _y: y, _z: z, _w: w } = this;
    let cosHalfTheta = w * to._w + x * to._x + y * to._y + z * to._z;

    if (cosHalfTheta < 0) {
      this._x = -to._x;
      this._y = -to._y;
      this._z = -to._z;
      this._w = -to._w;
      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(to);
    }

    if (cosHalfTheta >= 1.0) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;
      return this;
    }

    const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;
    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t;
      this._w = s * w + t * this._w;
      this._x = s * x + t * this._x;
      this._y = s * y + t * this._y;
      this._z = s * z + t * this._z;
      this.normalize();
      this.events.emit(CHANGE_EVENT);
      return this;
    }

    const sinHalfTheta = Sqrt(sqrSinHalfTheta);
    const halfTheta = Atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Sin(t * halfTheta) / sinHalfTheta;
    this._w = (w * ratioA + this._w * ratioB);
    this._x = (x * ratioA + this._x * ratioB);
    this._y = (y * ratioA + this._y * ratioB);
    this._z = (z * ratioA + this._z * ratioB);
    this.events.emit(CHANGE_EVENT);
    return this;

  }

  set(x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this.events.emit(CHANGE_EVENT);
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
    this.events.emit(CHANGE_EVENT);
    return this;
  }

  fromEulerRotation(euler) {
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
    this.events.emit(CHANGE_EVENT);
    return this;
  }

  fromMatrixRotation(m) {
    const [
      m00, m10, m20,,
      m01, m11, m21,,
      m02, m12, m22,,
    ] = m;

    const trace = m00 + m11 + m22;
    let s = 0;
    if (trace > 0) {
      s = 0.5 / Sqrt(trace + 1.0);
      this._x = (m21 - m12) * s;
      this._y = (m02 - m20) * s;
      this._z = (m10 - m01) * s;
      this._w = 0.25 / s;
    } else if (m00 > m11 && m00 > m22) {
      s = 2.0 * Sqrt(1.0 + m00 - m11 - m22);
      this._x = 0.25 * s;
      this._y = (m01 + m10) / s;
      this._z = (m02 + m20) / s;
      this._w = (m21 - m12) / s;
    } else if (m11 > m22) {
      s = 2.0 * Sqrt(1.0 + m11 - m00 - m22);
      this._x = (m01 + m10) / s;
      this._y = 0.25 * s;
      this._z = (m12 + m21) / s;
      this._w = (m02 - m20) / s;
    } else {
      s = 2.0 * Sqrt(1.0 + m22 - m00 - m11);
      this._x = (m02 + m20) / s;
      this._y = (m12 + m21) / s;
      this._z = 0.25 * s;
      this._w = (m10 - m01) / s;
    }
    this.events.emit(CHANGE_EVENT);
    return this;
  }

  invert() {
    return this.conjugate();
  }

  conjugate() {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this.events.emit(CHANGE_EVENT);
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

  multiply(q1, q2) {
    const {
      _x: ax,
      _y: ay,
      _z: az,
      _w: aw
    } = q2 ? q1 : this;
    const {
      _x: bx,
      _y: by,
      _z: bz,
      _w: bw
    } = q2 ? q2 : q1;

		this._x = ax * bw + aw * bx + ay * bz - az * by;
		this._y = ay * bw + aw * by + az * bx - ax * bz;
		this._z = az * bw + aw * bz + ax * by - ay * bx;
    this._w = aw * bw - ax * bx - ay * by - az * bz;
    this.events.emit(CHANGE_EVENT);
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
}
