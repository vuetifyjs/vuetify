// Components
import { VDatePicker } from '../VDatePicker'

// Utilities
import { render, screen } from '@test'
import { h, ref } from 'vue'

describe('week numbers with time zone', () => {
  beforeEach(() => vi.stubEnv('TZ', 'Europe/Warsaw'))

  afterEach(() => vi.unstubAllEnvs())

  it('should calculate weeks correctly near ST/DST transition', async () => {
    render(VDatePicker, {
      props: {
        showWeek: true,
        modelValue: new Date(2025, 3, 1),
      },
    })
    const $weeks = await screen.findAllByCSS('.v-date-picker-month__weeks > div')
    expect($weeks[1].innerHTML).toBe('14')
    expect($weeks[2].innerHTML).toBe('15')
  })

  it('should calculate weeks correctly near DST/ST transition', async () => {
    render(VDatePicker, {
      props: {
        showWeek: true,
        modelValue: new Date(2025, 10, 1),
      },
    })
    const $weeks = await screen.findAllByCSS('.v-date-picker-month__weeks > div')
    expect($weeks[1].innerHTML).toBe('44')
    expect($weeks[2].innerHTML).toBe('45')
  })
})

describe('range selection with time zone', () => {
  // Temporal.PlainDateTime is timezone-agnostic, so TZ stubbing
  // does not affect date calculations. Tests verify correct dates
  // are selected regardless of system timezone.
  beforeEach(() => vi.stubEnv('TZ', 'America/New_York'))

  afterEach(() => vi.unstubAllEnvs())

  function renderWithVModel (initialValue: string[]) {
    const update = vi.fn()
    const modelValue = ref<readonly unknown[]>(initialValue)
    update.mockImplementation((v: unknown[]) => { modelValue.value = v })
    const wrapper = render(() => h(VDatePicker, {
      multiple: 'range',
      modelValue: modelValue.value,
      'onUpdate:modelValue': update,
    }))
    return { wrapper, update }
  }

  it('should select correct dates near ST/DST transition', async () => {
    const { wrapper, update } = renderWithVModel(['2025-03-01', '2025-03-01'])

    const btn1 = await wrapper.findByText('8') as HTMLElement
    btn1.click()
    expect(update).toHaveBeenCalledTimes(1)
    const first = update.mock.calls[0][0]
    expect(first).toHaveLength(1)
    expect(first[0].day).toBe(8)
    expect(first[0].month).toBe(3)
    expect(first[0].year).toBe(2025)

    const btn2 = await wrapper.findByText('9') as HTMLElement
    btn2.click()
    expect(update).toHaveBeenCalledTimes(2)
    const second = update.mock.calls[1][0]
    expect(second).toHaveLength(2)
    expect(second[0].day).toBe(8)
    expect(second[1].day).toBe(9)
  })

  it('should select correct dates near DST/ST transition', async () => {
    const { wrapper, update } = renderWithVModel(['2025-10-01', '2025-10-01'])

    const btn1 = await wrapper.findByText('2') as HTMLElement
    btn1.click()
    expect(update).toHaveBeenCalledTimes(1)
    const first = update.mock.calls[0][0]
    expect(first).toHaveLength(1)
    expect(first[0].day).toBe(2)
    expect(first[0].month).toBe(10)
    expect(first[0].year).toBe(2025)

    const btn2 = await wrapper.findByText('3') as HTMLElement
    btn2.click()
    expect(update).toHaveBeenCalledTimes(2)
    const second = update.mock.calls[1][0]
    expect(second).toHaveLength(2)
    expect(second[0].day).toBe(2)
    expect(second[1].day).toBe(3)
  })
})
