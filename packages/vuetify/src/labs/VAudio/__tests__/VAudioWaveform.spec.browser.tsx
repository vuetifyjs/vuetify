// Components
import { VAudioWaveform } from '../VAudioWaveform'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { commands, render, screen, showcase } from '@test'
import { ref } from 'vue'

const peaks = [0.2, 0.9, 0.35, 0.7, 0.15, 0.6, 0.85, 0.4]

const stories = {
  Default: <VAudioWaveform peaks={ peaks } modelValue={ 40 } max={ 100 } />,
  Mirror: <VAudioWaveform peaks={ peaks } modelValue={ 40 } max={ 100 } mirror />,
  'Mirror 0.5': <VAudioWaveform peaks={ peaks } modelValue={ 40 } max={ 100 } mirror={ 0.5 } />,
  Disabled: <VAudioWaveform peaks={ peaks } modelValue={ 40 } max={ 100 } disabled />,
  'No peaks': <VAudioWaveform modelValue={ 40 } max={ 100 } />,
}

describe('VAudioWaveform', () => {
  it('should scrub while dragging', async () => {
    const model = ref(0)
    const onStart = vi.fn()
    const onEnd = vi.fn()
    render(() => (
      <div style="width: 400px">
        <VAudioWaveform
          v-model={ model.value }
          max={ 100 }
          peaks={ peaks }
          onDrag:start={ onStart }
          onDrag:end={ onEnd }
        />
      </div>
    ))

    const rect = screen.getByRole('slider').getBoundingClientRect()
    const y = Math.round(rect.top + rect.height / 2)
    await commands.drag(
      [Math.round(rect.left + rect.width * 0.2), y],
      [Math.round(rect.left + rect.width * 0.8), y],
    )

    expect(model.value).toBeGreaterThan(50)
    expect(onStart).toHaveBeenCalledTimes(1)
    expect(onEnd).toHaveBeenCalledTimes(1)
  })

  it('should not mirror the seek ratio in RTL', async () => {
    const model = ref(0)
    render(() => (
      <VLocaleProvider rtl>
        <div style="width: 400px"><VAudioWaveform v-model={ model.value } max={ 100 } peaks={ peaks } /></div>
      </VLocaleProvider>
    ))

    const rect = screen.getByRole('slider').getBoundingClientRect()
    const x = Math.round(rect.left + rect.width * 0.25)
    const y = Math.round(rect.top + rect.height / 2)
    await commands.drag([x, y], [x, y])

    expect(model.value).toBeLessThan(50)
  })

  showcase({ stories })
})
