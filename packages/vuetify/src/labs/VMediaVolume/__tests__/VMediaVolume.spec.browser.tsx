// Components
import { VMediaVolume } from '../VMediaVolume'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VMediaVolume', () => {
  it('should unmute to the volume from before a drag down to 0', async () => {
    const volume = ref(50)
    render(() => <VMediaVolume v-model={ volume.value } inline sliderProps={{ width: 200 }} />)

    const thumb = screen.getByCSS('.v-slider-thumb').getBoundingClientRect()
    const track = screen.getByCSS('.v-slider-track').getBoundingClientRect()
    const x = thumb.left + thumb.width / 2
    const y = thumb.top + thumb.height / 2
    await commands.drag([x, y], [(x + track.left) / 2, y], [track.left + 10, y], [track.left - 20, y])
    expect(volume.value).toBe(0)

    await userEvent.click(screen.getByCSS('.v-icon-btn'))
    expect(volume.value).toBe(50)
  })

  it('should toggle the menu on tap instead of muting', async () => {
    const volume = ref(50)
    render(() => <VMediaVolume v-model={ volume.value } />)

    const button = screen.getByCSS('.v-icon-btn')
    function tap () {
      button.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', bubbles: true }))
      button.click()
    }

    tap()
    await vi.waitUntil(() => document.querySelector('.v-media-volume__menu'))
    expect(volume.value).toBe(50)

    tap()
    await vi.waitUntil(() => !document.querySelector('.v-media-volume__menu'))
    expect(volume.value).toBe(50)
  })

  it('should mute on tap when the slider is hidden', async () => {
    const volume = ref(50)
    render(() => <VMediaVolume v-model={ volume.value } slider="hidden" />)

    const button = screen.getByCSS('.v-icon-btn')
    button.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', bubbles: true }))
    button.click()

    expect(volume.value).toBe(0)
    expect(document.querySelector('.v-slider')).toBeNull()
  })
})
