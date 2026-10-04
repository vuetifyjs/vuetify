// Components
import { VVideo } from '../VVideo'

// Utilities
import { render } from '@test'
import { ref } from 'vue'

describe('VVideo', () => {
  it('should mount and assign a srcObject set after mount', async () => {
    const ctx = new AudioContext()
    const stream = ctx.createMediaStreamDestination().stream
    const srcObject = ref<MediaStream>()
    render(() => <VVideo srcObject={ srcObject.value } />)
    expect(document.querySelector('video')).toBeNull()

    srcObject.value = stream
    await vi.waitUntil(() => document.querySelector('video')?.srcObject === stream)

    await ctx.close()
  })
})
