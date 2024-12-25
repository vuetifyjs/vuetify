// Components
import { VBottomSheet } from '..'
import { createVuetify } from '@/framework'

// Utilities
import { render } from '@testing-library/vue'
import { nextTick } from 'vue'

const vuetify = createVuetify()

describe('VBottomSheet', () => {
  it('renders properly with default props', async () => {
    render(
          <VBottomSheet model-value>
            <div>Content inside bottom sheet</div>
          </VBottomSheet>,
          {
            global: {
              plugins: [vuetify],
            },
          }
    )

    await nextTick()

    const bottomSheet = document.body.querySelector('.v-bottom-sheet')

    expect(bottomSheet).toBeTruthy()
    expect(bottomSheet).not.toHaveClass('v-bottom-sheet--inset')

    expect(bottomSheet).toHaveTextContent('Content inside bottom sheet')
  })

  it('applies inset class when inset prop is true', async () => {
    const { rerender } = render(
      <VBottomSheet model-value inset={ false }>
        <div>Content inside bottom sheet</div>
      </VBottomSheet>,
      {
        global: {
          plugins: [vuetify],
        },
        props: { inset: false },
      }
    )

    await nextTick()
    const bottomSheet = document.body.querySelector('.v-bottom-sheet')

    expect(bottomSheet).not.toHaveClass('v-bottom-sheet--inset')

    await rerender({ inset: true })
    await nextTick()

    expect(bottomSheet).toHaveClass('v-bottom-sheet--inset')
  })

  it('applies custom styles and classes', async () => {
    render(
      <VBottomSheet model-value class="custom-class" style="color: red;">
        <div>Custom styles</div>
      </VBottomSheet>,
      {
        global: {
          plugins: [vuetify],
        },
      }
    )

    await nextTick()
    const bottomSheet = document.body.querySelector('.v-bottom-sheet')
    expect(bottomSheet).toHaveClass('custom-class')
    expect(bottomSheet).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })
})
