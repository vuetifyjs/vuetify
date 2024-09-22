import { VCheckboxBtn } from '../'

// Utilities
import { render } from '@test'
import { userEvent } from '@vitest/browser/context'
import { ref } from 'vue'

describe('VCheckboxBtn', () => {
  it('should function without v-model', async () => {
    const { container } = render(() => (
      <VCheckboxBtn />
    ))

    const input = container.querySelector('input')

    await userEvent.click(input!)

    expect(input).toBeChecked()

    await userEvent.click(input!)

    expect(input).not.toBeChecked()
  })

  it('should function with v-model', async () => {
    const model = ref(false)
    const { container } = render(() => (
      <VCheckboxBtn v-model={ model.value } />
    ))

    const input = container.querySelector('input')

    await userEvent.click(input!)

    expect(input).toBeChecked()
    expect(model.value).toBe(true)

    await userEvent.click(input!)

    expect(input).not.toBeChecked()
    expect(model.value).toBe(false)
  })

  it('should display indeterminate status', async () => {
    const { container } = render(() => (
      <VCheckboxBtn modelValue={ false } indeterminate />
    ))

    const input = container.querySelector('input')
    expect(input).toHaveAttribute('aria-checked', 'mixed')
  })

  it('should not update input checked state when it is readonly', async () => {
    const model = ref(false)
    const { container } = render(() => (
      <VCheckboxBtn v-model={ model.value } readonly />
    ))

    const input = container.querySelector('input')

    await userEvent.click(input!)

    expect(input).not.toBeChecked()
    expect(model.value).toBe(false)
  })
})
