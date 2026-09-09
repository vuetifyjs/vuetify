// Components
import { VAudioWaveform } from '../VAudioWaveform'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { commands, render, screen, showcase, userEvent } from '@test'
import { ref } from 'vue'

const peaks = [0.2, 0.9, 0.35, 0.7, 0.15, 0.6, 0.85, 0.4]

const stories = {
  Default: <VAudioWaveform peaks={ peaks } modelValue={ 40 } />,
  Mirror: <VAudioWaveform peaks={ peaks } modelValue={ 40 } mirror />,
  Disabled: <VAudioWaveform peaks={ peaks } modelValue={ 40 } disabled />,
  'No peaks': <VAudioWaveform modelValue={ 40 } />,
}

describe('VAudioWaveform', () => {
  it('should seek when the waveform is clicked', async () => {
    const model = ref(0)
    render(() => <div style="width: 400px"><VAudioWaveform v-model={ model.value } peaks={ peaks } /></div>)

    const waveform = screen.getByCSS('.v-audio-waveform')
    await userEvent.click(waveform)

    expect(model.value).toBeGreaterThan(0)
  })

  it('should scrub while dragging', async () => {
    const model = ref(0)
    const events: number[] = []
    render(() => (
      <div style="width: 400px">
        <VAudioWaveform
          v-model={ model.value }
          peaks={ peaks }
          onStart={ () => events.push(-1) }
          onEnd={ () => events.push(-2) }
        />
      </div>
    ))

    const rect = document.querySelector('.v-audio-waveform')!.getBoundingClientRect()
    const y = Math.round(rect.top + rect.height / 2)
    await commands.drag(
      [Math.round(rect.left + rect.width * 0.2), y],
      [Math.round(rect.left + rect.width * 0.8), y],
    )

    expect(model.value).toBeGreaterThan(50)
    expect(events).toEqual([-1, -2])
  })

  it('should respond to keyboard seeking', async () => {
    const model = ref(50)
    render(() => <VAudioWaveform v-model={ model.value } peaks={ peaks } step={ 5 } />)

    document.querySelector<HTMLElement>('[role="slider"]')!.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(model.value).toBe(55)

    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(model.value).toBe(45)

    await userEvent.keyboard('{Home}')
    expect(model.value).toBe(0)

    await userEvent.keyboard('{End}')
    expect(model.value).toBe(100)

    await userEvent.keyboard('{PageDown}')
    expect(model.value).toBe(50)
  })

  it('should not seek when disabled', async () => {
    const model = ref(20)
    render(() => <div style="width: 400px"><VAudioWaveform v-model={ model.value } peaks={ peaks } disabled /></div>)

    const rect = document.querySelector('.v-audio-waveform')!.getBoundingClientRect()
    const y = Math.round(rect.top + rect.height / 2)
    await commands.drag([Math.round(rect.left + rect.width * 0.8), y], [Math.round(rect.left + rect.width * 0.8), y])

    expect(model.value).toBe(20)
  })

  it('should report time in aria-valuetext when a duration is known', () => {
    render(() => <VAudioWaveform peaks={ peaks } modelValue={ 50 } duration={ 120 } />)

    const slider = document.querySelector('[role="slider"]')!
    expect(slider.getAttribute('aria-valuetext')).toBe('1:00')
    expect(slider.getAttribute('aria-valuenow')).toBe('50')
  })

  it('should fall back to a percentage when no duration is known', () => {
    render(() => <VAudioWaveform peaks={ peaks } modelValue={ 35 } />)

    expect(document.querySelector('[role="slider"]')!.getAttribute('aria-valuetext')).toBe('35%')
  })

  it('should render a bar per peak, and a placeholder track without peaks', () => {
    render(() => <VAudioWaveform peaks={ peaks } bars={ 8 } />)
    expect(document.querySelectorAll('.v-audio-waveform__track rect')).toHaveLength(peaks.length)

    render(() => <VAudioWaveform bars={ 12 } />)
    const placeholders = document.querySelectorAll('.v-audio-waveform__track rect')
    expect(placeholders.length).toBeGreaterThan(0)
  })

  it('should invert the seek ratio in RTL', async () => {
    const model = ref(0)
    render(() => (
      <VLocaleProvider rtl>
        <div style="width: 400px"><VAudioWaveform v-model={ model.value } peaks={ peaks } /></div>
      </VLocaleProvider>
    ))

    const rect = document.querySelector('.v-audio-waveform')!.getBoundingClientRect()
    const x = Math.round(rect.left + rect.width * 0.25)
    const y = Math.round(rect.top + rect.height / 2)
    await commands.drag([x, y], [x, y])

    expect(model.value).toBeGreaterThan(50)
  })

  showcase({ stories })
})
