export function isPowerOfTwo(x) {
  return (x & (x - 1)) == 0;
}

export function nextHighestPowerOfTwo(x) {
  if (isPowerOfTwo(x)) return x;
  const p = 2;
  while( x >>= 1) p <<= 1;
  return p;
}

// TextureToPowerOfTwo
