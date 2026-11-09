export function formatTime (seconds: number) {
  if (!Number.isFinite(seconds)) return '--:--'

  const value = Math.max(0, seconds)
  return [
    Math.floor(value % 60),
    Math.floor(value / 60 % 60),
    Math.floor(value / 60 / 60 % 60),
  ]
    .filter((x, i) => i < 2 || x > 0)
    .reverse()
    .map(String)
    .map((x, i) => i > 0 ? x.padStart(2, '0') : x)
    .join(':')
}

export function parseTime (value: number | string) {
  return String(value).split(':').reduce((total, part) => total * 60 + Number(part), 0)
}
