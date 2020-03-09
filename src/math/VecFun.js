const {
  abs: Abs,
  floor: Floor,
  ceil: Ceil,
  max: Max,
  min: Min,
  round: Round,
  sqrt: Sqrt
} = Math;

export function add(out, a, b, len) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
  if (len > 2) { out.z = a.z + b.z;
    if (len > 3) out.w = a.w + b.w;
  }
  return out;
}

export function addScalar(out, scalar, len) {
  out.x += scalar;
  out.y += scalar;
  if (len > 2) { out.z += scalar;
    if (len > 3) out.w += scalar;
  }
  return out;
}

export function ceil(out, len) {
  out.x = Ceil(out.x);
  out.y = Ceil(out.y);
  if (len > 2) { out.z = Ceil(out.z);
    if (len > 3) out.w = Ceil(out.w);
  }
  return out;
}

export function clamp(out, min, max, len) {
  out.x = Max(min.x, Min(max.x, out.x));
  out.y = Max(min.y, Min(max.y, out.y));
  if (len > 2) { out.z = Max(min.z, Min(max.z, out.z));
    if (len > 3) out.w = Max(min.w, Min(max.w, out.w));
  }
  return out;
}

export function clampLength(out, minVal, maxVal, len) {
  const length = length(out, len);
  divScalar(out, length || 1);
  mulScalar(out, Max(minVal, Min(maxVal, length)), len);
  return out;
}

export function clampScalar(out, minVal, maxVal, len) {
  out.x = Max(minVal, Min(maxVal, out.x));
  out.y = Max(minVal, Min(maxVal, out.y));
  if (len > 2) { out.z = Max(minVal, Min(maxVal, out.z));
    if (len > 3) out.w = Max(minVal, Min(maxVal, out.w));
  }
  return out;
}

export function copy(out, vec, len) {
  out.x = vec.x;
  out.y = vec.y;
  if (len > 2) { out.z = vec.z;
    if (len > 3) out.w = vec.w;
  }
  return out;
}

export function distanceTo(out, vec, len) {
  return Sqrt(distanceSquared(out, vec, len), len);
}

export function distanceSquared(out, vec, len) {
  const dx = out.x - vec.x;
  const dy = out.y - vec.y;
  let result = dx * dx + dy * dy;
  if (len > 2) {
    const dz = out.z - vec.z;
    result += dz * dz;
    if (len > 3) {
      const dw = out.w - vec.w;
      result += dw * dw;
    }
  }
  return result;
}

export function div(out, a, b, len) {
  out.x = a.x / b.x;
  out.y = a.y / b.y;
  if (len > 2) { out.z = a.z / b.z;
    if (len > 3) out.w = a.w / b.w;
  }
  return out;
}

export function dot(out, vec, len) {
  let result = out.x * vec.x + out.y * vec.y;
  if (len > 2) { result += out.z * vec.z;
    if (len > 3) result += out.w * vec.w;
  }
  return result;
}

export function equals(out, vec, len) {
  let result = out.x === vec.x && out.y === vec.y;
  if (len > 2) { result = result && out.z === vec.z;
    if (len > 3) result = result && out.w === vec.w;
  }
  return result
}

export function floor(out, len) {
  out.x = Floor(out.x);
  out.y = Floor(out.y);
  if (len > 2) { out.z = Floor(out.z);
    if (len > 3) out.w = Floor(out.w);
  }
  return out;
}

export function length(out, len) {
  return Sqrt(dot(out, out, len));
}

export function lengthSqrt(out, len) {
  return dot(out, out, len);
}

export function lerp(out, vec, alpha, len) {
  out.x += (vec.x - out.x) * alpha;
  out.y += (vec.y - out.y) * alpha;
  if (len > 2) { out.z += (vec.z - out.z) * alpha;
    if (len > 3) out.w += (vec.w - out.w) * alpha;
  }
  return out;
}

export function max(out, vec, len) {
  out.x = Max(out.x, vec.x);
  out.y = Max(out.y, vec.y);
  if (len > 2) { out.z = Max(out.z, vec.z);
    if (len > 3) out.w = Max(out.w, vec.w);
  }
  return out;
}

export function manhattanDistance(out, vec, len) {
  let result = Abs(out.x - vec.x) + Abs(out.y - vec.y);
  if (len > 2) { result += Abs(out.z - vec.z);
    if (len > 3) result += Abs(out.w - vec.w);
  }
  return result;
}

export function manhattanLength(out, len) {
  let result = Abs(out.x) + Abs(out.y);
  if (len > 2) { result += Abs(out.z);
    if (len > 3) result += Abs(out.w);
  }
  return result;
}

export function min(out, vec, len) {
  out.x = Min(out.x, vec.x);
  out.y = Min(out.y, vec.y);
  if (len > 2) { out.z = Min(out.z, vec.z);
    if (len > 3) out.w = Min(out.w, vec.w);
  }
  return out;
}

export function mul(out, a, b, len) {
  out.x = a.x * b.x;
  out.y = a.y * b.y;
  if (len > 2) { out.z = a.z * b.z;
    if (len > 3) out.w = a.w * b.w;
  }
  return out;
}

export function mulScalar(out, scalar, len) {
  out.x *= scalar;
  out.y *= scalar;
  if (len > 2) { out.z *= scalar;
    if (len > 3) out.w *= scalar;
  }
  return out;
}

export function negate(out, len) {
  out.x = -out.x;
  out.y = -out.y;
  if (len > 2) { out.z = -out.z;
    if (len > 3) out.w = -out.w;
  }
  return out;
}

export function normalize(out, len) {
  return divScalar(out, length(out, len) || 1, len);
}

export function round(out, len) {
  out.x = Round(out.x);
  out.y = Round(out.y);
  if (len > 2) { out.z = Round(out.z);
    if (len > 3) out.w = Round(out.w);
  }
  return out;
}

export function scaleAndAdd(out, vec, scale, len) {
  out.x += vec.x * scale;
  out.y += vec.y * scale;
  if (len > 2) { out.z += vec.z * scale;
    if (len > 3) out.w += vec.w * scale;
  }
  return out;
}

export function set(out, x, y, z, w, len) {
  out.x = x;
  out.y = y;
  if (len > 2) { out.z = z;
    if (len > 3) out.w = w;
  }
  return out;
}

export function setLength(out, length, len) {
  normalize(out, len);
  return mulScalar(out, length, len);
}

export function sub(out, a, b, len) {
  out.x = a.x - b.x;
  out.y = a.y - b.y;
  if (len > 2) { out.z = a.z - b.z;
    if (len > 3) out.w = a.w - b.w;
  }
  return out;
}

export function subScalar(out, scalar, len) {
  out.x += scalar;
  out.y += scalar;
  if (len > 2) { out.z += scalar;
    if (len > 3) out.w += scalar;
  }
  return out;
}
