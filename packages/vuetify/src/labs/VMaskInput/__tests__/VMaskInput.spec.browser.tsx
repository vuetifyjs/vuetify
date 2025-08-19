import { VMaskInput } from '../VMaskInput'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VMaskInput', () => {
  it('should mask model-value but keep v-model intact', async () => {
    const inputValue = ref('4567')
    render(() => (
      <VMaskInput
        v-model={ inputValue.value }
        mask="(###) #"
      />
    ))

    await expect.element(screen.getByCSS('input')).toHaveValue('(456) 7')
    expect(inputValue.value).toBe('4567')
  })

  it('should mask model-value and also return v-model to be masked value', async () => {
    const inputValue = ref('4567')
    render(() => (
      <VMaskInput
        v-model={ inputValue.value }
        mask="(###) #"
        returnMaskedValue
      />
    ))

    await expect.element(screen.getByCSS('input')).toHaveValue('(456) 7')
    expect(inputValue.value).toBe('(456) 7')
  })

  describe('Caret Position and Formatting', () => {
    const renderComponent = ({
      defaultModel = '(AS)-123-XYZ-45-67',
      defaultMask = '(AA)-###-NNN-##-##',
    }: {
      defaultModel?: string
      defaultMask?: string
    } = {}) => {
      const model = ref(defaultModel)

      const wrapper = render(() => (
        <VMaskInput
          v-model={ model.value }
          mask={ defaultMask }
          returnMaskedValue
        />
      ))

      const input = screen.getByCSS('input') as HTMLInputElement

      const insertCaretAt = async (start: number, end?: number) => {
        await userEvent.click(input)
        input.setSelectionRange(start, end || start)
        return input.selectionStart
      }

      return {
        model,
        input,
        wrapper,
        insertCaretAt,
      }
    }

    describe('Insertion', () => {
      it('when typing', async () => {
        const { input, model } = renderComponent({ defaultModel: '', defaultMask: '####' })
        await userEvent.type(input, '123')
        expect(input.selectionStart).toBe(input.value.length)
        expect(model.value).toBe('123')
      })

      it('when typing before before delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(12)

        await userEvent.type(input, '1')

        expect(input.selectionStart).toBe(14)
        expect(model.value).toBe('(AS)-123-XYZ-14-56')
      })

      it('when typing such that cursor lands before delimiter.', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultModel: '(A' })

        await insertCaretAt(2)

        await userEvent.type(input, 'S')

        expect(input.selectionStart).toBe(5)
        expect(model.value).toBe('(AS)-')
      })

      it('when typing in the middle of input', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(13)

        await userEvent.type(input, '1')
        expect(input.selectionStart).toBe(14)
        expect(model.value).toBe('(AS)-123-XYZ-14-56')
      })

      it('when selected in the middle', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(9, 11)

        await userEvent.type(input, 'A')
        expect(input.selectionStart).toBe(10)
        expect(model.value).toBe('(AS)-123-AZ4-56-7')
      })

      it('when selected such that one character before, one at and one after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(11, 14)

        await userEvent.type(input, '1')
        expect(input.selectionStart).toBe(13)
        expect(model.value).toBe('(AS)-123-XY1-56-7')
      })
    })

    describe('Backward Delete / Backspace', () => {
      it('when backspace is pressed', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultMask: '####', defaultModel: '1234' })

        await insertCaretAt(3)

        await userEvent.type(input, '{backspace}')
        expect(input.selectionStart).toBe(2)
        expect(model.value).toBe('124')
      })

      it('backspace pressed when cursor is after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultMask: '##-##', defaultModel: '12-34' })

        await insertCaretAt(3)

        await userEvent.type(input, '{backspace}')
        expect(input.selectionStart).toBe(2)
        expect(model.value).toBe('12-34')
      })

      it('backspace pressed such that cursor lands after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultMask: '##-##', defaultModel: '12-34' })

        await insertCaretAt(4)

        await userEvent.type(input, '{backspace}')
        expect(input.selectionStart).toBe(2)
        expect(model.value).toBe('12-4')
      })

      it('backspace pressed in the middle of input', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(15)

        await userEvent.type(input, '{backspace}')
        expect(input.selectionStart).toBe(14)
        expect(model.value).toBe('(AS)-123-XYZ-46-7')
      })

      it('backspace pressed with selection in middle', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(10, 12)

        await userEvent.type(input, '{backspace}')
        expect(input.selectionStart).toBe(10)
        expect(model.value).toBe('(AS)-123-X45-67-')
      })

      it('selection contains one character before, one at and one after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(11, 14)

        await userEvent.type(input, '{backspace}')
        expect(input.selectionStart).toBe(11)
        expect(model.value).toBe('(AS)-123-XY5-67-')
      })
    })

    describe('Forward Delete', () => {
      it('when forward delete is pressed', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultMask: '####', defaultModel: '1234' })

        await insertCaretAt(2)

        await userEvent.type(input, '{delete}')
        expect(input.selectionStart).toBe(2)
        expect(model.value).toBe('124')
      })

      it('forward delete pressed when cursor is after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultMask: '##-##', defaultModel: '12-34' })

        await insertCaretAt(3)

        await userEvent.type(input, '{delete}')
        expect(input.selectionStart).toBe(3)
        expect(model.value).toBe('12-4')
      })

      it('forward delete pressed in the middle of input', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(14)

        await userEvent.type(input, '{delete}')
        expect(input.selectionStart).toBe(14)
        expect(model.value).toBe('(AS)-123-XYZ-46-7')
      })

      it('forward delete pressed with selection in middle', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(10, 12)

        await userEvent.type(input, '{delete}')
        expect(input.selectionStart).toBe(10)
        expect(model.value).toBe('(AS)-123-X45-67-')
      })

      it('selection contains one character before, one at and one after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(11, 14)

        await userEvent.type(input, '{delete}')
        expect(input.selectionStart).toBe(11)
        expect(model.value).toBe('(AS)-123-XY5-67-')
      })
    })

    describe('Cut', () => {
      it('cut with selection in middle', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(10, 12)
        await userEvent.keyboard('{Ctrl>}x{/Ctrl}')

        expect(input.selectionStart).toBe(10)
        expect(model.value).toBe('(AS)-123-X45-67-')
      })

      it('selection contains one character before, one at and one after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(11, 14)

        await userEvent.keyboard('{Ctrl>}x{/Ctrl}')
        expect(input.selectionStart).toBe(11)
        expect(model.value).toBe('(AS)-123-XY5-67-')
      })
    })

    describe('Paste', () => {
      it('pasted when cursor is at end', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultMask: '####', defaultModel: '12' })

        navigator.clipboard.writeText('34')

        await insertCaretAt(2)
        await userEvent.paste()

        expect(input.selectionStart).toBe(4)
        expect(model.value).toBe('1234')
      })

      it('pasted when cursor is in middle', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultMask: '#####', defaultModel: '1245' })

        navigator.clipboard.writeText('3')
        await insertCaretAt(2)
        await userEvent.paste()

        expect(input.selectionStart).toBe(3)
        expect(model.value).toBe('12345')
      })

      it('pasted when cursor is after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultModel: '(AS)-123-XYZ-' })

        navigator.clipboard.writeText('12')
        await insertCaretAt(13)
        await userEvent.paste()

        expect(input.selectionStart).toBe(16)
        expect(model.value).toBe('(AS)-123-XYZ-12-')
      })

      it('pasted when cursor is before delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent({ defaultMask: '##-##', defaultModel: '12-' })

        navigator.clipboard.writeText('34')
        await insertCaretAt(2)
        await userEvent.paste()

        expect(input.selectionStart).toBe(5)
        expect(model.value).toBe('12-34')
      })

      it('pasted when selection is in middle', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        navigator.clipboard.writeText('CD')
        await insertCaretAt(10, 12)
        await userEvent.paste()

        // TODO: Fix this test
        expect(input.selectionStart).toBe(12)
        expect(model.value).toBe('(AS)-123-XCD-45-67')
      })

      it('pasted when selection is in middle', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        navigator.clipboard.writeText('CD')
        await insertCaretAt(1, 3)
        await userEvent.paste()

        // TODO: Fix this test
        expect(input.selectionStart).toBe(5)
        expect(model.value).toBe('(CD)-123-XCD-45-67')
      })

      it('pasted when selection contains one character before, one at and one after delimiter', async () => {
        const { input, model, insertCaretAt } = renderComponent()

        navigator.clipboard.writeText('A0')
        await insertCaretAt(11, 14)
        await userEvent.paste()

        // TODO: Fix this test
        expect(input.selectionStart).toBe(14)
        expect(model.value).toBe('(AS)-123-XYA-05-67')
      })
    })
  })
})
