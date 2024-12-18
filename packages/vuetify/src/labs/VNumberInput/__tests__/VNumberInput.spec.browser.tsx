// Components
import { VNumberInput } from '../VNumberInput'
import { VForm } from '@/components/VForm'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'


describe('VNumberInput', () => {
  it.each([
    { typing: '---', expected: '-' }, // "-" is only allowed once
    { typing: '1-', expected: '1' }, // "-" is only at the start
    { typing: '.', expected: '.' }, // "." is allowed at the start
    { typing: '..', expected: '.' }, // "." is only allowed once
    { typing: '1...0', expected: '1.0' }, // "." is only allowed once
    { typing: '123.45.67', expected: '123.4567' }, // "." is only allowed once
    { typing: 'ab-c8+.iop9', expected: '-8.9' } // Only numbers, "-", "." are allowed to type in
  ])('prevents NaN from arbitrary input', async ({ typing, expected }) => {
    const { element } = render(VNumberInput)
    await userEvent.click(element)
    await userEvent.keyboard(typing)
    expect(screen.getByCSS('input')).toHaveValue(expected)
  })

  it('resets v-model to null when click:clear is triggered', async () => {
    const model = ref(5)
    render(() => (
      <VNumberInput
        clearable
        v-model={model.value}
        readonly
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
        v-model={model.value}
        min={5}
        max={125}
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
        <VNumberInput v-model={model.value} readonly/>
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
          <VNumberInput v-model={model.value}/>
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
            v-model={value1.value}
            min={0}
            max={50}
            readonly
          />
          <VNumberInput
            class="readonly-input-2"
            v-model={value2.value}
            min={0}
            max={50}
            readonly
          />
          <VNumberInput
            class="disabled-input-1"
            v-model={value3.value}
            min={0}
            max={10}
            disabled
          />
          <VNumberInput
            class="disabled-input-2"
            v-model={value4.value}
            min={0}
            max={10}
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

  describe('boundary value handling', () => {
    it('should respect max value and fallback to max safe integer if max is out of range or cannot be parsed', () => {
      const value1 = ref(20)
      const value2 = ref(Number.MAX_SAFE_INTEGER + 1)
      const value3 = ref(Number.MAX_SAFE_INTEGER + 1)

      render(() => (
        <>
          <VNumberInput max={15} v-model={value1.value} class="max-within-range"/>
          <VNumberInput max={Number.MAX_SAFE_INTEGER + 2} v-model={value2.value} class="max-outof-range1"/>
          <VNumberInput max="Infinity" v-model={value3.value} class="max-outof-range2"/>
        </>
      ))

      nextTick(() => {
        // clamping the native input can be read after next tick

        expect(screen.getByCSS('.max-within-range input')).toHaveValue('15')
        expect(value1.value).toBe(15)

        expect(screen.getByCSS('.max-outof-range1 input')).toHaveValue(Number.MAX_SAFE_INTEGER.toString())
        expect(value2.value).toBe(Number.MAX_SAFE_INTEGER)

        expect(screen.getByCSS('.max-outof-range2 input')).toHaveValue(Number.MAX_SAFE_INTEGER.toString())
        expect(value3.value).toBe(Number.MAX_SAFE_INTEGER)
      })
    })

    it('should respect min value and fallback to min safe integer if min is out of range or cannot be parsed', () => {
      const value1 = ref(2)
      const value2 = ref(Number.MIN_SAFE_INTEGER - 1)
      const value3 = ref(Number.MIN_SAFE_INTEGER - 1)

      render(() => (
        <>
          <VNumberInput min={5} v-model={value1.value} class="min-range-within-range"/>
          <VNumberInput min={Number.MIN_SAFE_INTEGER - 2} v-model={value2.value} class="min-range-fallback1"/>
          <VNumberInput min="-Infinity" v-model={value3.value} class="min-range-fallback2"/>
        </>
      ))

      nextTick(() => {
        // clamping the native input can be read after next tick

        expect(screen.getByCSS('.min-range-within-range input')).toHaveValue('5')
        expect(value1.value).toBe(5)

        expect(screen.getByCSS('.min-range-fallback1 input')).toHaveValue(Number.MIN_SAFE_INTEGER.toString())
        expect(value2.value).toBe(Number.MIN_SAFE_INTEGER)

        expect(screen.getByCSS('.min-range-fallback2 input')).toHaveValue(Number.MIN_SAFE_INTEGER.toString())
        expect(value3.value).toBe(Number.MIN_SAFE_INTEGER)
      })
    })
  })

  describe('native number input quirks', () => {
    it('supports decimal step', async () => {
      const model = ref(0)
      render(() => (
        <VNumberInput
          step={0.03}
          v-model={model.value}
        />
      ))

      await userEvent.click(screen.getByTestId('increment'))
      expect.element(screen.getByCSS('input')).toHaveValue('0.03')
      expect(model.value).toBe(0.03)

      await userEvent.click(screen.getByTestId('increment'))
      expect.element(screen.getByCSS('input')).toHaveValue('0.06')
      expect(model.value).toBe(0.06)

      await userEvent.click(screen.getByTestId('decrement'))
      expect.element(screen.getByCSS('input')).toHaveValue('0.03')
      expect(model.value).toBe(0.03)

      await userEvent.click(screen.getByTestId('decrement'))
      expect.element(screen.getByCSS('input')).toHaveValue('0')
      expect(model.value).toBe(0)
    })
  })
})
