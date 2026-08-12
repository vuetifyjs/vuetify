// Components
import { VStepperActions } from '../VStepperActions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Utilities
import { render, screen } from '@test'

describe('VStepperActions', () => {
  it('should let VStepperActions > VBtn defaults override button variant', async () => {
    render(() => (
      <VDefaultsProvider defaults={{ VStepperActions: { VBtn: { variant: 'elevated' } } }}>
        <VStepperActions />
      </VDefaultsProvider>
    ))

    for (const btn of screen.getAllByCSS('.v-btn')) {
      expect(btn).toHaveClass('v-btn--variant-elevated')
    }
  })

  it('should keep built-in variants when only ambient VBtn defaults are set', async () => {
    render(() => (
      <VDefaultsProvider defaults={{ VBtn: { variant: 'elevated' } }}>
        <VStepperActions />
      </VDefaultsProvider>
    ))

    const [prev, next] = screen.getAllByCSS('.v-btn')
    expect(prev).toHaveClass('v-btn--variant-text')
    expect(next).toHaveClass('v-btn--variant-tonal')
  })

  it('should default to text and tonal variants', async () => {
    render(() => <VStepperActions />)

    const [prev, next] = screen.getAllByCSS('.v-btn')
    expect(prev).toHaveClass('v-btn--variant-text')
    expect(next).toHaveClass('v-btn--variant-tonal')
  })
})
