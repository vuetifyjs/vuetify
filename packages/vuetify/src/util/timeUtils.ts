export function formatTime (seconds: number) {
  return [
    Math.floor(seconds % 60),
    Math.floor(seconds / 60 % 60),
    Math.floor(seconds / 60 / 60 % 60),
  ]
    .filter((x, i) => i < 2 || x > 0)
    .reverse()
    .map(String)
    .map((x, i) => i > 0 ? x.padStart(2, '0') : x)
    .join(':')
}
