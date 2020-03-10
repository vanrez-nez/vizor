export function copy(out, mat, len) {
  out[0] = mat[0];
  out[1] = mat[1];
  out[2] = mat[2];
  out[3] = mat[3];
  out[4] = mat[4];
  out[5] = mat[5];
  out[6] = mat[6];
  out[7] = mat[7];
  out[8] = mat[8];
  if (len > 9) {
    out[9] = mat[9];
    out[10] = mat[10];
    out[11] = mat[11];
    out[12] = mat[12];
    out[13] = mat[13];
    out[14] = mat[14];
    out[15] = mat[15];
  }
  return out;
}

export function multiplyScalar(out, scalar) {
  out[0] *= scalar;
  out[1] *= scalar;
  out[2] *= scalar;
  out[3] *= scalar;
  out[4] *= scalar;
  out[5] *= scalar;
  out[6] *= scalar;
  out[7] *= scalar;
  out[8] *= scalar;
  if (len > 9) {
    out[9] *= scalar;
    out[10] *= scalar;
    out[11] *= scalar;
    out[12] *= scalar;
    out[13] *= scalar;
    out[14] *= scalar;
    out[15] *= scalar;
  }
}

export function equals(m1, m2, len) {
  let result = (
    m1[0] === m2[0] &&
    m1[1] === m2[1] &&
    m1[2] === m2[2] &&
    m1[3] === m2[3] &&
    m1[4] === m2[4] &&
    m1[5] === m2[5] &&
    m1[6] === m2[6] &&
    m1[7] === m2[7] &&
    m1[8] === m2[8]
  );
  if (len > 9) {
    result = (
      result &&
      m1[9] === m2[9] &&
      m1[10] === m2[10] &&
      m1[11] === m2[11] &&
      m1[12] === m2[12] &&
      m1[13] === m2[13] &&
      m1[14] === m2[14] &&
      m1[15] === m2[15]
    );
  }
  return result;
}
