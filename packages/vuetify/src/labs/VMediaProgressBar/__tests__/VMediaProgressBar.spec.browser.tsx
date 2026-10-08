// Components
import { VMediaProgressBar } from '../VMediaProgressBar'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

function ratio () {
  return Number(getComputedStyle(screen.getByRole('slider')).getPropertyValue('--v-media-progress-bar-ratio'))
}

function waveHeight () {
  return Math.max(...screen.getByCSS('.v-media-progress-bar__wave path').getAttribute('d')!
    .split(/[ML]/).slice(1).map(point => Math.abs(Number(point.trim().split(' ')[1]))))
}

describe('VMediaProgressBar', () => {
  it('should seek with fractional seconds rather than whole percent', async () => {
    const model = ref(0)
    render(() => <div style="width: 1000px"><VMediaProgressBar v-model={ model.value } max={ 3600 } /></div>)

    const rect = screen.getByRole('slider').getBoundingClientRect()
    const x = rect.left + rect.width * 0.2345
    const y = rect.top + rect.height / 2
    await commands.drag([x, y], [x, y])

    expect(model.value).toBeCloseTo(844.2, -1)
  })

  it('should step, page and jump from the keyboard', async () => {
    const model = ref(50)
    render(() => <VMediaProgressBar v-model={ model.value } max={ 100 } step={ 5 } />)

    screen.getByRole('slider').focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(model.value).toBe(55)
    await userEvent.keyboard('{Shift>}{ArrowLeft}{/Shift}')
    expect(model.value).toBe(5)
    await userEvent.keyboard('{PageDown}')
    expect(model.value).toBe(0)
    await userEvent.keyboard('{End}')
    expect(model.value).toBe(100)
    await userEvent.keyboard('{Home}')
    expect(model.value).toBe(0)
  })

  it('should leave page keys to the page after a click', async () => {
    const model = ref(0)
    render(() => <VMediaProgressBar v-model={ model.value } max={ 100 } />)

    const bar = screen.getByRole('slider')
    await userEvent.click(bar)
    const position = model.value
    expect(bar).toHaveFocus()

    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true })
    bar.dispatchEvent(event)
    expect(event.defaultPrevented).toBeFalsy()
    expect(model.value).toBe(position)

    await userEvent.keyboard('{ArrowRight}')
    expect(model.value).toBe(position + 5)
  })

  it('should use a separate Shift step when given a pair', async () => {
    const model = ref(50)
    render(() => <VMediaProgressBar v-model={ model.value } max={ 100 } step={[2, 7]} />)

    screen.getByRole('slider').focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(model.value).toBe(52)
    await userEvent.keyboard('{Shift>}{ArrowLeft}{/Shift}')
    expect(model.value).toBe(45)
  })

  it('should name the chapter in the tooltip and the announced value', async () => {
    const chapters = [{ start: 0, title: 'Intro' }, { start: '1:00', title: 'Verse' }]
    render(() => <div style="width: 400px"><VMediaProgressBar modelValue={ 90 } max={ 120 } chapters={ chapters } /></div>)

    const bar = screen.getByRole('slider')
    expect(bar).toHaveAttribute('aria-valuetext', '1:30 / 2:00, Verse')

    const rect = bar.getBoundingClientRect()
    await userEvent.hover(bar, { position: { x: rect.width * 0.25, y: rect.height / 2 } })

    expect(screen.getByCSS('.v-media-progress-bar__tooltip')).toHaveTextContent('Intro0:30')
  })

  it('should keep a large thumb inside the track and under the pointer', async () => {
    const model = ref(100)
    render(() => <div style="width: 220px"><VMediaProgressBar v-model={ model.value } max={ 100 } thumb thumbSize={ 20 } /></div>)

    const track = screen.getByCSS('.v-media-progress-bar__track').getBoundingClientRect()
    const thumb = () => screen.getByCSS('.v-media-progress-bar__thumb').getBoundingClientRect()
    expect(thumb().right).toBeCloseTo(track.right, 0)

    model.value = 0
    await nextTick()
    expect(thumb().left).toBeCloseTo(track.left, 0)

    const y = track.top + track.height / 2
    const x = track.left + 10 + 200 * 0.75
    await commands.drag([x, y], [x, y])
    expect(model.value).toBeCloseTo(75, 0)
    expect(thumb().left + 10).toBeCloseTo(x, 0)
  })

  it('should highlight the hovered chapter', async () => {
    render(() => (
      <div style="width: 200px">
        <VMediaProgressBar max={ 100 } chapters={[{ start: 0 }, { start: 25 }, { start: 75 }]} />
      </div>
    ))

    const bar = screen.getByRole('slider')
    const rect = bar.getBoundingClientRect()
    await userEvent.hover(bar, { position: { x: rect.width / 2, y: rect.height / 2 } })

    const segments = screen.queryAllByCSS('.v-media-progress-bar__segment')
    expect(segments).toHaveLength(3)
    expect(segments[0]).not.toHaveClass('v-media-progress-bar__segment--hovered')
    expect(segments[1]).toHaveClass('v-media-progress-bar__segment--hovered')
    expect(segments[2]).not.toHaveClass('v-media-progress-bar__segment--hovered')
  })

  it('should patch the layers of every chapter when switching to wavy', async () => {
    const variant = ref<'pill' | 'wavy'>('pill')
    render(() => (
      <div style="width: 200px">
        <VMediaProgressBar
          max={ 100 }
          modelValue={ 50 }
          variant={ variant.value }
          chapters={[{ start: 0 }, { start: 25 }, { start: 75 }]}
          thumb
        />
      </div>
    ))
    expect(screen.queryAllByCSS('.v-media-progress-bar__fill')).toHaveLength(3)

    variant.value = 'wavy'
    await nextTick()
    expect(screen.queryAllByCSS('.v-media-progress-bar__fill')).toHaveLength(0)
    expect(screen.queryAllByCSS('.v-media-progress-bar__background')).toHaveLength(3)
    await expect.poll(() => screen.queryAllByCSS('.v-media-progress-bar__wave path')).toHaveLength(3)
  })

  it('should flatten the wave once playback ends and bring it back on seek', async () => {
    const model = ref(50)
    render(() => <div style="width: 200px"><VMediaProgressBar v-model={ model.value } max={ 100 } variant="wavy" /></div>)
    await screen.findByCSS('.v-media-progress-bar__wave path')
    expect(waveHeight()).toBeGreaterThan(0)

    model.value = 100
    await expect.poll(waveHeight).toBe(0)
    expect(screen.getByCSS('.v-media-progress-bar__wave').style.getPropertyValue('--v-media-progress-bar-wave-stretch')).toBe('1')

    model.value = 40
    await expect.poll(waveHeight).toBeGreaterThan(0)
  })

  it('should jump without easing when motion is reduced', async () => {
    const model = ref(0)
    render(() => <div style="width: 200px"><VMediaProgressBar v-model={ model.value } max={ 100 } variant="wavy" thumb /></div>)

    model.value = 50
    await nextTick()
    expect(ratio()).toBe(50)
    await expect.poll(() => screen.getByRole('slider')).not.toHaveClass('v-media-progress-bar--seeking')
  })

  describe('wavy seeking', () => {
    beforeEach(() => commands.setReduceMotionDisabled())

    afterEach(() => commands.setReduceMotionEnabled())

    it('should ease jumps but follow playback and dragging', async () => {
      const model = ref(0)
      render(() => <div style="width: 200px"><VMediaProgressBar v-model={ model.value } max={ 100 } variant="wavy" thumb /></div>)

      const root = screen.getByRole('slider')

      model.value = 50
      await nextTick()
      expect(root).toHaveClass('v-media-progress-bar--seeking')
      await expect.poll(ratio).toSatisfy((value: number) => value > 0 && value < 50)
      await expect.poll(() => root, { timeout: 2000 }).not.toHaveClass('v-media-progress-bar--seeking')
      expect(ratio()).toBe(50)

      model.value = 51
      await nextTick()
      expect(root).not.toHaveClass('v-media-progress-bar--seeking')

      const rect = root.getBoundingClientRect()
      const y = rect.top + rect.height / 2
      await commands.drag([rect.left + 20, y], [rect.left + 60, y], [rect.left + 100, y])
      await nextTick()
      expect(root).not.toHaveClass('v-media-progress-bar--seeking')
      expect(ratio()).toBe(model.value)
    })

    it('should jump instead of easing when the media changes', async () => {
      const model = ref(100)
      const max = ref(100)
      render(() => <div style="width: 200px"><VMediaProgressBar v-model={ model.value } max={ max.value } variant="wavy" thumb /></div>)
      await screen.findByCSS('.v-media-progress-bar__wave path')

      const root = screen.getByRole('slider')
      const frame = () => new Promise(resolve => requestAnimationFrame(resolve))
      await expect.poll(waveHeight).toBe(0)

      model.value = 0
      max.value = 0
      await nextTick()
      expect(root).not.toHaveClass('v-media-progress-bar--seeking')
      expect(ratio()).toBe(0)
      await frame()
      await frame()
      expect(waveHeight()).toBe(3)

      max.value = 120
      model.value = 60
      await nextTick()
      expect(root).not.toHaveClass('v-media-progress-bar--seeking')

      await frame()
      model.value = 0
      await nextTick()
      expect(root).toHaveClass('v-media-progress-bar--seeking')
    })

    it('should keep easing through a click with pointer jitter, even mid-animation', async () => {
      const model = ref(0)
      render(() => <div style="width: 200px"><VMediaProgressBar v-model={ model.value } max={ 100 } variant="wavy" thumb /></div>)

      const rect = screen.getByRole('slider').getBoundingClientRect()
      const y = rect.top + rect.height / 2
      const at = (percent: number) => rect.left + 2 + 196 * percent / 100

      await commands.drag([at(30), y], [at(30) + 1, y])
      await expect.poll(ratio).toSatisfy((value: number) => value > 5 && value < 25)

      await commands.drag([at(80), y], [at(80) + 1, y])
      await expect.poll(() => model.value).toBeGreaterThan(79)
      expect(ratio()).toBeLessThan(70)
      await expect.poll(ratio, { timeout: 2000 }).toBeGreaterThan(79)
    })
  })
})
