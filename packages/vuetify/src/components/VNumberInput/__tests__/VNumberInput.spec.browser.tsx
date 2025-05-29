// Components
import { VNumberInput } from '../VNumberInput'
import { VForm } from '@/components/VForm'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VNumberInput', () => {
  it.each([
    { precision: 0, typing: '---', expected: '-' }, // "-" is only allowed once
    { precision: 0, typing: '1-', expected: '1' }, // "-" is only at the start
    { precision: 1, typing: '.', expected: '.' }, // "." is allowed at the start
    { precision: 1, typing: '..', expected: '.' }, // "." is only allowed once
    { precision: 1, typing: '1...0', expected: '1.0' }, // "." is only allowed once
    { precision: 4, typing: '123.45.67', expected: '123.4567' }, // "." is only allowed once
    { precision: 1, typing: 'ab-c8+.iop9', expected: '-8.9' }, // Only numbers, "-", "." are allowed to type in
  ])('prevents NaN from arbitrary input', async ({ precision, typing, expected }) => {
    const { element } = render(() => <VNumberInput precision={ precision } />)
    await userEvent.click(element)
    await userEvent.keyboard(typing)
    expect(screen.getByCSS('input')).toHaveValue(expected)
  })

  it('resets v-model to null when click:clear is triggered', async () => {
    const model = ref(5)
    render(() => (
      <VNumberInput
        clearable
        v-model={ model.value }
      />
    ))

    await userEvent.click(screen.getByLabelText('Clear'))
    expect(model.value).toBeNull()
  })

  // https://github.com/vuetifyjs/vuetify/issues/20337
  it('emits model-value when input value is a legit number within range of the max and min', async () => {
    const model = ref(null)
    const { element } = render(() => (
      <VNumberInput
        v-model={ model.value }
        min={ 5 }
        max={ 125 }
      />
    ))

    await userEvent.click(element)
    await userEvent.keyboard('1')
    expect(model.value).toBeNull()

    await userEvent.keyboard('0')
    expect(model.value).toBe(10)

    await userEvent.keyboard('0')
    expect(model.value).toBe(100)

    await userEvent.keyboard('0')
    expect(model.value).toBe(100)

    await userEvent.click(document.body)
    expect(model.value).toBe(125)
  })

  describe('readonly', () => {
    it('prevents mutation when readonly', async () => {
      const model = ref(1)

      const { element } = render(() => (
        <VNumberInput v-model={ model.value } readonly />
      ))

      await userEvent.click(screen.getByTestId('increment'))
      expect(model.value).toBe(1)

      await userEvent.click(screen.getByTestId('decrement'))
      expect(model.value).toBe(1)

      await userEvent.click(element)
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe(1)

      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe(1)
    })

    it('prevents mutation in readonly form', async () => {
      const model = ref(1)

      const { element } = render(() => (
        <VForm readonly>
          <VNumberInput v-model={ model.value } />
        </VForm>
      ))

      await userEvent.click(screen.getByTestId('increment'))
      expect(model.value).toBe(1)

      await userEvent.click(screen.getByTestId('decrement'))
      expect(model.value).toBe(1)

      await userEvent.click(element)
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe(1)

      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe(1)
    })

    it('keeps original value when readonly or disabled', async () => {
      const value1 = ref(120)
      const value2 = ref(-15)
      const value3 = ref(40.4)
      const value4 = ref(-8.6)

      render(() => (
        <>
          <VNumberInput
            class="readonly-input-1"
            v-model={ value1.value }
            min={ 0 }
            max={ 50 }
            readonly
          />
          <VNumberInput
            class="readonly-input-2"
            v-model={ value2.value }
            min={ 0 }
            max={ 50 }
            readonly
          />
          <VNumberInput
            class="disabled-input-1"
            v-model={ value3.value }
            precision={ 1 }
            min={ 0 }
            max={ 10 }
            disabled
          />
          <VNumberInput
            class="disabled-input-2"
            v-model={ value4.value }
            precision={ 1 }
            min={ 0 }
            max={ 10 }
            disabled
          />
        </>
      ))

      expect(screen.getByCSS('.readonly-input-1 input')).toHaveValue('120')
      expect(screen.getByCSS('.readonly-input-2 input')).toHaveValue('-15')
      expect(screen.getByCSS('.disabled-input-1 input')).toHaveValue('40.4')
      expect(screen.getByCSS('.disabled-input-2 input')).toHaveValue('-8.6')
    })
  })

  describe('native number input quirks', () => {
    it('should not bypass min', async () => {
      const model = ref(1)
      render(() =>
        <VNumberInput min={ 5 } max={ 15 } v-model={ model.value } />
      )

      await expect.element(screen.getByCSS('input')).toHaveValue('5')
      expect(model.value).toBe(5)
    })

    it('should not bypass max', async () => {
      const model = ref(20)
      render(() =>
        <VNumberInput min={ 5 } max={ 15 } v-model={ model.value } />
      )

      await expect.element(screen.getByCSS('input')).toHaveValue('15')
      expect(model.value).toBe(15)
    })

    it('supports decimal step', async () => {
      const model = ref(0)
      render(() => (
        <VNumberInput
          step={ 0.03 }
          precision={ 2 }
          v-model={ model.value }
        />
      ))

      await userEvent.click(screen.getByTestId('increment'))
      await expect.element(screen.getByCSS('input')).toHaveValue('0.03')
      expect(model.value).toBe(0.03)

      await userEvent.click(screen.getByTestId('increment'))
      await expect.element(screen.getByCSS('input')).toHaveValue('0.06')
      expect(model.value).toBe(0.06)

      await userEvent.click(screen.getByTestId('decrement'))
      await expect.element(screen.getByCSS('input')).toHaveValue('0.03')
      expect(model.value).toBe(0.03)

      await userEvent.click(screen.getByTestId('decrement'))
      await expect.element(screen.getByCSS('input')).toHaveValue('0.00')
      expect(model.value).toBe(0)
    })

    it('shows custom decimal separator when incrementing', async () => {
      const model = ref(0)
      render(() => (
        <VNumberInput
          step={ 0.07 }
          precision={ 2 }
          decimalSeparator=","
          v-model={ model.value }
        />
      ))

      await userEvent.click(screen.getByTestId('increment'))
      await expect.element(screen.getByCSS('input')).toHaveValue('0,07')
      expect(model.value).toBe(0.07)

      await userEvent.click(screen.getByTestId('increment'))
      await expect.element(screen.getByCSS('input')).toHaveValue('0,14')
      expect(model.value).toBe(0.14)

      await userEvent.click(screen.getByTestId('decrement'))
      await expect.element(screen.getByCSS('input')).toHaveValue('0,07')
      expect(model.value).toBe(0.07)

      await userEvent.click(screen.getByTestId('decrement'))
      await expect.element(screen.getByCSS('input')).toHaveValue('0,00')
      expect(model.value).toBe(0)
    })
  })

  describe('accepts digits from pasted text', () => {
    it.each([
      { precision: 0, text: '-00123', expected: -123 },
      { precision: 2, text: '.250', expected: 0.25 },
      { precision: 3, text: '000.321', expected: 0.321 },
      { precision: 0, text: '100.99', expected: 100 },
      { precision: 1, text: '200.99', expected: 200.9 },
      { precision: 2, text: ' 1,250.32\n', expected: 1250.32 },
      { precision: 0, text: '1\'024.00 meters', expected: 1024 },
      { precision: 0, text: '- 1123.', expected: -1123 },
    ])('should parse numbers correctly', async ({ precision, text, expected }) => {
      const model = ref(null)
      const { element } = render(() => (
        <VNumberInput
          v-model={ model.value }
          precision={ precision }
        />
      ))
      const input = element.querySelector('input') as HTMLInputElement
      input.focus()
      navigator.clipboard.writeText(text)
      await userEvent.paste()
      input.blur()
      expect(model.value).toBe(expected)
    })

    it.each([
      { sep: ',', precision: 0, text: '-00123', expected: -123 },
      { sep: ',', precision: 2, text: ',250', expected: 0.25 },
      { sep: ',', precision: 3, text: '000,321', expected: 0.321 },
      { sep: ',', precision: 0, text: '100,99', expected: 100 },
      { sep: ',', precision: 1, text: '200,99', expected: 200.9 },
      { sep: ',', precision: 2, text: ' 1,250.32\n', expected: 1.25 },
      { sep: ',', precision: 0, text: '1\'024.00 meters', expected: 102400 },
      { sep: ',', precision: 0, text: '- 1123.', expected: -1123 },
      { sep: ',', precision: 0, text: '- 32,', expected: -32 },
    ])('should parse numbers with custom separator', async ({ sep, precision, text, expected }) => {
      const model = ref(null)
      const { element } = render(() => (
        <VNumberInput
          v-model={ model.value }
          decimalSeparator={ sep }
          precision={ precision }
        />
      ))
      const input = element.querySelector('input') as HTMLInputElement
      input.focus()
      navigator.clipboard.writeText(text)
      await userEvent.paste()
      input.blur()
      expect(model.value).toBe(expected)
    })
  })

  describe('fraction digits control', () => {
    it.each([
      { precision: 2, minFractionDigits: null, typing: '.312', expected: '0.31' },
      { precision: 2, minFractionDigits: null, typing: '12.', expected: '12.00' },
      { precision: 0, minFractionDigits: 0, typing: '42', expected: '42' },
      { precision: 0, minFractionDigits: 1, typing: '-1.321', expected: '-1321' }, // dot is ignored while typing
      { precision: 0, minFractionDigits: 1, typing: '2', expected: '2' },
      { precision: 0, minFractionDigits: 3, typing: '31.9', expected: '319' }, // dot is ignored while typing
      { precision: 5, minFractionDigits: 3, typing: '-92.21', expected: '-92.210' },
      { precision: 5, minFractionDigits: 3, typing: '-92.2132', expected: '-92.2132' },
      { precision: 5, minFractionDigits: 3, typing: '-92.21325555', expected: '-92.21325' },
      { precision: null, minFractionDigits: 0, typing: '8', expected: '8' },
      { precision: null, minFractionDigits: 1, typing: '8', expected: '8.0' },
      { precision: null, minFractionDigits: 2, typing: '-1.5', expected: '-1.50' },
      { precision: null, minFractionDigits: 2, typing: '-1.521', expected: '-1.521' },
    ])('applies flexible limit on fraction digits', async ({ precision, minFractionDigits, typing, expected }) => {
      const { element } = render(() => <VNumberInput precision={ precision } minFractionDigits={ minFractionDigits } />)
      await userEvent.click(element)
      await userEvent.keyboard(typing)
      await userEvent.click(document.body)
      expect(screen.getByCSS('input')).toHaveValue(expected)
    })
  })
})
