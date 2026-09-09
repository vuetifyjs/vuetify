// Utilities
import { formatDuration, PLACEHOLDER_TIME } from '../time'

describe('formatDuration', () => {
  it('should format seconds as m:ss', () => {
    expect(formatDuration(0)).toBe('0:00')
    expect(formatDuration(5)).toBe('0:05')
    expect(formatDuration(65)).toBe('1:05')
  })

  it('should add hours only past an hour', () => {
    expect(formatDuration(3661)).toBe('1:01:01')
  })

  it('should clamp negatives to zero rather than render -1:-5', () => {
    expect(formatDuration(-5)).toBe('0:00')
  })

  it('should clamp above the duration', () => {
    expect(formatDuration(90, 60)).toBe('1:00')
  })

  it('should return a placeholder for non-finite input', () => {
    expect(formatDuration(Number.NaN)).toBe(PLACEHOLDER_TIME)
    expect(formatDuration(Infinity)).toBe(PLACEHOLDER_TIME)
  })

  it('should ignore a non-finite duration ceiling', () => {
    expect(formatDuration(30, Infinity)).toBe('0:30')
  })
})
