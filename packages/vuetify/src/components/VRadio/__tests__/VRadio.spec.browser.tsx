// Components
import { VRadio } from '@/components/VRadio'

// Utilities
import { page, render, screen, waitIdle } from '@test'
import { ref } from 'vue'

describe('VRadio', () => {
  it('should work standalone, outside a group', async () => {
    const model = ref()

    const { element } = render(() => (
      <VRadio id="test" label="Standalone" value="a" v-model={ model } />
    ))

    expect(element).toBeInTheDocument()

    await page.getByRole('radio').click()
    await waitIdle()

    expect(model.value).toBe('a')
  })

  it('should expose VSelectionControl API', async () => {
    const cmp = ref<any>()

    render(() => <VRadio ref={ cmp } label="Standalone" value="a" />)

    expect(cmp.value.focus).toBeTypeOf('function')
    expect(cmp.value.blur).toBeTypeOf('function')
    expect('isFocused' in cmp.value).toBe(true)
    expect('input' in cmp.value).toBe(true)

    cmp.value.focus()
    expect(document.activeElement).toBe(screen.getByCSS('input[type="radio"]'))

    cmp.value.blur()
    expect(document.activeElement).not.toBe(screen.getByCSS('input[type="radio"]'))
  })
})
