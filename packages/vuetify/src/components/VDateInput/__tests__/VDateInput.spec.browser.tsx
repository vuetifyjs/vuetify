// Components
import { VDateInput } from '../VDateInput'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VDateInput', () => {
  it('should not fire @update:focus twice when clicking bottom of input', async () => {
    const onFocus = vi.fn()
    const { element } = render(() => (
      <VDateInput onUpdate:focused={ onFocus } />
    ))

    await userEvent.click(element, { position: { x: 92, y: 55 } })

    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it('accepts keyboard input even if the picker is hidden', async () => {
    const model = ref<Date | null>(null)
    const { element } = render(() => <VDateInput v-model={ model.value } />)

    await userEvent.click(element)
    await expect.poll(() => screen.getByCSS('.v-picker')).toBeVisible()

    await userEvent.keyboard('{Escape}') // hide picker, but keep the focus

    await expect.poll(() => screen.getByCSS('.v-picker')).not.toBeVisible()

    const input = screen.getByCSS('input')
    await userEvent.type(input, '02/20/2022{Enter}')

    expect(model.value).toBeDefined()
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
    expect(formatter.format(model.value!)).toBe('Feb 20, 2022')
  })

  describe('separators', () => {
    it('should insert separators while typing', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.type(input, '12252025')

      expect(input).toHaveValue('12/25/2025')
    })

    it('should follow inputFormat and ignore separators typed by the user', async () => {
      const { element } = render(() => <VDateInput inputFormat="DD-MM-YYYY" modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.type(input, '25.12.2025')

      expect(input).toHaveValue('25-12-2025')
    })

    it('should close a section when its first digit cannot start one', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.type(input, '4526')

      expect(input).toHaveValue('04/05/26')

      await userEvent.click(document.body)
      expect(input).toHaveValue('04/05/2026')
    })

    it('should not block backspace on a separator', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.type(input, '1225')
      expect(input).toHaveValue('12/25/')

      await userEvent.keyboard('{Backspace}{Backspace}')
      expect(input).toHaveValue('12/2')
    })

    it('should mask a pasted date', async () => {
      const model = ref<Date | null>(null)
      const { element } = render(() => <VDateInput v-model={ model.value } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      const lock = await commands.getLock()
      await navigator.clipboard.writeText('12252025')
      await userEvent.paste()
      await commands.releaseLock(lock)

      expect(input).toHaveValue('12/25/2025')

      await userEvent.click(document.body)
      expect(model.value).toStrictEqual(new Date(2025, 11, 25))
    })

    it('should mask a value typed over the selected one', async () => {
      const { element } = render(() => <VDateInput modelValue={ new Date(2025, 4, 16) } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      expect(input).toHaveValue('05/16/2025')

      input.setSelectionRange(0, input.value.length)
      await userEvent.keyboard('11222023')

      expect(input).toHaveValue('11/22/2023')
    })

    it.each([
      { selection: [0, 2], typing: '02', expected: '02/31/2030' },
      { selection: [1, 1], typing: '1', expected: '11/31/2030' },
      { selection: [3, 5], typing: '15', expected: '12/15/2030' },
      { selection: [6, 10], typing: '2031', expected: '12/31/2031' },
      // a typed separator moves on to the next section instead of shifting the value
      { selection: [0, 0], typing: '1/2', expected: '12/21/2030' },
      // overflowing input stops at the end of the value
      { selection: [6, 6], typing: '203099', expected: '12/31/2030' },
    ])('should overwrite $typing at $selection', async ({ selection, typing, expected }) => {
      const model = ref<Date | null>(new Date(2030, 11, 31))
      const { element } = render(() => <VDateInput v-model={ model.value } />)

      await userEvent.click(element)
      const input = screen.getByCSS<HTMLInputElement>('input')
      expect(input).toHaveValue('12/31/2030')

      input.setSelectionRange(selection[0], selection[1])
      await userEvent.keyboard(typing)

      expect(input).toHaveValue(expected)
    })

    it('should keep the caret after the overwritten digit', async () => {
      const { element } = render(() => <VDateInput modelValue={ new Date(2030, 11, 31) } />)

      await userEvent.click(element)
      const input = screen.getByCSS<HTMLInputElement>('input')

      // the caret steps over the separator on its own
      input.setSelectionRange(1, 1)
      await userEvent.keyboard('1')
      expect(input.selectionStart).toBe(3)

      await userEvent.keyboard('2')
      expect(input).toHaveValue('11/21/2030')
      expect(input.selectionStart).toBe(4)
    })

    it.each([
      { props: { readonly: true } },
      { props: { updateOn: [] } },
    ])('should not mask with $props', async ({ props }) => {
      const { element } = render(() => (
        <VDateInput { ...props } modelValue={ new Date(2025, 4, 16) } />
      ))

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.keyboard('4526')

      expect(input).toHaveValue('05/16/2025')
    })

    it.each([
      { typing: '0512202505142025', expected: '05/12/2025, 05/14/2025' },
      { typing: '05/12/2025 05/14/2025', expected: '05/12/2025, 05/14/2025' },
      { typing: '5/12/25 5/14/25', expected: '05/12/25, 05/14/25' },
    ])('should separate a list while typing $typing', async ({ typing, expected }) => {
      const model = ref<Date[]>([])
      const { element } = render(() => <VDateInput v-model={ model.value } multiple />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.keyboard(typing)
      expect(input).toHaveValue(expected)

      await userEvent.click(document.body)
      expect(input).toHaveValue('2 selected')
      expect(model.value).toHaveLength(2)
    })

    it.each([
      { typing: '0512202505142025', expected: '05/12/2025 - 05/14/2025' },
      { typing: '05/12/2025 - 05/14/2025', expected: '05/12/2025 - 05/14/2025' },
      { typing: '5/12/25 - 5/14/25', expected: '05/12/25 - 05/14/25' },
    ])('should insert separators of a range while typing $typing', async ({ typing, expected }) => {
      const model = ref<Date[]>([])
      const { element } = render(() => <VDateInput v-model={ model.value } multiple="range" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.keyboard(typing)
      expect(input).toHaveValue(expected)

      await userEvent.click(document.body)
      expect(input).toHaveValue('05/12/2025 - 05/14/2025')
      expect(model.value).toHaveLength(2)
    })

    it.each([
      { props: {}, expected: 'mm/dd/yyyy' },
      { props: { multiple: 'range' as const }, expected: 'mm/dd/yyyy - mm/dd/yyyy' },
      { props: { multiple: 'range' as const, inputFormat: 'dd.mm.yyyy' }, expected: 'dd.mm.yyyy - dd.mm.yyyy' },
      { props: { multiple: true }, expected: 'mm/dd/yyyy, ...' },
      { props: { multiple: 'range' as const, placeholder: 'pick two' }, expected: 'pick two' },
    ])('should hint the expected format with $expected', ({ props, expected }) => {
      render(() => <VDateInput { ...props } modelValue={ props.multiple ? [] : null } />)

      expect(screen.getByCSS('input')).toHaveAttribute('placeholder', expected)
    })

    it('should keep a single typed date as a one day range', async () => {
      const model = ref<Date[]>([])
      const { element } = render(() => <VDateInput v-model={ model.value } multiple="range" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.keyboard('05122025')
      expect(input).toHaveValue('05/12/2025')

      await userEvent.click(document.body)
      expect(input).toHaveValue('05/12/2025 - 05/12/2025')
    })

    it.each([
      { typing: '05/01/2025', expected: '05/10/2025' },
      { typing: '05/25/2025', expected: '05/20/2025' },
      { typing: '05/15/2025', expected: '05/15/2025' },
    ])('should clamp $typing typed between min and max', async ({ typing, expected }) => {
      const { element } = render(() => (
        <VDateInput min="2025-05-10" max="2025-05-20" modelValue={ null } />
      ))

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.keyboard(typing)
      await userEvent.click(document.body)

      expect(input).toHaveValue(expected)
    })
  })

  describe('range selection with visible actions', () => {
    it('should not ignore the first click', async () => {
      const model = ref(['2026-06-05', '2026-06-15'])
      const updates: any[] = []
      const { element } = render(() => (
        <VDateInput
          v-model={ model.value }
          onUpdate:modelValue={ (v: any) => updates.push(v) }
          hideActions={ false }
          multiple="range"
        />
      ))

      await userEvent.click(element)
      await expect.poll(() => screen.getByCSS('.v-picker')).toBeVisible()
      expect(document.querySelectorAll('.v-date-picker-month__day--selected')).toHaveLength(11)

      await userEvent.click(screen.getByCSS('[data-v-date="2026-06-08"]'))
      expect(document.querySelectorAll('.v-date-picker-month__day--selected')).toHaveLength(1)

      // nothing is committed to the parent until the user confirms
      expect(updates).toHaveLength(0)
    })
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
        const { element, emitted } = render(
          <VDateInput
            inputFormat={ format }
            modelValue={ null }
          />
        )

        await userEvent.click(element)
        await userEvent.keyboard(input)
        await userEvent.keyboard('{Enter}')

        const date = emitted<Date[]>('update:modelValue')![0][0]
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
        const { element, emitted } = render(<VDateInput
          inputFormat={ format }
          modelValue={ null }
        />)

        await userEvent.click(element)
        await userEvent.keyboard(input)
        await userEvent.keyboard('{Enter}')

        expect(emitted('update:modelValue')).toBeFalsy()
      })
    })

    it(`should reset if empty string is inputted`, async () => {
      const { emitted, getByRole } = render(
        <VDateInput
          modelValue={ new Date() }
        />
      )

      const input = getByRole('textbox')
      await userEvent.clear(input)
      await userEvent.keyboard('{Enter}')

      const date = emitted<Date[]>('update:modelValue')![0][0]
      expect(date).toBeNull()
    })
  })

  describe('update-on prop', () => {
    const TEST_DATE = '05/21/2025'

    it('should update modelValue only on enter key press', async () => {
      const { element, emitted } = render(
        <VDateInput
          updateOn={['enter']}
          modelValue={ null }
        />
      )

      await userEvent.click(element)
      await userEvent.keyboard(TEST_DATE)

      await userEvent.keyboard('{Enter}')
      expect(emitted('update:modelValue')).toBeTruthy()

      await userEvent.tab()
      expect(emitted('update:modelValue')).toHaveLength(1)
    })

    it('should update modelValue only on blur event', async () => {
      const { element, emitted } = render(
        <VDateInput
          updateOn={['blur']}
          modelValue={ null }
        />
      )

      await userEvent.click(element)
      await userEvent.keyboard(TEST_DATE)

      await userEvent.keyboard('{Enter}')
      expect(emitted('update:modelValue')).toBeFalsy()

      await userEvent.tab()
      expect(emitted('update:modelValue')).toBeTruthy()
    })

    it('should update modelValue on both enter key press and blur event', async () => {
      const { element, emitted } = render(
        <VDateInput
          updateOn={['enter', 'blur']}
          modelValue={ null }
        />
      )

      await userEvent.click(element)
      await userEvent.keyboard(TEST_DATE)

      await userEvent.keyboard('{Enter}')
      expect(emitted('update:modelValue')).toBeTruthy()

      await userEvent.tab()
      expect(emitted('update:modelValue')).toHaveLength(2)
    })

    it('should make the input readonly and prevent value updates', async () => {
      const { element, emitted, getByRole } = render(
        <VDateInput
          updateOn={[]}
          modelValue={ null }
        />
      )

      const input = getByRole<HTMLInputElement>('textbox')
      expect(input).toHaveAttribute('readonly')
      expect(input.readOnly).toBe(true)

      await userEvent.click(element)
      await userEvent.keyboard(TEST_DATE)
      await userEvent.keyboard('{Enter}')
      await userEvent.tab()

      expect(emitted('update:modelValue')).toBeFalsy()
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
