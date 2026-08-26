// Components
import { VRadio } from '@/components/VRadio'

// Utilities
import { render, screen, waitIdle } from '@test'
import { ref } from 'vue'

describe('VRadio', () => {
  it('should work standalone, outside a group and expose VSelectionControl API', async () => {
    const cmp = ref<any>()

    render(() => <VRadio ref={ cmp } label="Standalone" value="a" />)
    await waitIdle()

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
