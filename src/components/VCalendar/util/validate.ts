
export function validateNumber (input: any): boolean {
  return isFinite(parseInt(input))
}
