import { VHover } from '../VHover'

// Utilities
import { render, screen, userEvent, wait } from '@test'

describe('VHover', () => {
  it('should react on mouse events', async () => {
    render(() => (
      <VHover>
        {{
          default: ({ isHovering, props }) => (
            <div { ...props } class={['hover-element', isHovering && 'bg-primary']}>foobar</div>
          ),
        }}
      </VHover>
    ))

    const element = screen.getByCSS('.hover-element')

    expect(element).not.toHaveClass('bg-primary')

    await userEvent.hover(element)
    await expect.element(element).toHaveClass('bg-primary')

    await userEvent.unhover(element)
    await expect.element(element).not.toHaveClass('bg-primary')
  })

  it('should not react when disabled', async () => {
    render(() => (
      <VHover disabled>
        {{
          default: ({ isHovering, props }) => (
            <div { ...props } class={['hover-element', isHovering && 'bg-primary']}>foobar</div>
          ),
        }}
      </VHover>
    ))

    const element = screen.getByCSS('.hover-element')

    expect(element).not.toHaveClass('bg-primary')

    await userEvent.hover(element)
    await expect.element(element).not.toHaveClass('bg-primary')

    await userEvent.unhover(element)
    await expect.element(element).not.toHaveClass('bg-primary')
  })

  it('should respect delays', async () => {
    render(() => (
      <VHover openDelay={ 200 } closeDelay={ 200 }>
        {{
          default: ({ isHovering, props }) => (
            <div { ...props } class={['hover-element', { 'bg-primary': isHovering }]}>foobar</div>
          ),
        }}
      </VHover>
    ))

    const element = screen.getByCSS('.hover-element')

    await userEvent.hover(element)
    expect(element).not.toHaveClass('bg-primary')
    await wait(200)
    await expect.element(element).toHaveClass('bg-primary')

    await userEvent.unhover(element)
    expect(element).toHaveClass('bg-primary')
    await wait(200)
    await expect.element(element).not.toHaveClass('bg-primary')
  })
})
