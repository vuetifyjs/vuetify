// Components
import { VDateInput } from '../VDateInput'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { createVuetify } from '@/framework'

describe('VDateInput', () => {
  const vuetify = createVuetify()

  afterEach(() => {
    vi.clearAllMocks()
  })

  function mountFunction (component: any, options = {}) {
    return mount(component, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  it('should not fire @update:focus twice when clicking bottom of input', async () => {
    const onFocus = vi.fn()
    const { element } = render(() => (
      <VDateInput  onUpdate:focused={ onFocus } />
    ))

    await userEvent.click(element, { y: 1 })

    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it('accepts keyboard input even if the picker is hidden', async () => {
    const model = ref<Date | null>(null)
    const { element } = render(() => <VDateInput v-model={ model.value } />)

    await userEvent.click(element)
    await commands.waitStable('.v-picker')
    expect(screen.getByCSS('.v-picker')).toBeVisible()

    await userEvent.keyboard('{Escape}') // hide picker, but keep the focus

    await commands.waitStable('.v-picker')
    expect(screen.getByCSS('.v-picker')).not.toBeVisible()

    const input = screen.getByCSS('input') as HTMLInputElement
    await userEvent.type(input, '02/20/2022{Enter}')

    expect(model.value).toBeDefined()
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
    expect(formatter.format(model.value!)).toBe('Feb 20, 2022')
  })

  describe('parseDateString', () => {
    const testCases = [
      {
        format: 'YYYY-MM-DD',
        input: '2024-03-15',
        expected: { year: 2024, month: 2, day: 15 },
      },
      {
        format: 'MM/DD/YYYY',
        input: '03/15/2024',
        expected: { year: 2024, month: 2, day: 15 },
      },
      {
        format: 'DD-MM-YYYY',
        input: '15-03-2024',
        expected: { year: 2024, month: 2, day: 15 },
      },
      {
        format: 'YYYY-MM-DD',
        input: '2023-02-29',
        expected: { year: 2023, month: 2, day: 1 },
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-02-29',
        expected: { year: 2024, month: 1, day: 29 },
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-12-31',
        expected: { year: 2024, month: 11, day: 31 },
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-01-01',
        expected: { year: 2024, month: 0, day: 1 },
      },
    ]

    testCases.forEach(({ format, input, expected }) => {
      it(`should select date with ${format} format`, async () => {
        const wrapper = mountFunction(
          <VDateInput
            inputFormat={ format }
            modelValue={ null }
          />
        )

        const inputElement = wrapper.find('input')
        await inputElement.trigger('click')
        await inputElement.trigger('focus')
        await inputElement.setValue(input)
        await inputElement.trigger('keydown', { key: 'Enter' })

        const date = wrapper.emitted('update:modelValue')![0][0] as Date
        expect(date.getFullYear()).toBe(expected.year)
        expect(date.getMonth()).toBe(expected.month)
        expect(date.getDate()).toBe(expected.day)
      })
    })

    const invalidTestCases = [
      {
        format: 'YYYY-MM-DD',
        input: 'invalid-date',
        description: 'invalid date string',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-13-45',
        description: 'out of range date',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-00-01',
        description: 'zero month',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-01-00',
        description: 'zero day',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-12-32',
        description: 'day exceeds 31',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-13-01',
        description: 'month exceeds year length',
      },
    ]

    invalidTestCases.forEach(({ format, input, description }) => {
      it(`should handle ${description}`, async () => {
        const wrapper = mountFunction(
          <VDateInput
            inputFormat={ format }
            modelValue={ null }
          />
        )

        const inputElement = wrapper.find('input')
        await inputElement.trigger('click')
        await inputElement.trigger('focus')
        await inputElement.setValue(input)
        await inputElement.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      })
    })

    it(`should reset if empty string is inputted`, async () => {
      const wrapper = mountFunction(
        <VDateInput
          modelValue={ new Date() }
        />
      )

      const inputElement = wrapper.find('input')
      await inputElement.trigger('click')
      await inputElement.trigger('focus')
      await inputElement.setValue('')
      await inputElement.trigger('keydown', { key: 'Enter' })

      const date = wrapper.emitted('update:modelValue')![0][0] as Date
      expect(date).toBeNull()
    })
  })

  describe('update-on prop', () => {
    const TEST_DATE = '05/21/2025'

    it('should update modelValue only on enter key press', async () => {
      const wrapper = mountFunction(
        <VDateInput
          updateOn={['enter']}
          modelValue={ null }
        />
      )
      const input = wrapper.find('input')

      await input.trigger('click')
      await input.trigger('focus')
      await input.setValue(TEST_DATE)

      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()

      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })

    it('should update modelValue only on blur event', async () => {
      const wrapper = mountFunction(
        <VDateInput
          updateOn={['blur']}
          modelValue={ null }
        />
      )
      const input = wrapper.find('input')

      await input.trigger('click')
      await input.trigger('focus')
      await input.setValue(TEST_DATE)

      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()

      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('should update modelValue on both enter key press and blur event', async () => {
      const wrapper = mountFunction(
        <VDateInput
          updateOn={['enter', 'blur']}
          modelValue={ null }
        />
      )
      const input = wrapper.find('input')

      await input.trigger('click')
      await input.trigger('focus')
      await input.setValue(TEST_DATE)

      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()

      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
    })

    it('should make the input readonly and prevent value updates', async () => {
      const wrapper = mountFunction(
        <VDateInput
          updateOn={[]}
          modelValue={ null }
        />
      )
      const input = wrapper.find('input')

      expect(input.attributes('readonly')).toBeDefined()
      expect(input.element.readOnly).toBe(true)

      await input.trigger('click')
      await input.trigger('focus')

      await input.setValue(TEST_DATE)
      await input.trigger('keydown', { key: 'Enter' })
      await input.trigger('blur')

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })

  describe('typing values', () => {
    it.each([
      { multiple: false, typing: '07/01/2022', expected: '07/01/2022' },
      { multiple: false, typing: '4/15/26', expected: '04/15/2026' },
      { multiple: 'range', typing: '07/01/2022', expected: '07/01/2022 - 07/01/2022' },
      { multiple: 'range', typing: '4/15/26', expected: '04/15/2026 - 04/15/2026' },
      { multiple: 'range', typing: '05/02/2025 - 05/14/2025', expected: '05/02/2025 - 05/14/2025' },
      { multiple: true, typing: '07/01/2022', expected: '1 selected' },
      { multiple: true, typing: '05/02/2025 05/14/2025', expected: '2 selected' },
      { multiple: true, typing: '4/15/25 04/22/25 04/15/25', expected: '3 selected' },
    ])('should accept pasted and typed values', async ({ multiple, typing, expected }) => {
      const { element } = render(() => <VDateInput multiple={ multiple } />)
      const input = screen.getByCSS('input')
      await userEvent.click(element)
      await userEvent.keyboard(typing)
      await userEvent.click(document.body)
      expect(input).toHaveValue(expected)
    })

    it.each([
      { format: 'yyyy-mm-dd', multiple: false, typing: '2022-01-07', expected: '2022-01-07' },
      { format: 'yyyy-mm-dd', multiple: false, typing: '26-4-15', expected: '2026-04-15' },
      { format: 'yyyy-mm-dd', multiple: 'range', typing: '2022-01-07', expected: '2022-01-07 - 2022-01-07' },
      { format: 'yyyy-mm-dd', multiple: 'range', typing: '26-4-15', expected: '2026-04-15 - 2026-04-15' },
      { format: 'dd.mm.yyyy', multiple: 'range', typing: '01.05.2025 - 22.05.2025', expected: '01.05.2025 - 22.05.2025' },
      { format: 'yyyy-mm-dd', multiple: true, typing: '2022-01-07', expected: '1 selected' },
      { format: 'dd.mm.yyyy', multiple: true, typing: '01.05.2025 22.05.2025', expected: '2 selected' },
      { format: 'dd.mm.yyyy', multiple: true, typing: ' 03.05.25 05.05.25  07.05.25 ', expected: '3 selected' },
    ])('should accept pasted and typed values with custom format', async ({ format, multiple, typing, expected }) => {
      const { element } = render(() => <VDateInput multiple={ multiple } inputFormat={ format } />)
      const input = screen.getByCSS('input')
      await userEvent.click(element)
      await userEvent.keyboard(typing)
      await userEvent.click(document.body)
      expect(input).toHaveValue(expected)
    })

    it.each([
      { multiple: false, initial: '05/16/2025', typing: '←←←←←×2', expected: '05/12/2025' },
      { multiple: 'range', initial: '05/16/2025 - 05/24/2025', typing: '←←←←←××3', expected: '05/03/2025 - 05/16/2025' },
    ])('should accept changes typed from keyboard', async ({ multiple, initial, typing, expected }) => {
      const { element } = render(() => <VDateInput multiple={ multiple } />)
      const input = screen.getByCSS('input')
      await userEvent.click(element)
      await userEvent.keyboard(`${initial}{Enter}`)
      expect(input).toHaveValue(initial)
      const typingSequence = typing
        .replaceAll('←', '{ArrowLeft}')
        .replaceAll('×', '{Backspace}')
      await userEvent.keyboard(typingSequence)
      await userEvent.click(document.body)
      expect(input).toHaveValue(expected)
    })
  })
})
