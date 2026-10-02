// Components
import { VMediaProgressBar } from '../VMediaProgressBar'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VMediaProgressBar', () => {
  it('should seek with fractional seconds rather than whole percent', async () => {
    const model = ref(0)
    render(() => <div style="width: 1000px"><VMediaProgressBar v-model={ model.value } max={ 3600 } /></div>)

    const rect = screen.getByCSS('.v-media-progress-bar').getBoundingClientRect()
    const x = rect.left + rect.width * 0.2345
    const y = rect.top + rect.height / 2
    await commands.drag([x, y], [x, y])

    expect(model.value).toBeCloseTo(844.2, -1)
    expect(model.value % 36).not.toBe(0)
  })

  it('should step, page and jump from the keyboard', async () => {
    const model = ref(50)
    render(() => <VMediaProgressBar v-model={ model.value } max={ 100 } step={ 5 } />)

    screen.getByCSS('.v-media-progress-bar').focus()
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

  it('should name the chapter in the tooltip and the announced value', async () => {
    const chapters = [{ start: 0, title: 'Intro' }, { start: 60, title: 'Verse' }]
    render(() => <div style="width: 400px"><VMediaProgressBar modelValue={ 90 } max={ 120 } chapters={ chapters } /></div>)

    const bar = screen.getByCSS('.v-media-progress-bar')
    expect(bar).toHaveAttribute('aria-valuetext', '1:30 / 2:00, Verse')

    const rect = bar.getBoundingClientRect()
    await userEvent.hover(bar, { position: { x: rect.width * 0.25, y: rect.height / 2 } })

    expect(screen.getByCSS('.v-media-progress-bar__tooltip')).toHaveTextContent('Intro0:30')
  })
})
