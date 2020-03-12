const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// https://stackoverflow.com/questions/466204/rounding-up-to-next-power-of-2

export function toDegrees(radians) {
  return radians * RAD_TO_DEG;
}

export function toRadians(degrees) {
  return degrees * DEG_TO_RAD;
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function isPowerOfTwo(x) {
  return (x & (x - 1)) == 0;
}

export function floorPowerOfTwo(x) {
  let p = 1;
  while( x >>= 1) p <<= 1;
  return p;
}

export function ceilPowerOfTwo(x) {
  if (x < 1) return 1;
  let p = 2;
  x--;
  while( x >>= 1) p <<= 1;
  return p;
}

export function getSizeToCover(width, height, maxWidth, maxHeight) {
  var ratio = Math.max(maxWidth / width, maxHeight / height);
  return [width * ratio, height * ratio];
}

export function getSizeToContain(width, height, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / width, maxHeight / height);
  return [width * ratio, height * ratio];
}