const padStart = (string: number | string, targetLength: number, padString: string) => {
  targetLength = targetLength >> 0
  string = String(string)
  padString = String(padString)
  if (string.length > targetLength) {
    return String(string)
  }

  targetLength = targetLength - string.length
  if (targetLength > padString.length) {
    padString += padString.repeat(targetLength / padString.length)
  }
  return padString.slice(0, targetLength) + String(string)
}

export default (n: string | number, length = 2) => padStart(n, length, '0')
