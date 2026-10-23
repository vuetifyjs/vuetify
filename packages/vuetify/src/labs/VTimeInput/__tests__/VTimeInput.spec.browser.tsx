// Components
import { VTimeInput } from '../VTimeInput'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'
import { ko } from '@/locale'

describe('VTimeInput', () => {
  function getInput () {
    return screen.getByCSS('.v-time-input input') as HTMLInputElement
  }

  it('should type a 12-hour time and commit it on blur', async () => {
    const model = ref<string | null>(null)
    render(() => (
      <>
        <VTimeInput v-model={ model.value } format="ampm" />
        <button>after</button>
      </>
    ))

    await userEvent.click(getInput())
    await userEvent.keyboard('230')
    expect(getInput().value).toBe('02:30')

    await userEvent.keyboard('p')
    expect(getInput().value).toBe('02:30 PM')

    await userEvent.tab()
    await expect.poll(() => model.value).toBe('14:30')
  })

  it('should keep the period while a section is typed over', async () => {
    const model = ref<string | null>('14:30')
    render(() => <VTimeInput v-model={ model.value } format="ampm" />)

    await userEvent.click(getInput())
    getInput().setSelectionRange(3, 5)
    await userEvent.keyboard('4')
    expect(getInput().value).toBe('02:4')

    await userEvent.keyboard('5')
    expect(getInput().value).toBe('02:45 PM')

    await userEvent.keyboard('{Enter}')
    await expect.poll(() => model.value).toBe('14:45')
  })

  it('should not commit a 12-hour time without its period', async () => {
    const model = ref<string | null>(null)
    render(() => <VTimeInput v-model={ model.value } format="ampm" />)

    await userEvent.click(getInput())
    await userEvent.keyboard('0230{Enter}')

    expect(model.value).toBeNull()
    expect(getInput().value).toBe('02:30')
  })

  it('should clamp to min and max and skip disallowed values', async () => {
    const model = ref<string | null>(null)
    render(() => (
      <VTimeInput
        v-model={ model.value }
        allowedMinutes={ (m: number) => m % 15 === 0 }
        format="24hr"
        max="17:30"
      />
    ))

    await userEvent.click(getInput())
    await userEvent.keyboard('1945{Enter}')
    await expect.poll(() => model.value).toBe('17:30')

    await userEvent.keyboard('{Control>}a{/Control}1010{Enter}')
    expect(model.value).toBe('17:30')
  })

  it('should put a localized period in front when the locale reads it first', async () => {
    const model = ref<string | null>(null)
    render(() => <VTimeInput v-model={ model.value } format="ampm" />, null, {
      locale: { locale: 'ko', messages: { ko } },
    })

    expect(getInput().placeholder).toBe('-- --:--')

    await userEvent.click(getInput())
    await userEvent.keyboard('230p')
    expect(getInput().value).toBe('오후 02:30')

    await userEvent.keyboard('{Enter}')
    await expect.poll(() => model.value).toBe('14:30')
  })

  it('should not change a readonly value from the picker fields', async () => {
    const model = ref<string | null>('09:00')
    render(() => <VTimeInput v-model={ model.value } format="24hr" readonly />)

    await userEvent.click(getInput())
    const [hour] = await screen.findAllByCSS('.v-time-picker-controls__time__field input')

    await userEvent.click(hour)
    await userEvent.keyboard('{ArrowUp}1')
    expect(model.value).toBe('09:00')
  })
})
