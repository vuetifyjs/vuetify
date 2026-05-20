// Composables
import { useChunks } from '../chunks'

describe('useChunks', () => {
  // https://github.com/vuetifyjs/vuetify/issues/22818
  it('snaps a value of 100 to 100 when chunkCount divides the container', () => {
    const { snapValueToChunk } = useChunks(
      { chunkCount: 3, chunkWidth: null, chunkGap: 4 },
      300,
    )

    expect(snapValueToChunk(100)).toBe(100)
  })

  // avoid 2.(9) floor to 2, and snapped down to ~67 instead of 100
  it('absorbs floating-point error at the final chunk boundary', () => {
    const { snapValueToChunk } = useChunks(
      { chunkCount: 3, chunkWidth: null, chunkGap: 4 },
      100,
    )

    expect(snapValueToChunk(100)).toBe(100)
  })

  it('uses large-enough value to cross floating-point', () => {
    const { snapValueToChunk } = useChunks(
      { chunkCount: 10, chunkWidth: null, chunkGap: 10 },
      113,
    )

    expect(snapValueToChunk(100)).toBe(100)
  })
})
