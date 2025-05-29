import { VIconBtn } from '../VIconBtn'

// Utilities
import { render, screen } from '@test'

describe('VIconBtn', () => {
  it.each([
    [undefined, undefined, 40, 24],
    [undefined, 'small', 40, 16],
    [undefined, 22, 40, 22],
    ['small', undefined, 24, 16],
    ['small', 'x-small', 24, 10],
    ['small', 12, 24, 12],
    [64, undefined, 64, 24],
    [64, 'small', 64, 16],
    [64, 32, 64, 32],
  ])('should work with %s button size and %s icon size', (btn, icon, btnSize, iconSize) => {
    render(() => <VIconBtn size={ btn } icon-size={ icon } icon="$vuetify" />)

    const btnEl = screen.getByText('', { selector: '.v-icon-btn' })
    expect(btnEl).toHaveStyle(`--v-icon-btn-height: ${btnSize}px`)
    expect(btnEl).toHaveStyle(`--v-icon-btn-width: ${btnSize}px`)

    const iconEl = screen.getByText('', { selector: '.v-icon' })
    expect(iconEl).toHaveStyle(`font-size: ${iconSize}px`)
    expect(iconEl).toHaveStyle(`height: ${iconSize}px`)
    expect(iconEl).toHaveStyle(`width: ${iconSize}px`)
  })
})
