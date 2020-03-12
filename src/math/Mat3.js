import * as MatFunc from "./MatFunc";

const Identity = Object.freeze([
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
]);

const Zero = Object.freeze([
  0, 0, 0,
  0, 0, 0,
  0, 0, 0,
]);

export default class Mat3 extends Array {
  constructor() {
    super(9);
    this.copy(Identity);
  }

  set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    const m = this;
    m[0] = m00; m[1] = m10; m[2] = m20;
    m[3] = m01; m[4] = m11; m[5] = m21;
    m[6] = m02; m[7] = m12; m[8] = m22;
    return this;
  }

  identity() {
    return MatFunc.copy(this, Identity, 9);
  }

  zero() {
    return MatFunc.copy(this, Zero, 9);
  }

  copy(m) {
    return MatFunc.copy(this, m, 9);
  }

  clone() {
    return new Mat3().clone(this);
  }

  fromMatrix4(m) {
    return this.set(
      m[0], m[4], m[8],
      m[1], m[5], m[9],
      m[2], m[6], m[10],
    );
  }

  multiply(m1, m2) {
    const m = this;
    const [
      a00, a10, a20,
      a01, a11, a21,
      a02, a12, a22,
    ] = m2 ? m1 : this;

    const [
      b00, b10, b20,
      b01, b11, b21,
      b02, b12, b22,
    ] = m2 ? m2 : m1;

    m[0] = a00 * b00 + a01 * b10 + a02 * b20;
    m[3] = a00 * b01 + a01 * b11 + a02 * b21;
    m[6] = a00 * b02 + a01 * b12 + a02 * b22;

		m[1] = a10 * b00 + a11 * b10 + a12 * b20;
		m[4] = a10 * b01 + a11 * b11 + a12 * b21;
		m[7] = a10 * b02 + a11 * b12 + a12 * b22;

    m[2] = a20 * b00 + a21 * b10 + a22 * b20;
		m[5] = a20 * b01 + a21 * b11 + a22 * b21;
    m[8] = a20 * b02 + a21 * b12 + a22 * b22;
    return this;
  }

  multiplyScalar(scalar) {
    return MatFunc.multiplyScalar(this, scalar, 9);
  }

  determinant() {
    const [
      a00, a10, a20,
      a01, a11, a21,
      a02, a12, a22,
    ] = this;
    return (
      a00 * a11 * a22 -
      a00 * a21 * a12 -
      a10 * a01 * a22 +
      a10 * a21 * a02 +
      a20 * a01 * a12 -
      a20 * a11 * a02
    );
  }

  invert(m) {
    const [
      a00, a10, a20,
      a01, a11, a21,
      a02, a12, a22,
    ] = m;

    const t00 = a22 * a11 - a21 * a12;
		const t01 = a21 * a02 - a22 * a01;
		const t02 = a12 * a01 - a11 * a02;
    const det = a00 * t00 + a10 * t01 + a20 * t02;

    if (det === 0) {
      warn("Can't invert, determinant is 0");
      return this.identity();
    }

    var inv = 1 / det;
    const e = this;

    e[0] = t00 * inv;
		e[1] = (n20 * n12 - n22 * n10) * inv;
		e[2] = (n21 * n10 - n20 * n11) * inv;

		e[3] = t01 * inv;
		e[4] = (n22 * n00 - n20 * n02) * inv;
		e[5] = (n20 * n01 - n21 * n00) * inv;

		e[6] = t02 * inv;
		e[7] = (n10 * n02 - n12 * n00) * inv;
    e[8] = (n11 * n00 - n10 * n01) * inv;

    return this;
  }

  transpose() {
    const m = this;
    let swap;
    swap = m[1]; m[1] = m[3]; m[3] = swap;
		swap = m[2]; m[2] = m[6]; m[6] = swap;
    swap = m[5]; m[5] = m[7]; m[7] = swap;
    return this;
  }

  scale(x, y) {
    const m = this;
    m[0] *= x; m[3] *= x; m[6] *= x;
    m[1] *= y; m[4] *= y; m[7] *= y;
    return this;
  }

  rotate(rad) {
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const m = this;
    const [
      a00, a10,,
      a01, a11,,
      a02, a12,,
    ] = this;

    m[0] = c * a00 + s * a10;
		m[3] = c * a01 + s * a11;
		m[6] = c * a02 + s * a12;

		m[1] = -s * a00 + c * a10;
		m[4] = -s * a01 + c * a11;
		m[7] = -s * a02 + c * a12;
    return this;
  }

  translate(x, y) {
    const m = this;
		m[0] += x * m[2]; m[3] += x * m[5]; m[6] += x * m[8];
		m[1] += y * m[2]; m[4] += y * m[5]; m[7] += y * m[8];
		return this;
  }

  equals(m) {
    return MatFunc.equals(this, m, 9);
  }
}