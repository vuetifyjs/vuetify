// Utilities
import { decodePeaks } from '../peaks'

describe('decodePeaks', () => {
  it('should skip a whole-file decode when the duration is unknown or too long', async () => {
    const wav = new Blob(['RIFF\0\0\0\0WAVEfmt '])
    const decode = vi.spyOn(BaseAudioContext.prototype, 'decodeAudioData')

    await expect(decodePeaks(wav, { buckets: 8 })).resolves.toBeUndefined()
    await expect(decodePeaks(wav, { buckets: 8, duration: 2 * 60 * 60 })).resolves.toBeUndefined()
    expect(decode).not.toHaveBeenCalled()
  })
})
