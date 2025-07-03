// @vitest-environment jsdom

import { VDatePicker } from '../VDatePicker'

// Utilities
import { render } from '@test'

describe('VDatePicker accessibility', () => {
  it('should have aria-labels on navigation buttons', () => {
    const { container } = render(VDatePicker, {
      props: {
        modelValue: new Date('2024-01-15'),
      },
    })

    // Test previous month button
    const prevButton = container.querySelector('[data-testid="prev-month"]')
    expect(prevButton).toBeTruthy()
    expect(prevButton?.getAttribute('aria-label')).toBe('Previous month')

    // Test next month button
    const nextButton = container.querySelector('[data-testid="next-month"]')
    expect(nextButton).toBeTruthy()
    expect(nextButton?.getAttribute('aria-label')).toBe('Next month')

    // Test year selection button
    const yearButton = container.querySelector('[data-testid="year-btn"]')
    expect(yearButton).toBeTruthy()
    expect(yearButton?.getAttribute('aria-label')).toBe('Select year')
  })

  it('should have aria-current="date" on today\'s date', () => {
    const today = new Date()
    const { container } = render(VDatePicker, {
      props: {
        modelValue: today,
      },
    })

    // Find today's button
    const todayButton = container.querySelector('[aria-current="date"]')
    expect(todayButton).toBeTruthy()
  })

  it('should have aria-labels on date buttons', () => {
    const { container } = render(VDatePicker, {
      props: {
        modelValue: new Date('2024-01-15'),
      },
    })

    // Find date buttons
    const dateButtons = container.querySelectorAll('.v-date-picker-month__day-btn')
    expect(dateButtons.length).toBeGreaterThan(0)

    // Check that at least one button has an aria-label
    const hasAriaLabel = Array.from(dateButtons).some(button =>
      button.getAttribute('aria-label') !== null
    )
    expect(hasAriaLabel).toBe(true)
  })

  it('should format aria-labels properly for date buttons', () => {
    const { container } = render(VDatePicker, {
      props: {
        modelValue: new Date('2024-01-15'),
      },
    })

    // Find a specific date button
    const dateButton = container.querySelector('.v-date-picker-month__day-btn')
    const ariaLabel = dateButton?.getAttribute('aria-label')

    // Should have some kind of accessible text
    expect(ariaLabel).toBeTruthy()
    expect(typeof ariaLabel).toBe('string')
    expect(ariaLabel!.length).toBeGreaterThan(0)
  })
})
