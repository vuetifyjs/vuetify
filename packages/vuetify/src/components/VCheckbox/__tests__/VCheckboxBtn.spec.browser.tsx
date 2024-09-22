import { VCheckboxBtn } from '../'

// Utilities
import { render, userEvent, screen } from '@test'
import { ref } from 'vue'

describe('VCheckboxBtn', () => {
  it('should function without v-model', async () => {
    render(() => (
      <VCheckboxBtn />
    ))

    const input = screen.getByCSS('input')

    await userEvent.click(input)
    expect(input).toBeChecked()

    await userEvent.click(input)
    expect(input).not.toBeChecked()
  })

  it('should function with v-model', async () => {
    const model = ref(false)
    render(() => (
      <VCheckboxBtn v-model={ model.value } />
    ))

    const input = screen.getByCSS('input')

    await userEvent.click(input)
    expect(input).toBeChecked()
    expect(model.value).toBe(true)

    await userEvent.click(input)
    expect(input).not.toBeChecked()
    expect(model.value).toBe(false)
  })

  it('should display indeterminate status', async () => {
    render(() => (
      <VCheckboxBtn modelValue={ false } indeterminate />
    ))

    const input = screen.getByCSS('input')
    expect(input).toHaveAttribute('aria-checked', 'mixed')
  })

  it('should not update input checked state when it is readonly', async () => {
    const model = ref(false)
    render(() => (
      <VCheckboxBtn v-model={ model.value } readonly />
    ))

    const input = screen.getByCSS('input')

    await userEvent.click(input!)
    expect(input).not.toBeChecked()
    expect(model.value).toBe(false)
  })
})
