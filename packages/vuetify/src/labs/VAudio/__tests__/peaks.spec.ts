// Utilities
import { downsamplePeaks, normalizePeaks } from '../peaks'

describe('downsamplePeaks', () => {
  it('should take the absolute maximum of each bucket', () => {
    expect(downsamplePeaks([0, 0.5, -0.9, 0.2], 2)).toEqual([0.5, 0.9])
  })

  it('should compute rms when asked', () => {
    expect(downsamplePeaks([3, 4, 0, 0], 2, 'rms')).toEqual([Math.sqrt(12.5), 0])
  })

  it('should spread the remainder across buckets', () => {
    const data = new Float32Array(16)
    data[8] = 1
    expect(downsamplePeaks(data, 10).indexOf(1)).toBe(5)
  })

  it('should not upsample when there are fewer samples than buckets', () => {
    expect(downsamplePeaks([0.4, -0.6], 8)).toEqual([0.4, 0.6])
  })

  it('should return an empty array for empty input', () => {
    expect(downsamplePeaks([], 8)).toEqual([])
    expect(downsamplePeaks([0.5], 0)).toEqual([])
  })
})

describe('normalizePeaks', () => {
  it('should scale the loudest bucket to exactly 1', () => {
    expect(normalizePeaks([0.1, 0.25, 0.5])).toEqual([0.2, 0.5, 1])
  })

  it('should not divide by zero on an all-zero array', () => {
    expect(normalizePeaks([0, 0, 0])).toEqual([0, 0, 0])
  })
})
