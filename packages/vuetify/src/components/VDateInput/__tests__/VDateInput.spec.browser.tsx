// Components
import { VDateInput } from '../VDateInput'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { ref } from 'vue'
import { ar } from '@/locale'

function pad (v: number) {
  return String(v).padStart(2, '0')
}

function iso (date?: Date | null) {
  return date ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` : null
}

function keys (typing: string) {
  return typing
    .replaceAll('←', '{ArrowLeft}')
    .replaceAll('→', '{ArrowRight}')
    .replaceAll('×', '{Backspace}')
}

async function pasteText (text: string) {
  const lock = await commands.getLock()
  await navigator.clipboard.writeText(text)
  await userEvent.paste()
  await commands.releaseLock(lock)
}

describe('VDateInput', () => {
  it('should close the picker when tabbing out of the field', async () => {
    const menu = ref(false)
    render(() => (
      <>
        <button data-testid="before">before</button>
        <VDateInput v-model:menu={ menu.value } />
        <button data-testid="after">after</button>
      </>
    ))

    const input = screen.getByCSS('.v-date-input input[type="text"]')

    await userEvent.click(input)
    await expect.poll(() => menu.value).toBe(true)

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    await expect.poll(() => menu.value).toBe(false)
    expect(document.activeElement).toBe(screen.getByTestId('before'))

    await userEvent.click(input)
    await expect.poll(() => menu.value).toBe(true)

    await userEvent.keyboard('{Tab}')
    await expect.poll(() => menu.value).toBe(false)
    expect(document.activeElement).toBe(screen.getByTestId('after'))
  })

  it('should keep only the focused field open when both use open-on-focus', async () => {
    const menuA = ref(false)
    const menuB = ref(false)
    render(() => (
      <>
        <VDateInput label="A" openOnFocus v-model:menu={ menuA.value } />
        <VDateInput label="B" openOnFocus v-model:menu={ menuB.value } />
      </>
    ))

    const inputs = screen.getAllByCSS('.v-date-input input[type="text"]')

    inputs[0].focus()
    await expect.poll(() => menuA.value).toBe(true)
    await expect.poll(() => menuB.value).toBe(false)

    await userEvent.keyboard('{Tab}')
    await expect.poll(() => document.activeElement).toBe(inputs[1])
    await expect.poll(() => menuA.value).toBe(false)
    await expect.poll(() => menuB.value).toBe(true)

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    await expect.poll(() => document.activeElement).toBe(inputs[0])
    await expect.poll(() => menuA.value).toBe(true)
    await expect.poll(() => menuB.value).toBe(false)
  })

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

    expect(iso(model.value)).toBe('2022-02-20')
  })

  it('should reset when the value is cleared', async () => {
    const model = ref('2025-05-21')
    const { emitted, getByRole } = render(<VDateInput v-model={ model.value } />)

    await userEvent.clear(getByRole('textbox'))
    await userEvent.keyboard('{Enter}')

    expect(emitted<Date[]>('update:modelValue')[0][0]).toBeNull()
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

  describe('input format', () => {
    it.each([
      { format: 'YYYY-MM-DD', typing: '2024-03-15', expected: '2024-03-15' },
      { format: 'MM/DD/YYYY', typing: '03/15/2024', expected: '2024-03-15' },
      { format: 'DD-MM-YYYY', typing: '15-03-2024', expected: '2024-03-15' },
      { format: 'YYYY-MM-DD', typing: '2024-01-01', expected: '2024-01-01' },
      { format: 'YYYY-MM-DD', typing: '2024-12-31', expected: '2024-12-31' },
      { format: 'YYYY-MM-DD', typing: '2024-02-29', expected: '2024-02-29' },
      // a February the year cannot hold is capped
      { format: 'YYYY-MM-DD', typing: '2023-02-29', expected: '2023-02-28' },
    ])('should commit $typing typed as $format', async ({ format, typing, expected }) => {
      const { element, emitted } = render(<VDateInput inputFormat={ format } modelValue={ null } />)

      await userEvent.click(element)
      await userEvent.keyboard(`${typing}{Enter}`)

      expect(iso(emitted<Date[]>('update:modelValue')?.[0]?.[0])).toBe(expected)
    })

    it.each(['invalid-date', '2024-01-00'])('should not commit %s', async typing => {
      const { element, emitted } = render(<VDateInput inputFormat="YYYY-MM-DD" modelValue={ null } />)

      await userEvent.click(element)
      await userEvent.keyboard(`${typing}{Enter}`)

      expect(emitted('update:modelValue')).toBeFalsy()
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

  describe('guided typing', () => {
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

    it('should mask a pasted date', async () => {
      const model = ref<Date | null>(null)
      const { element } = render(() => <VDateInput v-model={ model.value } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await pasteText('12252025')

      expect(input).toHaveValue('12/25/2025')

      await userEvent.click(document.body)
      expect(iso(model.value)).toBe('2025-12-25')
    })

    it('should ignore characters outside the format', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      await userEvent.keyboard('1a2b.c d3')

      expect(input).toHaveValue('12/3')
    })

    it('should close the section being typed on the arrow the value grows towards', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement

      await userEvent.keyboard('1{ArrowRight}52026')

      expect(input).toHaveValue('01/05/2026')
    })

    it('should move the caret with an arrow pressed inside the value', async () => {
      const { element } = render(() => <VDateInput modelValue="2030-12-31" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement

      input.setSelectionRange(0, 0)
      await userEvent.keyboard('{ArrowRight}')

      expect(input).toHaveValue('12/31/2030')
      expect(input.selectionStart).toBe(1)
    })

    it.each([
      { props: { readonly: true } },
      { props: { updateOn: [] } },
    ])('should not mask with $props', async ({ props }) => {
      const { element } = render(() => (
        <VDateInput { ...props } modelValue="2025-05-16" />
      ))

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.keyboard('4526')

      expect(input).toHaveValue('05/16/2025')
    })

    it.each([
      { typing: '0512202505142025', expected: '05/12/2025, 05/14/2025' },
      { typing: '05/12/2025 05/14/2025', expected: '05/12/2025, 05/14/2025' },
      { typing: '5/12/25 5/14/25', expected: '05/12/2025, 05/14/25' },
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
      { typing: '5/12/25 - 5/14/25', expected: '05/12/2025 - 05/14/25' },
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

    // the field is filled from the end it starts reading at, whatever the format shows there
    describe('rtl', () => {
      async function typeInRtl (locale = 'en', messages?: any) {
        const { element } = render(() => <VDateInput modelValue={ null } />, null, {
          locale: { locale, rtl: { [locale]: true }, messages: messages && { [locale]: messages } },
        })

        await userEvent.click(element)

        const input = screen.getByCSS('input') as HTMLInputElement
        const hint = screen.getByCSS('.v-date-input__format-hint')

        // what the hint still asks for, the rest of it mirrors the typed value
        return { input, hint, left: () => hint.textContent!.slice(input.value.length) }
      }

      it('should fill the section the format shows last', async () => {
        const { input, left } = await typeInRtl()

        await userEvent.keyboard('2026')
        expect(input).toHaveValue('/2026')
        expect(left()).toBe('mm/dd')

        await userEvent.keyboard('25')
        expect(input).toHaveValue('/25/2026')
        expect(left()).toBe('mm')

        await userEvent.keyboard('12')
        expect(input).toHaveValue('12/25/2026')
        expect(left()).toBe('')
      })

      it('should fill a day first format from its day', async () => {
        const { input, left } = await typeInRtl('ar', ar)

        await userEvent.keyboard('1')
        expect(input).toHaveValue('1')
        expect(left()).toBe('yyyy/mm/d')

        await userEvent.keyboard('2')
        expect(input).toHaveValue('/12')
        expect(left()).toBe('yyyy/mm')

        await userEvent.keyboard('1')
        expect(input).toHaveValue('1/12')
        expect(left()).toBe('yyyy/m')

        await userEvent.keyboard('2')
        expect(input).toHaveValue('/12/12')
        expect(left()).toBe('yyyy')

        await userEvent.keyboard('2026')
        expect(input).toHaveValue('2026/12/12')
        expect(left()).toBe('')

        await userEvent.click(document.body)
        expect(input).toHaveValue('2026/12/12')
      })

      it('should close a section that cannot take another digit', async () => {
        const { input } = await typeInRtl('ar', ar)

        // 4 is the 4th, 2 could still be the 24th
        await userEvent.keyboard('4')
        expect(input).toHaveValue('/04')

        await userEvent.keyboard('2')
        expect(input).toHaveValue('/02/04')
      })

      it('should close the section being typed on the arrow the value grows towards', async () => {
        const { input } = await typeInRtl()

        await userEvent.keyboard('20262')
        expect(input).toHaveValue('2/2026')

        await userEvent.keyboard('{ArrowLeft}1')
        expect(input).toHaveValue('1/02/2026')

        await userEvent.keyboard('{ArrowLeft}')
        expect(input).toHaveValue('01/02/2026')
      })

      it('should keep hinting a year the mask fills in from the century', async () => {
        const { input, left } = await typeInRtl()

        await userEvent.keyboard('2025')
        input.setSelectionRange(1, 2)
        await userEvent.keyboard('{Backspace}')

        expect(input).toHaveValue('/025')
        expect(left()).toBe('mm/dd')
      })

      it('should wait in front of a date typed to its end', async () => {
        const { input } = await typeInRtl()

        await userEvent.keyboard('1999')
        expect(input).toHaveValue('/1999')
        expect(input.selectionStart).toBe(0)

        await userEvent.keyboard('54')
        expect(input).toHaveValue('04/05/1999')
        expect(input.selectionStart).toBe(0)
      })

      it.each([
        // a caret between sections belongs to the one in front of it, where the value grows
        { selection: [2, 2], typing: '2', expected: '02/05/1999' },
        { selection: [5, 5], typing: '2', expected: '03/02/1999' },
        // with every section filled the front one is overwritten, the same as it would be in ltr
        { selection: [0, 0], typing: '1', expected: '12/05/1999' },
        { selection: [3, 5], typing: '6', expected: '03/06/1999' },
        { selection: [0, 0], paste: '08/05/2026', expected: '08/05/2026' },
      ])('should type $typing$paste at $selection', async ({ selection, typing, paste, expected }) => {
        const { element } = render(() => <VDateInput modelValue="03/05/1999" />, null, {
          locale: { locale: 'en', rtl: { en: true } },
        })

        await userEvent.click(element)
        const input = screen.getByCSS('input') as HTMLInputElement
        expect(input).toHaveValue('03/05/1999')

        input.setSelectionRange(selection[0], selection[1])
        await (paste ? pasteText(paste) : userEvent.keyboard(typing!))

        expect(input).toHaveValue(expected)
      })

      it.each([
        { typing: '91' },
        { paste: '91' },
        { paste: '9/1' },
      ])('should overwrite $typing$paste over a selection', async ({ typing, paste }) => {
        const { element } = render(() => <VDateInput modelValue="07/20/2026" />, null, {
          locale: { locale: 'en', rtl: { en: true } },
        })

        await userEvent.click(element)
        const input = screen.getByCSS('input') as HTMLInputElement
        expect(input).toHaveValue('07/20/2026')

        input.setSelectionRange(1, 4)
        await (paste ? pasteText(paste) : userEvent.keyboard(typing!))

        expect(input).toHaveValue('09/10/2026')
      })

      it('should leave the caret in front of a pasted date', async () => {
        const { input } = await typeInRtl()

        await pasteText('08/10/2026')

        expect(input).toHaveValue('08/10/2026')
        // nothing is left to type, so the caret waits where the next section would go
        expect(input.selectionStart).toBe(0)
      })

      it('should hand the caret to the section in front when one is replaced', async () => {
        const { element } = render(() => <VDateInput modelValue="1990-04-03" />, null, {
          locale: { locale: 'en', rtl: { en: true } },
        })

        await userEvent.click(element)
        const input = screen.getByCSS('input') as HTMLInputElement
        expect(input).toHaveValue('04/03/1990')

        input.setSelectionRange(3, 3)
        await userEvent.keyboard('1')
        expect(input).toHaveValue('04/13/1990')
        expect(input.selectionStart).toBe(4)

        // the day is full, the month is the section typed after it
        await userEvent.keyboard('5')
        expect(input).toHaveValue('04/15/1990')
        expect(input.selectionStart).toBe(0)

        await userEvent.keyboard('12')
        expect(input).toHaveValue('12/15/1990')
      })

      it('should fill a range starting with the date that reads first', async () => {
        const model = ref<Date[]>([])
        const { element } = render(() => <VDateInput v-model={ model.value } multiple="range" />, null, {
          locale: { locale: 'en', rtl: { en: true } },
        })

        await userEvent.click(element)
        const input = screen.getByCSS('input') as HTMLInputElement

        await userEvent.keyboard('20251205')
        expect(input).toHaveValue('05/12/2025')

        // the second date is typed in front of the first one, the same way the sections are
        await userEvent.keyboard('20251405')
        expect(input).toHaveValue('05/14/2025 - 05/12/2025')

        await userEvent.click(document.body)
        expect(input).toHaveValue('05/14/2025 - 05/12/2025')
        expect(model.value).toHaveLength(2)
      })

      it('should retype a year digit taken out of the date that reads second', async () => {
        const { element } = render(() => <VDateInput modelValue={['2025-12-22', '2026-01-03']} multiple="range" />, null, {
          locale: { locale: 'ar', rtl: { ar: true }, messages: { ar } },
        })

        await userEvent.click(element)
        const input = screen.getByCSS('input') as HTMLInputElement
        expect(input).toHaveValue('2026/01/03 - 2025/12/22')

        input.setSelectionRange(17, 17)
        await userEvent.keyboard('{Backspace}4')

        expect(input).toHaveValue('2026/01/03 - 2024/12/22')
      })

      it('should fill a list in front of the dates already typed', async () => {
        const model = ref<Date[]>([])
        const { element } = render(() => <VDateInput v-model={ model.value } multiple />, null, {
          locale: { locale: 'en', rtl: { en: true } },
        })

        await userEvent.click(element)
        const input = screen.getByCSS('input') as HTMLInputElement

        await userEvent.keyboard('2025120520251405')
        expect(input).toHaveValue('05/14/2025, 05/12/2025')

        await userEvent.click(document.body)
        expect(input).toHaveValue('2 selected')
        expect(model.value).toHaveLength(2)
      })

      it('should hold the value against the end it grows away from', async () => {
        const { input, hint } = await typeInRtl()

        await userEvent.keyboard('2026')

        const span = hint.querySelector('span')!

        // the sections fill towards the front, so the value is anchored at the back
        expect(getComputedStyle(input).direction).toBe('ltr')
        expect(getComputedStyle(input).textAlign).toBe('right')
        expect(span.getBoundingClientRect().right).toBeCloseTo(input.getBoundingClientRect().right, 0)
      })
    })
  })

  describe('format hint', () => {
    it.each<{ props: VDateInput['$props'], expected: string }>([
      { props: {}, expected: 'mm/dd/yyyy' },
      { props: { multiple: 'range' }, expected: 'mm/dd/yyyy - mm/dd/yyyy' },
      { props: { multiple: 'range', inputFormat: 'dd.mm.yyyy' }, expected: 'dd.mm.yyyy - dd.mm.yyyy' },
      { props: { multiple: true }, expected: 'mm/dd/yyyy, ...' },
      { props: { multiple: 'range', placeholder: 'pick two' }, expected: 'pick two' },
    ])('should hint the expected format with $expected', ({ props, expected }) => {
      render(() => <VDateInput { ...props } modelValue={ props.multiple ? [] : null } />)

      expect(screen.getByCSS('input')).toHaveAttribute('placeholder', expected)
    })

    it.each<{ props: VDateInput['$props'], keys: string, expected: string }>([
      { props: {}, keys: '1225', expected: '12/25/yyyy' },
      { props: { multiple: 'range' }, keys: '1225202501', expected: '12/25/2025 - 01/dd/yyyy' },
      { props: { multiple: 'range' }, keys: '41526 ', expected: '04/15/2026 - mm/dd/yyyy' },
      { props: { multiple: true }, keys: '122520250', expected: '12/25/2025, 0m/dd/yyyy' },
    ])('should underlay the format left to type with $expected', async ({ props, keys, expected }) => {
      const { element } = render(() => <VDateInput { ...props } />)

      expect(screen.queryByCSS('.v-date-input__format-hint')).toBeNull()

      await userEvent.click(element)
      await userEvent.keyboard(keys)

      expect(screen.getByCSS('.v-date-input__format-hint')).toHaveTextContent(expected)
    })

    it.each([
      { typing: '2←←×', value: '2/', expected: '2/dd/yyyy' },
      { typing: '1205←←×', value: '12/5/', expected: '12/5/yyyy' },
      { typing: '2×', value: '02', expected: '02/dd/yyyy' },
      { typing: '24×', value: '02/04', expected: '02/04/yyyy' },
      { typing: '522←××', value: '05//', expected: '05//yyyy' },
    ])('should hint the format left to type over $value', async ({ typing, value, expected }) => {
      const { element } = render(() => <VDateInput />)

      await userEvent.click(element)
      await userEvent.keyboard(keys(typing))

      expect(screen.getByCSS('input')).toHaveValue(value)
      expect(screen.getByCSS('.v-date-input__format-hint')).toHaveTextContent(expected)
    })

    it.each([
      { typing: '2025←←←←×', value: '025/', expected: '025/mm/dd' },
      { typing: '20251←←←←←×', value: '025/1', expected: '025/1m/dd' },
    ])('should hint the format left over a year the mask fills in from the century', async ({ typing, value, expected }) => {
      const { element } = render(() => <VDateInput inputFormat="yyyy/mm/dd" />)

      await userEvent.click(element)
      await userEvent.keyboard(keys(typing))

      expect(screen.getByCSS('input')).toHaveValue(value)
      expect(screen.getByCSS('.v-date-input__format-hint')).toHaveTextContent(expected)
    })
  })

  describe('input edits', () => {
    it('should not block backspace on a separator', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input')
      await userEvent.type(input, '1225')
      expect(input).toHaveValue('12/25/')

      await userEvent.keyboard('{Backspace}{Backspace}')
      expect(input).toHaveValue('12/2')
    })

    it('should mask a value typed over the selected one', async () => {
      const { element } = render(() => <VDateInput modelValue="2025-05-16" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      expect(input).toHaveValue('05/16/2025')

      input.setSelectionRange(0, input.value.length)
      await userEvent.keyboard('11222023')

      expect(input).toHaveValue('11/22/2023')
    })

    it.each([
      { selection: [3, 5], typing: '15', expected: '12/15/2030' },
      { selection: [6, 10], typing: '2031', expected: '12/31/2031' },
      // a typed separator moves on to the next section instead of shifting the value
      { selection: [0, 0], typing: '1/2', expected: '12/21/2030' },
    ])('should overwrite $typing at $selection', async ({ selection, typing, expected }) => {
      const { element } = render(() => <VDateInput modelValue="2030-12-31" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      expect(input).toHaveValue('12/31/2030')

      input.setSelectionRange(selection[0], selection[1])
      await userEvent.keyboard(typing)

      expect(input).toHaveValue(expected)
    })

    it('should keep the sections after the one typed over with fewer digits', async () => {
      const model = ref<Date[]>([])
      const { element } = render(() => <VDateInput v-model={ model.value } multiple />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      await userEvent.keyboard('0201202402052024')
      expect(input).toHaveValue('02/01/2024, 02/05/2024')

      // February closes a day that starts with 3, the dates around it stay untouched
      input.setSelectionRange(3, 5)
      await userEvent.keyboard('3')
      expect(input).toHaveValue('02/03/2024, 02/05/2024')
    })

    it('should insert instead of overwriting an incomplete section', async () => {
      const { element } = render(() => <VDateInput modelValue="2002-02-05" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      expect(input).toHaveValue('02/05/2002')

      input.setSelectionRange(8, 8)
      await userEvent.keyboard('{Delete}3')

      expect(input).toHaveValue('02/05/2032')
    })

    it('should type into a section emptied by delete', async () => {
      const { element } = render(() => <VDateInput modelValue="2012-01-05" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      expect(input).toHaveValue('01/05/2012')

      input.setSelectionRange(3, 5)
      await userEvent.keyboard('{Delete}')
      expect(input).toHaveValue('01//2012')

      await userEvent.keyboard('1')
      expect(input).toHaveValue('01/1/2012')
      expect(input.selectionStart).toBe(4)

      await userEvent.keyboard('2')
      expect(input).toHaveValue('01/12/2012')
      expect(input.selectionStart).toBe(6)
    })

    it('should delete forward through a section of repeated digits', async () => {
      const { element } = render(() => (
        <VDateInput inputFormat="dd.mm.yyyy" modelValue="2024-02-22" />
      ))

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement

      input.setSelectionRange(0, 0)
      await userEvent.keyboard('{Delete}')
      expect(input).toHaveValue('2.02.2024')
      expect(input.selectionStart).toBe(0)

      await userEvent.keyboard('{Delete}')
      expect(input).toHaveValue('.02.2024')
    })

    it('should keep the year in place when the sections before it are removed', async () => {
      const { element } = render(() => <VDateInput modelValue="2025-05-05" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement

      input.setSelectionRange(0, 5)
      await userEvent.keyboard('{Delete}')
      expect(input).toHaveValue('//2025')
      expect(screen.getByCSS('.v-date-input__format-hint')).toHaveTextContent('//2025')

      await userEvent.keyboard('3')
      expect(input).toHaveValue('03//2025')
      expect(input.selectionStart).toBe(3)
    })

    it('should keep the caret after the overwritten digit', async () => {
      const { element } = render(() => <VDateInput modelValue="2030-12-15" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement

      // the caret steps over the separator on its own
      input.setSelectionRange(1, 1)
      await userEvent.keyboard('1')
      expect(input.selectionStart).toBe(3)

      await userEvent.keyboard('2')
      expect(input).toHaveValue('11/25/2030')
      expect(input.selectionStart).toBe(4)
    })

    it('should keep the separators when deleting by word', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      await userEvent.keyboard('12252025')

      await userEvent.keyboard('{Control>}{Backspace}{/Control}')
      expect(input).toHaveValue('12/25/')

      input.setSelectionRange(0, 0)
      await userEvent.keyboard('{Control>}{Delete}{/Control}')
      expect(input).toHaveValue('/25/')
    })

    it('should keep the separators when deleting across them', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      await userEvent.keyboard('12252025')

      input.setSelectionRange(2, 6)
      await userEvent.keyboard('{Backspace}')
      expect(input).toHaveValue('12//2025')
      expect(input.selectionStart).toBe(2)
    })

    it('should start over when the whole value is replaced', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      await userEvent.keyboard('12252025')

      await userEvent.keyboard('{Control>}a{/Control}{Backspace}')
      expect(input).toHaveValue('')

      await userEvent.keyboard('3')
      expect(input).toHaveValue('03/')
    })

    it('should cut and paste a section', async () => {
      const { element } = render(() => <VDateInput modelValue={ null } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      await userEvent.keyboard('12252025')

      const lock = await commands.getLock()
      input.setSelectionRange(3, 5)
      await userEvent.cut()
      expect(input).toHaveValue('12//2025')

      input.setSelectionRange(3, 3)
      await userEvent.paste()
      await commands.releaseLock(lock)
      expect(input).toHaveValue('12/25/2025')
    })

    it('should replace a section selected by double click', async () => {
      const { element } = render(() => <VDateInput modelValue="2025-12-25" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement

      await userEvent.dblClick(input)
      expect(input.selectionStart).toBe(6)
      expect(input.selectionEnd).toBe(10)

      await userEvent.keyboard('7')
      expect(input).toHaveValue('12/25/7')
    })

    it('should delete a whole date from a list', async () => {
      const model = ref<Date[]>([])
      const { element } = render(() => <VDateInput v-model={ model.value } multiple />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      await userEvent.keyboard('1225202501022026')
      expect(input).toHaveValue('12/25/2025, 01/02/2026')

      input.setSelectionRange(12, 22)
      await userEvent.keyboard('{Backspace}')
      expect(input).toHaveValue('12/25/2025, ')

      await userEvent.keyboard('{Backspace}{Backspace}')
      expect(input).toHaveValue('12/25/2025')

      await userEvent.click(document.body)
      expect(model.value).toHaveLength(1)
    })

    it.each([
      // a selection that spans separators leaves the sections it does not empty in place
      { from: '12/25/2025', selection: [2, 5], typing: '9', expected: '12/09/2025' },
      { from: '12/25/2025', selection: [2, 6], typing: '9', expected: '12/09/2025' },
      { from: '12/25/2025', selection: [3, 6], typing: '9', expected: '12/09/2025' },
      { from: '12/25/2025', selection: [2, 5], typing: '×9', expected: '12/09/2025' },
      { from: '12/25/2025', selection: [2, 6], typing: '×9', expected: '12/09/2025' },
      { from: '12/25/2025', selection: [3, 6], typing: '×9', expected: '12/09/2025' },
      { from: '12/25/2025', selection: [1, 4], typing: '7', expected: '12/05/2025' },
      { from: '12/25/2025', selection: [1, 4], typing: '×7', expected: '12/05/2025' },
      { from: '12/25/2025', selection: [1, 5], typing: '7', expected: '12//2025' },
      { from: '12/25/2025', selection: [1, 5], typing: '×7', expected: '12//2025' },
      // the digit left behind keeps its place, the next one is typed in front of it
      { from: '08/20/2026', selection: [1, 4], typing: '×91', expected: '09/10/2026' },
      // a zero holds the caret in its section until the caret leaves, then it takes the minimum
      { from: '08/20/2026', selection: [1, 2], typing: '0', expected: '0/20/2026' },
      { from: '08/20/2026', selection: [1, 2], typing: '05', expected: '05/20/2026' },
      { from: '08/20/2026', selection: [1, 2], typing: '0→', expected: '01/20/2026' },
    ])('should type $typing over $selection of $from', async ({ from, selection, typing, expected }) => {
      const { element } = render(() => <VDateInput modelValue={ from } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      expect(input).toHaveValue(from)

      input.setSelectionRange(selection[0], selection[1])
      await userEvent.keyboard(keys(typing))

      expect(input).toHaveValue(expected)
    })

    it.each([
      { from: '12/25/2025', selection: [0, 0], typing: '9', expected: '09/25/2025' },
      { from: '12/25/2025', selection: [3, 3], typing: '9', expected: '12/09/2025' },
      { from: '12/25/2025', selection: [1, 1], typing: '9', expected: '09/25/2025' },
      // a digit the section can hold is written where it was typed, whatever the mask makes of the rest
      { from: '12/25/2025', selection: [0, 0], typing: '1', expected: '12/25/2025' },
      { from: '12/25/2025', selection: [6, 6], typing: '9', expected: '12/25/9025' },
    ])('should start a section over when the overwritten digit does not fit', async ({ from, selection, typing, expected }) => {
      const { element } = render(() => <VDateInput modelValue={ from } />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement

      input.setSelectionRange(selection[0], selection[1])
      await userEvent.keyboard(typing)

      expect(input).toHaveValue(expected)
    })

    it.each(['91', '9/1', '910'])('should paste %s over a selection', async paste => {
      const { element } = render(() => <VDateInput modelValue="08/20/2026" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement

      input.setSelectionRange(1, 4)
      await pasteText(paste)

      expect(input).toHaveValue('09/10/2026')
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
      await userEvent.keyboard(keys(typing))
      await userEvent.click(document.body)
      expect(input).toHaveValue(expected)
    })
  })

  describe('auto-correct', () => {
    it.each([
      ['2024-13-45', '2024-12-04'],
      ['2024-12-32', '2024-12-31'],
      ['2024-13-01', '2024-12-01'],
    ])('should correct %s while typing', async (input, expected) => {
      const { element } = render(<VDateInput inputFormat="YYYY-MM-DD" modelValue={ null } />)

      await userEvent.click(element)
      await userEvent.keyboard(input)

      expect(screen.getByCSS('input')).toHaveValue(expected)
    })

    it('should bump a zero section to its minimum once it is left', async () => {
      const { element, emitted } = render(<VDateInput inputFormat="YYYY-MM-DD" modelValue={ null } />)

      await userEvent.click(element)
      await userEvent.keyboard('2024-00-01')

      expect(screen.getByCSS('input')).toHaveValue('2024-01-01')
      await userEvent.keyboard('{Enter}')

      expect(emitted('update:modelValue')).toBeTruthy()
    })

    it('should reopen a section typed over with fewer digits', async () => {
      const { element } = render(() => (
        <VDateInput inputFormat="dd.mm.yyyy" modelValue="2024-02-22" />
      ))

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      expect(input).toHaveValue('22.02.2024')

      input.setSelectionRange(0, 2)
      await userEvent.keyboard('3')
      expect(input).toHaveValue('3.02.2024')

      await userEvent.keyboard('1')
      expect(input).toHaveValue('29.02.2024')
    })

    it.each([
      // a day the overwritten month cannot hold is capped, the month stays as typed
      { selection: [0, 2], typing: '02', expected: '02/28/2030' },
      { selection: [1, 1], typing: '1', expected: '11/30/2030' },
      // overflowing input stops at the end of the value
      { selection: [6, 6], typing: '203099', expected: '12/31/2030' },
    ])('should cap $typing overwritten at $selection', async ({ selection, typing, expected }) => {
      const { element } = render(() => <VDateInput modelValue="2030-12-31" />)

      await userEvent.click(element)
      const input = screen.getByCSS('input') as HTMLInputElement
      expect(input).toHaveValue('12/31/2030')

      input.setSelectionRange(selection[0], selection[1])
      await userEvent.keyboard(typing)

      expect(input).toHaveValue(expected)
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
  })
})
