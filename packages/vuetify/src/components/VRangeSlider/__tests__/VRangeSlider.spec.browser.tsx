// Components
import { VRangeSlider } from '../VRangeSlider'

// Utilities
import { render, screen } from '@test'
import { ref } from 'vue'

describe('VRangeSlider', () => {
  it('should name each thumb from start/end aria labels', () => {
    render(() => (
      <VRangeSlider
        label="Price"
        aria-label="Price"
        startThumbAriaLabel="Minimum"
        endThumbAriaLabel="Maximum"
      />
    ))

    const [start, end] = screen.getAllByRole('slider')
    expect(start).toHaveAttribute('aria-label', 'Minimum')
    expect(end).toHaveAttribute('aria-label', 'Maximum')
  })

  it('should name thumbs Minimum and Maximum by default', () => {
    render(() => <VRangeSlider aria-label="Price" />)

    const [start, end] = screen.getAllByRole('slider')
    expect(start).toHaveAttribute('aria-label', 'Minimum')
    expect(end).toHaveAttribute('aria-label', 'Maximum')
  })

  it('should name the group from label or aria-label', () => {
    render(() => (
      <>
        <VRangeSlider label="Price" />
        <VRangeSlider label="Price" aria-label="Price range" />
      </>
    ))

    const [labelled, named] = screen.getAllByRole('group')
    expect(labelled).toHaveAccessibleName('Price')
    expect(named).toHaveAccessibleName('Price range')
  })

  it('should format thumb label and aria-valuetext with valueFormat', () => {
    render(() => (
      <VRangeSlider
        modelValue={[540, 1080]}
        max={ 1439 }
        thumbLabel="always"
        valueFormat={ ({ value }) => `${value / 60}h` }
      />
    ))

    const [start, end] = screen.getAllByRole('slider')
    expect(start).toHaveAttribute('aria-valuetext', '9h')
    expect(end).toHaveAttribute('aria-valuetext', '18h')
    expect(start).toHaveTextContent('9h')
  })

  it('should render inner icons only in the pill variant', async () => {
    const variant = ref<'default' | 'pill'>('default')
    render(() => (
      <VRangeSlider
        variant={ variant.value }
        modelValue={[25, 55]}
        prependInnerIcon="$minus"
        appendInnerIcon="$plus"
      />
    ))

    expect(screen.queryAllByCSS('.v-slider__inner-icon')).toHaveLength(0)

    variant.value = 'pill'
    await expect.poll(() => screen.queryAllByCSS('.v-slider__inner-icon')).toHaveLength(2)
  })

  it('should move inner icon past the thumb when the outer segment is too short', async () => {
    const model = ref([25, 75])
    render(() => <VRangeSlider v-model={ model.value } variant="pill" prependInnerIcon="$minus" />)

    const icon = screen.getByCSS('.v-slider__inner-icon')
    await expect.element(icon).not.toHaveClass('v-slider__inner-icon--flipped')

    model.value = [2, 75]
    await expect.element(icon).toHaveClass('v-slider__inner-icon--flipped')
    await expect.element(icon).not.toHaveClass('v-slider__inner-icon--hidden')

    model.value = [2, 4]
    await expect.element(icon).toHaveClass('v-slider__inner-icon--hidden')
  })
})
