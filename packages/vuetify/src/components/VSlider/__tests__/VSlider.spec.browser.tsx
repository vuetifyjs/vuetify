// Components
import { VSlider } from '../VSlider'

// Utilities
import { commands, page, render, screen, showcase, userEvent } from '@test'
import { ref } from 'vue'

const stories = {
  'Thumb label': <VSlider thumbLabel="always" />,
  'With icons': <VSlider prependIcon="$vuetify" appendIcon="$vuetify" />,
  'With messages': <VSlider messages="This is a message" />,
  Disabled: <VSlider disabled />,
  Ticks: (
    <>
      <VSlider ticks={[0, 2, 8, 10]} min="0" max="10" step="1" showTicks="always" />
      <VSlider ticks={{ 0: 'a', 5: 'b', 10: 'c' }} min="0" max="10" step="1" showTicks="always" />
    </>
  ),
  Vertical: (
    <>
      <VSlider direction="vertical" thumbLabel="always" />
      <VSlider direction="vertical" prependIcon="$vuetify" appendIcon="$vuetify" />
      <VSlider direction="vertical" messages="This is a message" />
      <VSlider direction="vertical" ticks={[0, 2, 8, 10]} min="0" max="10" step="1" showTicks="always" />
      <VSlider direction="vertical" ticks={{ 0: 'a', 5: 'b', 10: 'c' }} min="0" max="10" step="1" showTicks="always" />
    </>
  ),
}

describe('VSlider', () => {
  it('should react to clicking on track', async () => {
    const model = ref()
    render(() => <VSlider v-model={ model.value } />)

    await userEvent.click(screen.getByCSS('.v-slider-track'))
    expect(model.value).toBeDefined()
  })

  it('should allow user to drag thumb', async () => {
    const model = ref()
    render(() => <VSlider v-model={ model.value } />)

    await commands.drag([100, 15], [200, 15])
    expect(model.value).toBeDefined()
  })

  it('should allow user to interact using keyboard', async () => {
    const values: number[] = []

    render(() => (
      <VSlider
        max="20"
        step="1"
        onUpdate:modelValue={ (v: number) => values.push(v) }
      />
    ))

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    await userEvent.keyboard('{ArrowLeft}')
    await userEvent.keyboard('{Control>}{ArrowRight}')
    await userEvent.keyboard('{Control>}{ArrowLeft}')
    await userEvent.keyboard('{Shift>}{ArrowRight}')
    await userEvent.keyboard('{Shift>}{ArrowLeft}')
    await userEvent.keyboard('{PageUp}')
    await userEvent.keyboard('{PageDown}')
    await userEvent.keyboard('{End}')
    await userEvent.keyboard('{Home}')

    expect(values).toEqual([1, 2, 1, 3, 1, 4, 1, 11, 1, 20, 0])
  })

  it('should show thumb-label when focused', async () => {
    render(() => (
      <VSlider class="ma-8" thumbLabel />
    ))

    expect(screen.getByCSS('.v-slider-thumb__label')).not.toBeVisible()
    await userEvent.click(screen.getByCSS('.v-slider-thumb'))
    await expect.element(screen.getByCSS('.v-slider-thumb__label')).toBeVisible()
  })

  it('should respect step prop', async () => {
    const model = ref()
    render(() => (
      <VSlider
        min="0"
        max="10"
        step="2"
        v-model={ model.value }
      />
    ))

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    expect(model.value).toBe(2)
  })

  it('should render icons with actions', async () => {
    const onClickPrepend = vi.fn()
    const onClickAppend = vi.fn()

    render(() => (
      <VSlider
        prependIcon="mdi-magnify-minus-outline"
        appendIcon="mdi-magnify-plus-outline"
        onClick:prepend={ onClickPrepend }
        onClick:append={ onClickAppend }
      />
    ))

    await userEvent.click(screen.getByCSS('.mdi-magnify-minus-outline'))
    await userEvent.click(screen.getByCSS('.mdi-magnify-plus-outline'))

    expect(onClickPrepend).toHaveBeenCalledOnce()
    expect(onClickAppend).toHaveBeenCalledOnce()
  })

  it('should emit start and end events', async () => {
    await page.viewport(500, 500)

    const onStart = vi.fn()
    const onEnd = vi.fn()
    const model = ref()

    render(() => (
      <VSlider
        onStart={ onStart }
        onEnd={ onEnd }
        v-model={ model.value }
      />
    ))

    await commands.drag([15, 15], [250, 15])

    expect(onStart).toHaveBeenCalledExactlyOnceWith(0)
    expect(onEnd).toHaveBeenCalledOnce()
    expect(model.value).toBeCloseTo(50, 0)
  })

  // https://github.com/vuetifyjs/vuetify/issues/16634
  it('should respect the decimals from both step and min', async () => {
    await page.viewport(500, 500)

    const values: number[] = []

    render(() => (
      <VSlider
        modelValue={ 1.001 }
        step={ 1.001 }
        min={ 1.0001 }
        max={ 10 }
        thumbLabel
        onUpdate:modelValue={ (v: number) => values.push(v) }
      />
    ))

    await commands.drag(
      [15, 15],
      [80, 15], // move to 1st step
      [300, 15], // move to 2nd step
      [500, 15], // move to 3rd step
    )

    expect(new Set(values)).toEqual(new Set([2.0011, 6.0051, 10]))
  })

  showcase({ stories })
})
