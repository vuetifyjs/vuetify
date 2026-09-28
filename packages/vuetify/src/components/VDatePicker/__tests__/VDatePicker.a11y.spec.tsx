import { VDatePicker } from '../VDatePicker'

// Utilities
import { render, screen } from '@test'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VDatePicker accessibility', () => {
  const vuetify = createVuetify()

  function mountFunction (component: any, options = {}) {
    return mount(component, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  it('should have aria-labels on navigation buttons', () => {
    render(<VDatePicker modelValue="2024-01-15" />)

    expect(screen.getByTestId('prev-month').getAttribute('aria-label')).toBe('Previous month')
    expect(screen.getByTestId('next-month').getAttribute('aria-label')).toBe('Next month')
    expect(screen.getByTestId('year-btn').getAttribute('aria-label')).toBe('Select year')
  })

  it('should have aria-current="date" on today\'s date', () => {
    const today = new Date()
    render(<VDatePicker modelValue={ today } />)

    expect(screen.queryAllByCSS('[aria-current="date"]')).toHaveLength(1)
  })

  it('should have aria-labels on date buttons', () => {
    render(<VDatePicker modelValue="2024-01-15" />)

    const dateButtons = screen.getAllByCSS('.v-date-picker-month__day-btn')
    expect(dateButtons).toHaveLength(31)

    for (const button of dateButtons) {
      expect(button.getAttribute('aria-label')).toBeTruthy()
    }
  })

  it('should use full month name for aria-labels in month selection', async () => {
    const wrapper = mountFunction(<VDatePicker modelValue="2024-01-15" />)

    await wrapper.find('[data-testid="month-btn"]').trigger('click')

    const buttons = wrapper.findAll('.v-date-picker-months__content .v-btn')
    expect(buttons).toHaveLength(12)

    for (const button of buttons) {
      expect(button.attributes('aria-label')).toBeTruthy()
    }
  })
})
