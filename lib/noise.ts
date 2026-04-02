/**
 * Smooth spatial noise for mouse-repulsion radius irregularity.
 * Returns a value in [0, 1].
 */
export function smoothNoise(
  x: number,
  y: number,
  scale: number,
  t: number,
): number {
  const sx = x * scale
  const sy = y * scale
  const n1 = Math.sin(sx * 1.7 + sy * 2.3 + t * 0.5)
  const n2 = Math.sin(sx * 3.1 - sy * 1.9 + t * 0.3)
  const n3 = Math.sin((sx + sy) * 2.7 + t * 0.4)
  // Weighted average — normalise to [0, 1]
  return (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * 0.5 + 0.5
}
