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

  it('should clear the input when clear icon is clicked', async () => {
    const inputValue = ref('(456) 7')

    render(() => (
      <VMaskInput
        v-model={ inputValue.value }
        mask="(###) #"
        clearable
      />
    ))

    await userEvent.click(screen.getByLabelText('Clear'))
    expect(inputValue.value).toBe('')
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
      it('should work as expected when typing', async () => {
        const { input, model } = renderComponent({ defaultModel: '', defaultMask: '####' })
        await userEvent.type(input, '123')
        expect(model.value).toBe('123')
        expect(input.selectionStart).toBe(input.value.length)
      })

      it.each([
        // when cursor before delimiter
        {
          inputCaret: [12],
          inputText: '1',
          outputText: '(AS)-123-XYZ-14-56',
          outputCaret: 14,
        },
        // when typing such that cursor lands before delimiter.
        {
          defaultModel: '(A',
          inputCaret: [2],
          inputText: 'S',
          outputText: '(AS)-',
          outputCaret: 5,
        },
        // when typing in the middle of input
        {
          inputCaret: [13],
          inputText: '1',
          outputText: '(AS)-123-XYZ-14-56',
          outputCaret: 14,
        },
        // when selected in the middle
        {
          inputCaret: [9, 11],
          inputText: 'A',
          outputText: '(AS)-123-AZ4-56-7',
          outputCaret: 10,
        },
        // when selected such that one character before, one at and one after delimiter
        {
          inputCaret: [11, 14],
          inputText: '1',
          outputText: '(AS)-123-XY1-56-7',
          outputCaret: 13,
        },
      ])('should work as expected when typing', async ({ defaultModel, inputText, inputCaret, outputText, outputCaret }) => {
        const { input, model, insertCaretAt } = renderComponent({ defaultModel })

        await insertCaretAt(inputCaret[0], inputCaret[1])

        await userEvent.type(input, inputText)

        expect(model.value).toBe(outputText)
        expect(input.selectionStart).toBe(outputCaret)
      })
    })

    describe('Backward Delete / Backspace', () => {
      it.each([
        // when backspace is pressed
        {
          defaultMask: '####',
          defaultModel: '1234',
          inputCaret: [3],
          outputText: '124',
          outputCaret: 2,
        },
        // when backspace pressed when cursor is after delimiter
        {
          defaultMask: '##-##',
          defaultModel: '12-34',
          inputCaret: [3],
          outputText: '12-34',
          outputCaret: 2,
        },
        // backspace pressed such that cursor lands after delimiter
        {
          defaultMask: '##-##',
          defaultModel: '12-34',
          inputCaret: [4],
          outputText: '12-4',
          outputCaret: 2,
        },
        // backspace pressed in the middle of input
        {
          inputCaret: [15],
          outputText: '(AS)-123-XYZ-46-7',
          outputCaret: 14,
        },
        // backspace pressed with selection in middle
        {
          inputCaret: [10, 12],
          outputText: '(AS)-123-X45-67-',
          outputCaret: 10,
        },
        // backspace pressed with selection containing one character before, one at and one after delimiter
        {
          inputCaret: [11, 14],
          outputText: '(AS)-123-XY5-67-',
          outputCaret: 11,
        },
      ])('should work as expected when pressing backspace', async ({ defaultModel, defaultMask, inputCaret, outputText, outputCaret }) => {
        const { input, model, insertCaretAt } = renderComponent({ defaultModel, defaultMask })

        await insertCaretAt(inputCaret[0], inputCaret[1])

        await userEvent.type(input, '{backspace}')
        expect(model.value).toBe(outputText)
        expect(input.selectionStart).toBe(outputCaret)
      })
    })

    describe('Forward Delete', () => {
      it.each([
        // when forward delete is pressed
        {
          defaultMask: '####',
          defaultModel: '1234',
          inputCaret: [2],
          outputText: '124',
          outputCaret: 2,
        },
        // when forward delete pressed when cursor is after delimiter
        {
          defaultMask: '##-##',
          defaultModel: '12-34',
          inputCaret: [3],
          outputText: '12-4',
          outputCaret: 3,
        },
        // forward delete pressed in the middle of input
        {
          inputCaret: [14],
          outputText: '(AS)-123-XYZ-46-7',
          outputCaret: 14,
        },
        // forward delete pressed with selection in middle
        {
          inputCaret: [10, 12],
          outputText: '(AS)-123-X45-67-',
          outputCaret: 10,
        },
        // forward delete pressed with selection containing one character before, one at and one after delimiter
        {
          inputCaret: [11, 14],
          outputText: '(AS)-123-XY5-67-',
          outputCaret: 11,
        },
      ])('should work as expected when pressing delete', async ({ defaultModel, defaultMask, inputCaret, outputText, outputCaret }) => {
        const { input, model, insertCaretAt } = renderComponent({ defaultModel, defaultMask })

        await insertCaretAt(inputCaret[0], inputCaret[1])

        await userEvent.type(input, '{delete}')
        expect(model.value).toBe(outputText)
        expect(input.selectionStart).toBe(outputCaret)
      })
    })

    describe('Cut', () => {
      it.each([
        // when cut with selection in middle
        {
          inputCaret: [10, 12],
          outputText: '(AS)-123-X45-67-',
          outputCaret: 10,
        },
        // when cut with selection containing one character before, one at and one after delimiter
        {
          inputCaret: [11, 14],
          outputText: '(AS)-123-XY5-67-',
          outputCaret: 11,
        },
      ])('should work as expected when pressing cut', async ({ inputCaret, outputText, outputCaret }) => {
        const { input, model, insertCaretAt } = renderComponent()

        await insertCaretAt(inputCaret[0], inputCaret[1])

        await userEvent.keyboard('{Ctrl>}x{/Ctrl}')
        expect(model.value).toBe(outputText)
        expect(input.selectionStart).toBe(outputCaret)
      })
    })

    describe('Paste', () => {
      it.each([
        // pasted when cursor is at end
        {
          defaultMask: '####',
          defaultModel: '12',
          inputText: '34',
          inputCaret: [2],
          outputText: '1234',
          outputCaret: 4,
        },
        // pasted when cursor is in middle
        {
          defaultMask: '#####',
          defaultModel: '1245',
          inputText: '3',
          inputCaret: [2],
          outputText: '12345',
          outputCaret: 3,
        },
        // pasted when cursor is after delimiter
        {
          defaultModel: '(AS)-123-XYZ-',
          inputText: '12',
          inputCaret: [13],
          outputText: '(AS)-123-XYZ-12-',
          outputCaret: 16,
        },
        // pasted when cursor is before delimiter
        {
          defaultMask: '##-##',
          defaultModel: '12-',
          inputText: '34',
          inputCaret: [2],
          outputText: '12-34',
          outputCaret: 5,
        },
        // pasted when selection is in middle
        {
          inputCaret: [10, 12],
          inputText: 'CD',
          outputText: '(AS)-123-XCD-45-67',
          outputCaret: 13,
        },
        // pasted when selection is in middle
        {
          inputCaret: [1, 3],
          inputText: 'CD',
          outputText: '(CD)-123-XYZ-45-67',
          outputCaret: 5,
        },
        // pasted with junk delimiters when selection is in middle
        {
          inputCaret: [1, 3],
          inputText: '_CD',
          outputText: '(CD)-123-XYZ-45-67',
          outputCaret: 5,
        },
        // pasted when selection contains one character before, one at and one after delimiter
        {
          inputCaret: [11, 14],
          inputText: 'A0',
          outputText: '(AS)-123-XYA-05-67',
          outputCaret: 14,
        },
      ])('should work as expected when pasting', async ({ defaultModel, defaultMask, inputText, inputCaret, outputText, outputCaret }) => {
        const { input, model, insertCaretAt } = renderComponent({ defaultModel, defaultMask })

        navigator.clipboard.writeText(inputText)

        await insertCaretAt(inputCaret[0], inputCaret[1])
        await userEvent.paste()

        expect(model.value).toBe(outputText)
        expect(input.selectionStart).toBe(outputCaret)
      })
    })
  })
})
