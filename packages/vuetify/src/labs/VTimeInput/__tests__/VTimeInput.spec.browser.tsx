// Components
import { VTimeInput } from '../VTimeInput'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VTimeInput', () => {
  it('should insert separators while typing', async () => {
    const { element } = render(() => <VTimeInput modelValue={ null } />)

    await userEvent.click(element)
    const input = screen.getByCSS('.v-time-input input')
    await userEvent.type(input, '1330')

    expect(input).toHaveValue('13:30')
  })

  it('should commit a typed time on blur', async () => {
    const model = ref<string | null>(null)
    const { element } = render(() => <VTimeInput v-model={ model.value } />)

    await userEvent.click(element)
    const input = screen.getByCSS('.v-time-input input')
    await userEvent.type(input, '0930')
    await userEvent.click(document.body)

    expect(model.value).toBe('09:30')
    expect(input).toHaveValue('09:30')
  })

  it('should overwrite inside a complete value', async () => {
    const { element } = render(() => <VTimeInput modelValue="13:30" />)

    await userEvent.click(element)
    const input = screen.getByCSS('.v-time-input input') as HTMLInputElement
    expect(input).toHaveValue('13:30')

    input.setSelectionRange(0, 2)
    await userEvent.keyboard('09')

    expect(input).toHaveValue('09:30')
  })

  it('should keep the menu open until the last segment is picked', async () => {
    const model = ref<string | null>('13:30')
    render(() => <VTimeInput v-model={ model.value } />)

    await userEvent.click(screen.getByCSS('.v-field'))
    await expect.poll(() => screen.getByCSS('.v-time-picker')).toBeVisible()

    await userEvent.click(screen.getByCSS('.v-time-picker-clock__item:nth-child(5)'))
    expect(screen.getByCSS('.v-time-picker')).toBeVisible()
    expect(model.value).toBe('03:30')

    await userEvent.click(screen.getByCSS('.v-time-picker-clock__item:nth-child(5)'))
    await expect.poll(() => screen.getByCSS('.v-time-picker')).not.toBeVisible()
  })

  it('should switch back to the hour view from the header', async () => {
    render(() => <VTimeInput modelValue="13:30" hideActions={ false } />)

    await userEvent.click(screen.getByCSS('.v-field'))
    await expect.poll(() => screen.getByCSS('.v-time-picker')).toBeVisible()

    await userEvent.click(screen.getByCSS('.v-time-picker-clock__item:nth-child(5)'))
    expect(screen.getAllByCSS('.v-time-picker-controls__time__field')[1]).toHaveClass('v-time-picker-controls__time__field--active')

    await userEvent.click(screen.getAllByCSS('.v-time-picker-controls__time__field input')[0])
    expect(screen.getAllByCSS('.v-time-picker-controls__time__field')[0]).toHaveClass('v-time-picker-controls__time__field--active')
  })

  it('should accept a typed period', async () => {
    const model = ref<string | null>(null)
    const { element } = render(() => <VTimeInput v-model={ model.value } format="ampm" />)

    await userEvent.click(element)
    const input = screen.getByCSS('.v-time-input input')
    await userEvent.type(input, '0130p')
    await userEvent.click(document.body)

    expect(model.value).toBe('13:30')
    expect(input).toHaveValue('01:30 PM')
  })

  it('should support seconds', async () => {
    const model = ref<string | null>(null)
    const { element } = render(() => <VTimeInput v-model={ model.value } useSeconds />)

    await userEvent.click(element)
    const input = screen.getByCSS('.v-time-input input')
    await userEvent.type(input, '133045')
    await userEvent.click(document.body)

    expect(model.value).toBe('13:30:45')
  })
})
