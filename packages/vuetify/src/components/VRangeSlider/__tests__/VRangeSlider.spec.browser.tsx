// Components
import { VRangeSlider } from '../VRangeSlider'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { render, screen, showcase } from '@test'

const pill = {
  variant: 'pill',
  size: 'medium',
  prependInnerIcon: '$minus',
  appendInnerIcon: '$plus',
} as const

const stories = {
  'Pill with inner icons': <VRangeSlider { ...pill } modelValue={[20, 70]} />,
  Sizes: (
    <>
      <VRangeSlider { ...pill } modelValue={[20, 70]} />
      <VRangeSlider { ...pill } size="large" modelValue={[20, 70]} />
      <VRangeSlider { ...pill } size="x-large" modelValue={[20, 70]} />
    </>
  ),
  'Inner icons flipped onto the fill': <VRangeSlider { ...pill } modelValue={[2, 98]} />,
  'Inner icons hidden in a narrow range': (
    <>
      <VRangeSlider { ...pill } modelValue={[2, 5]} />
      <VRangeSlider { ...pill } modelValue={[95, 98]} />
    </>
  ),
  Reverse: (
    <>
      <VRangeSlider { ...pill } reverse modelValue={[20, 70]} />
      <VRangeSlider { ...pill } reverse modelValue={[2, 70]} />
    </>
  ),
  RTL: (
    <VLocaleProvider rtl>
      <VRangeSlider { ...pill } modelValue={[2, 70]} />
    </VLocaleProvider>
  ),
  Vertical: (
    <>
      <VRangeSlider { ...pill } direction="vertical" modelValue={[20, 70]} />
      <VRangeSlider { ...pill } direction="vertical" modelValue={[2, 98]} />
      <VRangeSlider { ...pill } direction="vertical" modelValue={[2, 5]} />
      <VRangeSlider { ...pill } direction="vertical" reverse modelValue={[2, 70]} />
    </>
  ),
}

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

  showcase({ stories })
})
