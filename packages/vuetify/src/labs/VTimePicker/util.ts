export function pad (n: string | number, length = 2) {
  return String(n).padStart(length, '0')
}
