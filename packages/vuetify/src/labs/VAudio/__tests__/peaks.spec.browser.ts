// Utilities
import { decodePeaks } from '../peaks'
import { makeSilentWav } from '@/labs/composables/__tests__/wav'

describe('decodePeaks', () => {
  it('should bucket a whole-file decode by the known duration', async () => {
    const wav = await (await fetch(makeSilentWav(2))).blob()
    const onProgress = vi.fn()

    await expect(decodePeaks(wav, { buckets: 8, duration: 2, onProgress })).resolves.toHaveLength(8)
    expect(onProgress).toHaveBeenCalledTimes(1)
  })

  it('should skip a whole-file decode when the duration is unknown or too long', async () => {
    const wav = new Blob(['RIFF\0\0\0\0WAVEfmt '])
    const decode = vi.spyOn(BaseAudioContext.prototype, 'decodeAudioData')

    await expect(decodePeaks(wav, { buckets: 8 })).resolves.toBeUndefined()
    await expect(decodePeaks(wav, { buckets: 8, duration: 2 * 60 * 60 })).resolves.toBeUndefined()
    expect(decode).not.toHaveBeenCalled()
  })
})
