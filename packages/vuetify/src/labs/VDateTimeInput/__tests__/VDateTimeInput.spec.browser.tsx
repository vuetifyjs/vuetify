// Components
import { VDateTimeInput } from '../VDateTimeInput'

// Composables
import { StringDateAdapter } from '@/composables/date/adapters/string'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VDateTimeInput', () => {
  function getInput () {
    return screen.getByCSS('.v-date-time-input input') as HTMLInputElement
  }

  it('should open the picker for the part of the text that was clicked', async () => {
    const menu = ref<boolean | string>(false)
    render(() => (
      <VDateTimeInput modelValue="2026-06-10T14:30" v-model:menu={ menu.value } format="24hr" />
    ))

    await userEvent.click(getInput(), { position: { x: 2, y: 8 } })
    await expect.poll(() => menu.value).toBe('date')
    await expect.poll(() => screen.getByCSS('.v-date-picker')).toBeVisible()

    await userEvent.click(getInput(), { position: { x: getInput().offsetWidth - 2, y: 8 } })
    await expect.poll(() => menu.value).toBe('time')
    await expect.poll(() => screen.getByCSS('.v-time-picker')).toBeVisible()
  })

  it('should open the picker under the caret with Alt+ArrowDown', async () => {
    const menu = ref<boolean | string>(false)
    render(() => (
      <VDateTimeInput modelValue="2026-06-10T14:30" v-model:menu={ menu.value } format="24hr" />
    ))

    getInput().focus()
    getInput().setSelectionRange(13, 13)
    await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}')
    await expect.poll(() => menu.value).toBe('time')
  })

  it('should highlight the part of the text the open picker edits', async () => {
    const menu = ref<boolean | string>(false)
    render(() => (
      <VDateTimeInput modelValue="2026-06-10T14:30" v-model:menu={ menu.value } format="24hr" />
    ))

    function highlighted () {
      return [...document.querySelectorAll('.v-date-time-input [aria-hidden="true"] span')]
        .filter(el => getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)')
        .map(el => el.textContent)
    }

    expect(highlighted()).toEqual([])

    menu.value = 'time'
    await expect.poll(highlighted).toEqual(['14:30'])

    menu.value = 'date'
    await expect.poll(highlighted).toEqual(['06/10/2026'])
  })

  it('should keep the time picker while the menu closes', async () => {
    const menu = ref<boolean | string>('time')
    render(() => <VDateTimeInput v-model:menu={ menu.value } />)

    await expect.poll(() => screen.getByCSS('.v-time-picker')).toBeVisible()

    menu.value = false
    await expect.poll(() => document.querySelector('.v-menu .v-time-picker')).not.toBeNull()
    expect(document.querySelector('.v-menu .v-date-picker')).toBeNull()
  })

  it('should let a button in append-inner pick which picker opens', async () => {
    const menu = ref<boolean | string>(false)
    render(() => (
      <VDateTimeInput v-model:menu={ menu.value }>
        {{ 'append-inner': () => <button onClick={ () => menu.value = 'time' }>time</button> }}
      </VDateTimeInput>
    ))

    await userEvent.click(screen.getByText('time'))
    await expect.poll(() => menu.value).toBe('time')
  })

  it('should go on to the time after the first date and use the default time', async () => {
    const model = ref<string | null>(null)
    const menu = ref<boolean | string>(false)
    render(() => (
      <VDateTimeInput
        v-model={ model.value }
        v-model:menu={ menu.value }
        datePickerProps={{ month: 5, year: 2026 }}
        defaultTime="09:00"
      />
    ))

    await userEvent.click(getInput())
    await userEvent.click(await screen.findByCSS('[data-v-date="2026-06-15"]'))

    await expect.poll(() => model.value).toBe('2026-06-15T09:00')
    await expect.poll(() => menu.value).toBe('time')
  })

  it('should keep the time and close when the date of a set value changes', async () => {
    const model = ref<string | null>('2026-06-10T14:30')
    const menu = ref<boolean | string>(false)
    render(() => <VDateTimeInput v-model={ model.value } v-model:menu={ menu.value } />)

    await userEvent.click(getInput(), { position: { x: 2, y: 8 } })
    await userEvent.click(await screen.findByCSS('[data-v-date="2026-06-15"]'))

    await expect.poll(() => model.value).toBe('2026-06-15T14:30')
    await expect.poll(() => menu.value).toBe(false)
  })

  it('should keep the time with an adapter that only holds dates', async () => {
    const model = ref<string | null>('2026-06-10T14:30')
    render(() => <VDateTimeInput v-model={ model.value } />, null, { date: { adapter: StringDateAdapter } })

    await userEvent.click(getInput(), { position: { x: 2, y: 8 } })
    await userEvent.click(await screen.findByCSS('[data-v-date="2026-06-15"]'))

    await expect.poll(() => model.value).toBe('2026-06-15T14:30')
  })

  it('should warn about a value with a time zone and leave the field empty', async () => {
    render(() => <VDateTimeInput modelValue="2026-06-10T14:30:00Z" />)

    expect(getInput().value).toBe('')
    expect('expects a local date and time without a time zone').toHaveBeenTipped()
  })

  it('should fill in the default time for a typed date', async () => {
    const model = ref<string | null>(null)
    render(() => <VDateTimeInput v-model={ model.value } defaultTime="09:00" format="ampm" />)

    await userEvent.click(getInput())
    await userEvent.keyboard('06152026{Enter}')

    await expect.poll(() => model.value).toBe('2026-06-15T09:00')
    await expect.poll(() => getInput().value).toBe('06/15/2026 09:00 AM')
  })

  it('should clamp a typed value to min and skip disallowed minutes', async () => {
    const model = ref<string | null>(null)
    render(() => (
      <VDateTimeInput
        v-model={ model.value }
        allowedMinutes={ (m: number) => m % 15 === 0 }
        format="24hr"
        min="2026-06-15T10:00"
      />
    ))

    await userEvent.click(getInput())
    await userEvent.keyboard('061520260900{Enter}')
    await expect.poll(() => model.value).toBe('2026-06-15T10:00')

    await userEvent.keyboard('{Control>}a{/Control}061620261010{Enter}')
    expect(model.value).toBe('2026-06-15T10:00')
  })
})
