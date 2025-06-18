import { VForm } from '../VForm'

// Components
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'

// Utilities
import { render, userEvent, wait } from '@test'
import { nextTick, ref } from 'vue'

// Types
import type { SubmitEventPromise } from '@/composables/form'

describe('VForm', () => {
  it('emits when inputs are updated', async () => {
    const onUpdate = vi.fn()
    const { container } = render(() => (
      <VForm onUpdate:modelValue={ onUpdate }>
        <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
      </VForm>
    ))

    expect(onUpdate).not.toHaveBeenCalled()

    const input = container.querySelector('input')!
    await userEvent.type(input, 'Something!!')

    expect(onUpdate).toHaveBeenCalledTimes(2)
    expect(onUpdate.mock.calls).toEqual([[false], [true]])

    await userEvent.type(input, '{backspace}{backspace}')

    expect(onUpdate).toHaveBeenCalledTimes(3)
    expect(onUpdate.mock.calls).toEqual([[false], [true], [false]])
  })

  it('only emits true if all inputs are explicitly valid', async () => {
    const onUpdate = vi.fn()
    const { container } = render(() => (
      <VForm onUpdate:modelValue={ onUpdate }>
        <VTextField label="Name" rules={[v => v?.length < 10 || 'Name should be longer than 10 characters']}></VTextField>
        <VTextField label="Email" rules={[v => v?.length < 10 || 'E-mail should be longer than 10 characters']}></VTextField>
      </VForm>
    ))

    expect(onUpdate).not.toHaveBeenCalled()

    const inputs = container.querySelectorAll('input')
    await userEvent.type(inputs[0], 'Valid')

    expect(onUpdate).not.toHaveBeenCalled()

    await userEvent.type(inputs[1], 'Valid')

    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate.mock.calls).toEqual([[true]])
  })

  it('exposes validate function', async () => {
    const form = ref()
    render(() => (
      <VForm ref={ form }>
        <VTextField label="Name" rules={[v => !!v || 'Name required']}></VTextField>
      </VForm>
    ))

    const { valid } = await form.value.validate()
    expect(valid).toBe(false)

    const textField = document.querySelector('.v-text-field')
    expect(textField).toHaveClass('v-input--error')
  })

  it('exposes reset function', async () => {
    const form = ref()
    const { container } = render(() => (
      <VForm ref={ form }>
        <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
      </VForm>
    ))

    const input = container.querySelector('input')!
    await userEvent.type(input, 'Something')

    const textField = container.querySelector('.v-text-field')
    expect(textField).toHaveClass('v-input--error')

    form.value.reset()
    // Wait for DOM updates
    await nextTick()
    await wait(50)

    expect(textField).not.toHaveClass('v-input--error')
    expect(input.value).toBe('')
  })

  it('exposes resetValidation function', async () => {
    const form = ref()
    const onUpdate = vi.fn()
    const { container } = render(() => (
      <VForm ref={ form } onUpdate:modelValue={ onUpdate }>
        <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
      </VForm>
    ))

    const input = container.querySelector('input')!
    await userEvent.type(input, 'Something')

    const textField = container.querySelector('.v-text-field')
    expect(textField).toHaveClass('v-input--error')
    expect(onUpdate).toHaveBeenCalledWith(false)

    form.value.resetValidation()
    // Wait for DOM updates
    await nextTick()
    await wait(50)

    expect(textField).not.toHaveClass('v-input--error')
    expect(input.value).toBe('Something')
    expect(onUpdate).toHaveBeenCalledWith(null)
  })

  it('does not submit form if validation fails', async () => {
    const { container } = render(() => (
      <VForm action="/action">
        <VTextField rules={[v => !!v || 'Field required']} />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    const button = container.querySelector('.v-btn')!
    await userEvent.click(button)

    // Cannot directly test URL change in jsdom, so check validation state
    const textField = container.querySelector('.v-text-field')
    expect(textField).toHaveClass('v-input--error')

    const errorMessage = container.querySelector('.v-messages')
    expect(errorMessage).toHaveTextContent('Field required')
  })

  it('emits a SubmitEventPromise', async () => {
    const onSubmit = vi.fn((e: SubmitEventPromise) => {
      e.preventDefault()
    })

    const { container } = render(() => (
      <VForm action="/action" onSubmit={ onSubmit }>
        <VTextField modelValue="foo" rules={[v => !!v || 'Field required']} />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    const button = container.querySelector('.v-btn')!
    await userEvent.click(button)

    expect(onSubmit).toHaveBeenCalled()
    const event = onSubmit.mock.calls[0][0]
    const result = await event
    expect(result).toEqual({ valid: true, errors: [] })
  })

  it('exposes errors reactively', async () => {
    const form = ref()

    const { container } = render(() => (
      <VForm ref={ form }>
        <VTextField rules={[v => v?.length < 4 || 'Error']} />
      </VForm>
    ))

    const input = container.querySelector('input')!
    await userEvent.type(input, 'Invalid')

    expect(form.value.errors).toEqual([
      {
        id: 'input-v-0',
        errorMessages: ['Error'],
      },
    ])
  })

  it('provides validate-on prop to child inputs', async () => {
    const form = ref()

    const { container } = render(() => (
      <VForm ref={ form } validateOn="lazy">
        <VTextField name="empty" rules={[v => v?.length > 5 || 'Error']} modelValue="" />
      </VForm>
    ))

    expect(form.value.isValid).toBeNull()

    const textField = container.querySelector('.v-text-field')
    expect(textField).not.toHaveClass('v-input--error')

    const input = container.querySelector('input')!
    await userEvent.type(input, 'Hello')

    expect(form.value.isValid).toBe(false)
    expect(textField).toHaveClass('v-input--error')
  })

  it('validates inputs to true if there are no rules', async () => {
    const modelValue = ref<boolean | null>(false)
    render(() => (
      <VForm modelValue={ modelValue.value } onUpdate:modelValue={ v => modelValue.value = v }>
        <VTextField></VTextField>
        <VTextField rules={[]}></VTextField>
      </VForm>
    ))

    // Wait for validation to complete
    await wait(50)

    expect(modelValue.value).toBe(true)
  })

  it('submits form if validation passes', async () => {
    const onSubmit = vi.fn()
    window.HTMLFormElement.prototype.submit = onSubmit

    const { container } = render(() => (
      <VForm action="/action">
        <VTextField modelValue="foo" rules={[v => !!v || 'Field required']} />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    const button = container.querySelector('.v-btn')!
    await userEvent.click(button)

    expect(onSubmit).toHaveBeenCalled()
  })
})
