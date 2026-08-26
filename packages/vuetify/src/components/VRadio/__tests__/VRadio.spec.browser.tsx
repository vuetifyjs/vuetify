// Components
import { VRadio } from '../VRadio'
import { VRadioGroup } from '@/components/VRadioGroup'

// Utilities
import { render, screen, userEvent, waitIdle } from '@test'
import { ref } from 'vue'

describe('VRadio', () => {
  it('should support v-model without a group', async () => {
    const model = ref<string>()

    render(() => (
      <>
        <VRadio v-model={ model.value } value="one" label="one" />
        <VRadio v-model={ model.value } value="two" label="two" />
      </>
    ))

    await userEvent.click(screen.getByLabelText('one'))
    expect(model.value).toBe('one')

    await userEvent.click(screen.getByLabelText('two'))
    expect(model.value).toBe('two')
    expect(screen.getByLabelText('one')).not.toBeChecked()
  })

  it('should defer to the group model', async () => {
    const model = ref<string>()

    render(() => (
      <VRadioGroup v-model={ model.value }>
        <VRadio value="one" label="one" />
        <VRadio value="two" label="two" />
      </VRadioGroup>
    ))

    await userEvent.click(screen.getByLabelText('two'))
    expect(model.value).toBe('two')
    expect(screen.getByLabelText('two')).toBeChecked()
  })

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
