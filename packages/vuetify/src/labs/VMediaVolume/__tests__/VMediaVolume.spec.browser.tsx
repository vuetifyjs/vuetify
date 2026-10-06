// Components
import { VMediaVolume } from '../VMediaVolume'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

function tap (button: HTMLElement) {
  button.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', bubbles: true }))
  button.click()
}

describe('VMediaVolume', () => {
  it('should unmute to the volume from before a drag down to 0', async () => {
    const volume = ref(50)
    render(() => <VMediaVolume v-model={ volume.value } inline sliderProps={{ width: 200 }} />)

    const thumb = screen.getByRole('slider').getBoundingClientRect()
    const track = screen.getByCSS('.v-slider-track').getBoundingClientRect()
    const x = thumb.left + thumb.width / 2
    const y = thumb.top + thumb.height / 2
    await commands.drag([x, y], [(x + track.left) / 2, y], [track.left + 10, y], [track.left - 20, y])
    expect(volume.value).toBe(0)

    await userEvent.click(screen.getByRole('button'))
    expect(volume.value).toBe(50)
  })

  it('should toggle the menu on tap instead of muting', async () => {
    const volume = ref(50)
    render(() => <VMediaVolume v-model={ volume.value } />)

    tap(screen.getByRole('button'))
    await expect.poll(() => screen.queryByRole('slider')).not.toBeNull()
    expect(volume.value).toBe(50)

    tap(screen.getByRole('button'))
    await expect.poll(() => screen.queryByRole('slider')).toBeNull()
    expect(volume.value).toBe(50)
  })

  it('should mute on tap when the slider is hidden', () => {
    const volume = ref(50)
    render(() => <VMediaVolume v-model={ volume.value } slider="hidden" />)

    tap(screen.getByRole('button'))

    expect(volume.value).toBe(0)
    expect(screen.queryByRole('slider')).toBeNull()
  })

  it('should keep slider keys from reaching the player', async () => {
    const onKeydown = vi.fn()
    const inline = ref(true)
    render(() => (
      <div onKeydown={ onKeydown }>
        <VMediaVolume inline={ inline.value } />
      </div>
    ))

    screen.getByRole('slider').focus()
    await userEvent.keyboard('{ArrowDown}5')

    inline.value = false
    await nextTick()
    tap(screen.getByRole('button'))
    const slider = await screen.findByRole('slider')
    slider.focus()
    await userEvent.keyboard('{ArrowDown}5')

    expect(onKeydown).not.toHaveBeenCalled()
  })

  it('should keep the layout and slider direction in RTL', async () => {
    const volume = ref(50)
    render(() => (
      <VLocaleProvider rtl>
        <VMediaVolume v-model={ volume.value } inline="left" sliderProps={{ width: 100 }} />
      </VLocaleProvider>
    ))

    const slider = screen.getByRole('slider')
    expect(slider.getBoundingClientRect().left).toBeLessThan(screen.getByRole('button').getBoundingClientRect().left)

    slider.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(volume.value).toBeGreaterThan(50)
  })

  it('should let nested defaults override the slider props it sets', () => {
    render(() => (
      <VDefaultsProvider defaults={{ VMediaVolume: { VSlider: { thumbSize: 6 } } }}>
        <VMediaVolume inline />
      </VDefaultsProvider>
    ))

    expect(screen.getByCSS('.v-slider-thumb').style.getPropertyValue('--v-slider-thumb-size')).toBe('6px')
  })

  it('should keep the inline thumb inside the track and under the pointer', async () => {
    const volume = ref(100)
    render(() => <VMediaVolume v-model={ volume.value } inline sliderProps={{ width: 220, maxWidth: 220, thumbSize: 20, step: 1 }} />)

    const thumb = () => screen.getByCSS('.v-slider-thumb').getBoundingClientRect()
    const container = screen.getByCSS('.v-slider__container').getBoundingClientRect()
    expect(thumb().right).toBeCloseTo(container.right, 0)

    volume.value = 0
    await expect.poll(() => thumb().left).toBeCloseTo(container.left, 0)

    const y = container.top + container.height / 2
    const x = container.left + 10 + (container.width - 20) * 0.75
    await commands.drag([x, y], [x, y])
    expect(volume.value).toBe(75)
  })
})
