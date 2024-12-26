// Components
import { VBottomSheet } from '..'

// Utilities
import { render, screen } from '@test'
import { ref } from 'vue'

describe('VBottomSheet', () => {
  it('renders properly with default props', async () => {
    render(() => (
      <VBottomSheet model-value>
        <div>Content inside bottom sheet</div>
      </VBottomSheet>
    ))

    const bottomSheet = screen.getByCSS('.v-bottom-sheet')
    expect.element(bottomSheet).toBeTruthy()
    expect.element(bottomSheet).not.toHaveClass('v-bottom-sheet--inset')
    expect
      .element(bottomSheet)
      .toHaveTextContent('Content inside bottom sheet')
  })

  it('applies inset class when inset prop is true', async () => {
    const inset = ref<boolean>(false)

    render(() => (
      <VBottomSheet model-value inset={ inset.value }>
        <div>Content inside bottom sheet</div>
      </VBottomSheet>
    ))

    const bottomSheet = screen.getByCSS('.v-bottom-sheet')

    expect.element(bottomSheet).not.toHaveClass('v-bottom-sheet--inset')

    inset.value = true

    expect.element(bottomSheet).toHaveClass('v-bottom-sheet--inset')
  })

  it('applies custom styles and classes', async () => {
    render(() => (
      <VBottomSheet model-value class="custom-class" style="color: red;">
        <div>Custom styles</div>
      </VBottomSheet>
    ))
    const bottomSheet = screen.getByCSS('.v-bottom-sheet')
    expect.element(bottomSheet).toHaveClass('custom-class')
    expect.element(bottomSheet).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })
})
