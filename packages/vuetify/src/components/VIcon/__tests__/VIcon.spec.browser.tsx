import { VIcon } from '../VIcon'

// Utilities
import { render, screen } from '@test'

describe('VIcon', () => {
  describe('icon prop', () => {
    it('should render icon from default set', () => {
      render(() => <VIcon icon="mdi-home" />)

      const icon = screen.getByText('', { selector: '.mdi-home' })
      expect(icon).toHaveClass('mdi-home')
      expect(icon).toHaveClass('mdi')
    })
  })

  describe('default slot', () => {
    it('should render icon from default set', () => {
      render(() => <VIcon>mdi-home</VIcon>)

      const icon = screen.getByText('', { selector: '.mdi-home' })
      expect(icon).toHaveClass('mdi-home')
      expect(icon).toHaveClass('mdi')
    })

    it('should render default slot if no icon value is found', () => {
      const Foo = () => (
        <svg style="width: 100%; height: 100%;" class="foo">
          <path d="M7,10L12,15L17,10H7Z" />
        </svg>
      )

      render(() => (
        <VIcon>
          <Foo />
        </VIcon>
      ))

      const svg = screen.getByText('', { selector: '.foo' })
      expect(svg).toBeVisible()
    })
  })

  it('should render svg icon', () => {
    render(() => <VIcon icon="svg:M7,10L12,15L17,10H7Z" />)

    const svg = screen.getByCSS('svg')
    expect(svg).toBeVisible()
    const path = screen.getByCSS('svg path')
    expect(path).toHaveAttribute('d', 'M7,10L12,15L17,10H7Z')
  })

  it('should render class icon', () => {
    render(() => <VIcon icon="class:foo" />)

    const icon = screen.getByText('', { selector: '.foo' })
    expect(icon).toHaveClass('foo')
  })
})
