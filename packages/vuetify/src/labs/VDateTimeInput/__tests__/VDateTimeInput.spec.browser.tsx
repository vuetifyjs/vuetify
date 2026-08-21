// Components
import { VDateTimeInput } from '../VDateTimeInput'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VDateTimeInput', () => {
  it('should insert date and time separators while typing', async () => {
    const { element } = render(() => <VDateTimeInput modelValue={ null } />)

    await userEvent.click(element)
    const input = screen.getByCSS('input')
    await userEvent.type(input, '122520251430')

    expect(input).toHaveValue('12/25/2025 14:30')
  })

  it('should commit a typed datetime on blur', async () => {
    const model = ref<Date | null>(null)
    const { element } = render(() => <VDateTimeInput v-model={ model.value } />)

    await userEvent.click(element)
    const input = screen.getByCSS('input')
    await userEvent.type(input, '051620251530')
    await userEvent.click(document.body)

    expect(model.value).toStrictEqual(new Date(2025, 4, 16, 15, 30))
    expect(input).toHaveValue('05/16/2025 15:30')
  })

  it('should pick a time from the list', async () => {
    const model = ref<Date | null>(new Date(2030, 11, 31, 0, 0))
    const { element } = render(() => <VDateTimeInput v-model={ model.value } timeInterval={ 60 } />)

    await userEvent.click(element)
    await expect.poll(() => screen.getByCSS('.v-date-time-input__times')).toBeVisible()

    await userEvent.click(screen.getByText('14:00'))

    expect(model.value).toStrictEqual(new Date(2030, 11, 31, 14, 0))
    await expect.poll(() => screen.getByCSS('.v-date-time-input__times')).not.toBeVisible()
  })

  it('should overwrite inside a complete value', async () => {
    const { element } = render(() => (
      <VDateTimeInput modelValue={ new Date(2030, 11, 31, 13, 30) } />
    ))

    await userEvent.click(element)
    const input = screen.getByCSS('input') as HTMLInputElement
    expect(input).toHaveValue('12/31/2030 13:30')

    input.setSelectionRange(11, 13)
    await userEvent.keyboard('09')

    expect(input).toHaveValue('12/31/2030 09:30')
  })
})
