// Components
import { VDateTimeInput } from '../VDateTimeInput'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'
import { ko } from '@/locale'

describe('VDateTimeInput', () => {
  it('should insert date and time separators while typing', async () => {
    const { element } = render(() => <VDateTimeInput modelValue={ null } format="24hr" />)

    await userEvent.click(element)
    const input = screen.getByCSS('input')
    await userEvent.type(input, '122520251430')

    expect(input).toHaveValue('12/25/2025 14:30')
  })

  it('should hint the date in letters and the time in dashes', async () => {
    const { element } = render(() => <VDateTimeInput modelValue={ null } format="24hr" />)

    const input = screen.getByCSS('input')
    expect(input).toHaveAttribute('placeholder', 'mm/dd/yyyy --:--')

    await userEvent.click(element)
    const hint = screen.getByCSS('.v-date-time-input__format-hint')
    expect(hint).toHaveTextContent('mm/dd/yyyy --:--')

    await userEvent.type(input, '1225')
    expect(hint).toHaveTextContent('12/25/yyyy --:--')

    await userEvent.type(input, '202514')
    expect(hint).toHaveTextContent('12/25/2025 14:--')
  })

  it('should expand a two digit year like VDateInput', async () => {
    const { element } = render(() => <VDateTimeInput modelValue={ null } format="24hr" />)

    await userEvent.click(element)
    const input = screen.getByCSS('input')
    await userEvent.type(input, '4/5/26 9:30')

    expect(input).toHaveValue('04/05/2026 09:30')
  })

  it('should commit a typed datetime on blur', async () => {
    const model = ref<Date | null>(null)
    const { element } = render(() => <VDateTimeInput v-model={ model.value } format="24hr" />)

    await userEvent.click(element)
    const input = screen.getByCSS('input')
    await userEvent.type(input, '051620251530')
    await userEvent.click(document.body)

    expect(model.value).toStrictEqual(new Date(2025, 4, 16, 15, 30))
    expect(input).toHaveValue('05/16/2025 15:30')
  })

  it('should pick a time from the list', async () => {
    const model = ref<Date | null>(new Date(2030, 11, 31, 0, 0))
    const { element } = render(() => <VDateTimeInput v-model={ model.value } timeInterval={ 60 } format="24hr" />)

    await userEvent.click(element)
    await expect.poll(() => screen.getByCSS('.v-date-time-input__times')).toBeVisible()

    await userEvent.click(screen.getByText('14:00'))

    expect(model.value).toStrictEqual(new Date(2030, 11, 31, 14, 0))
    await expect.poll(() => screen.getByCSS('.v-date-time-input__times')).not.toBeVisible()
  })

  it('should overwrite inside a complete value', async () => {
    const { element } = render(() => (
      <VDateTimeInput modelValue={ new Date(2030, 11, 31, 13, 30) } format="24hr" />
    ))

    await userEvent.click(element)
    const input = screen.getByCSS('input') as HTMLInputElement
    expect(input).toHaveValue('12/31/2030 13:30')

    input.setSelectionRange(11, 13)
    await userEvent.keyboard('09')

    expect(input).toHaveValue('12/31/2030 09:30')
  })

  it('should add the period once the time is typed', async () => {
    const model = ref<Date | null>(null)
    const { element } = render(() => <VDateTimeInput v-model={ model.value } format="ampm" />)

    const input = screen.getByCSS('input')
    expect(input).toHaveAttribute('placeholder', 'mm/dd/yyyy --:-- --')

    await userEvent.click(element)
    await userEvent.type(input, '122520250230')
    expect(input).toHaveValue('12/25/2025 02:30')

    await userEvent.keyboard('p')
    expect(input).toHaveValue('12/25/2025 02:30 PM')

    await userEvent.click(document.body)
    expect(model.value).toStrictEqual(new Date(2025, 11, 25, 14, 30))
  })

  it('should put a localized period between the date and the time', async () => {
    const model = ref<Date | null>(new Date(2025, 11, 25, 14, 30))
    const { element } = render(() => <VDateTimeInput v-model={ model.value } format="ampm" />, null, {
      locale: { locale: 'ko', messages: { ko } },
    })

    const input = screen.getByCSS('input') as HTMLInputElement
    expect(input.value).toMatch(/ 오후 02:30$/)

    await userEvent.click(element)
    input.setSelectionRange(input.value.length - 2, input.value.length)
    await userEvent.keyboard('45{Enter}')

    expect(input.value).toMatch(/ 오후 02:45$/)
    expect(model.value).toStrictEqual(new Date(2025, 11, 25, 14, 45))
  })
})
