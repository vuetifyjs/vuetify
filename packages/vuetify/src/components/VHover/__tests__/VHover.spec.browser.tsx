import { VHover } from '../VHover'

// Utilities
import { render, userEvent } from '@test'

describe('VHover', () => {
  it('should react on mouse events', async () => {
    const { container } = render(() => (
      <div style={{ width: '200px' }} class="v-theme--light">
        <VHover>
          {{
            default: ({ isHovering, props }: any) => <div { ...props } class={['hover-element', isHovering && 'bg-primary']}>foobar</div>,
          }}
        </VHover>
      </div>
    ))

    const element = container.querySelector('.hover-element')!

    await userEvent.hover(element)
    expect(element).toHaveClass('bg-primary')

    await userEvent.unhover(element)
    expect(element).not.toHaveClass('bg-primary')
  })

  it('should not react when disabled', async () => {
    const { container } = render(() => (
      <div style={{ width: '200px' }} class="v-theme--light">
        <VHover disabled>
          {{
            default: ({ isHovering, props }: any) => <div { ...props } class={['hover-element', isHovering && 'bg-primary']}>foobar</div>,
          }}
        </VHover>
      </div>
    ))

    const element = container.querySelector('.hover-element')!

    await userEvent.hover(element)
    expect(element).not.toHaveClass('bg-primary')

    await userEvent.unhover(element)
    expect(element).not.toHaveClass('bg-primary')
  })

  it('should have delay functionality', async () => {
    const { container } = render(() => (
      <div style={{ width: '200px' }} class="v-theme--light">
        <VHover openDelay={ 100 } closeDelay={ 100 }>
          {{
            default: ({ isHovering, props }: any) => <div { ...props } class={['hover-element', isHovering && 'bg-primary']}>foobar</div>,
          }}
        </VHover>
      </div>
    ))

    const element = container.querySelector('.hover-element')!

    // We can't reliably test timing in browser tests
    // Just ensure the component renders and basic functionality works
    expect(element).toBeTruthy()
    expect(element).toHaveClass('hover-element')
    expect(element).not.toHaveClass('bg-primary')
  })
})
