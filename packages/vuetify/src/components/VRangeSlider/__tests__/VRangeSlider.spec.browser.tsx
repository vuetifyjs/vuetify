// Components
import { VRangeSlider } from '../VRangeSlider'

// Utilities
import { render, screen } from '@test'

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
})
