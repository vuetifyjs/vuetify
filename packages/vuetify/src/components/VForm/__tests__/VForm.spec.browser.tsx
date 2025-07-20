// Components
import { VForm } from '../VForm'
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

// Types
import type { SubmitEventPromise } from '@/composables/form'

describe('VForm', () => {
  it('emits when inputs are updated', async () => {
    const update = vi.fn()
    render(() => (
      <VForm onUpdate:modelValue={ update }>
        <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']} />
      </VForm>
    ))

    await userEvent.tab()
    await userEvent.keyboard('Something!!')

    expect(update).toHaveBeenCalledTimes(2)
    expect(update).toHaveBeenNthCalledWith(1, false)
    expect(update).toHaveBeenNthCalledWith(2, true)

    await userEvent.keyboard('{backspace}{backspace}')

    expect(update).toHaveBeenCalledTimes(3)
    expect(update).toHaveBeenNthCalledWith(3, false)
  })

  it('only emits true if all inputs are explicitly valid', async () => {
    const update = vi.fn()
    render(() => (
      <VForm onUpdate:modelValue={ update }>
        <VTextField label="Name" rules={[v => v?.length < 10 || 'Name should be longer than 10 characters']} />
        <VTextField label="Email" rules={[v => v?.length < 10 || 'E-mail should be longer than 10 characters']} />
      </VForm>
    ))

    await userEvent.tab()
    await userEvent.keyboard('Valid')

    expect(update).not.toHaveBeenCalled()

    await userEvent.tab()
    await userEvent.keyboard('Valid')

    expect(update).toHaveBeenCalledExactlyOnceWith(true)
  })

  it('exposes validate function', async () => {
    const update = vi.fn()
    const form = ref()
    render(() => (
      <VForm ref={ form } onUpdate:modelValue={ update }>
        <VTextField label="Name" rules={[v => !!v || 'Name required']} />
      </VForm>
    ))

    await wait(1)
    expect(screen.getByCSS('.v-text-field')).not.toHaveClass('v-input--error')
    expect(screen.getByCSS('.v-messages')).toBeEmptyDOMElement()

    const { valid } = await form.value.validate()
    expect(valid).to.equal(false)

    expect(screen.getByCSS('.v-text-field')).toHaveClass('v-input--error')
    expect(screen.getByCSS('.v-messages')).not.toBeEmptyDOMElement()

    expect(update).toHaveBeenCalledExactlyOnceWith(false)
  })

  it('exposes reset function', async () => {
    const update = vi.fn()
    const form = ref()
    render(() => (
      <VForm ref={ form } onUpdate:modelValue={ update }>
        <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']} />
      </VForm>
    ))

    await userEvent.click(screen.getByCSS('.v-text-field'))
    await userEvent.keyboard('Something')

    expect(screen.getByCSS('.v-text-field')).toHaveClass('v-input--error')
    expect(screen.getByCSS('.v-messages')).not.toBeEmptyDOMElement()

    expect(update).toHaveBeenCalledWith(false)

    form.value.reset()
    await wait(100)

    expect(screen.getByCSS('.v-text-field')).not.toHaveClass('v-input--error')
    expect(screen.getByCSS('.v-messages')).toBeEmptyDOMElement()
    expect(screen.getByCSS('.v-text-field input')).toHaveValue('')

    expect(update).toHaveBeenCalledWith(null)
  })

  it('exposes resetValidation function', async () => {
    const form = ref()
    const update = vi.fn()
    render(() => (
      <VForm ref={ form } onUpdate:modelValue={ update }>
        <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']} />
      </VForm>
    ))

    await userEvent.click(screen.getByCSS('.v-text-field'))
    await userEvent.keyboard('Something')
    await wait(100)

    expect(screen.getByCSS('.v-text-field')).toHaveClass('v-input--error')
    expect(screen.getByCSS('.v-messages')).not.toBeEmptyDOMElement()

    expect(update).toHaveBeenCalledWith(false)

    form.value.resetValidation()
    await wait(300)

    expect(screen.getByCSS('.v-text-field')).not.toHaveClass('v-input--error')
    expect(screen.getByCSS('.v-messages')).toBeEmptyDOMElement()
    expect(screen.getByCSS('.v-text-field input')).toHaveValue('Something')

    expect(update).toHaveBeenCalledWith(null)
  })

  it('does not submit form if validation fails', async () => {
    render(() => (
      <VForm>
        <VTextField rules={[v => !!v || 'Field required']} />
        <VBtn type="submit" text="Submit" />
      </VForm>
    ))

    await userEvent.click(screen.getByCSS('.v-btn'))
    expect(screen.getByCSS('.v-text-field')).toHaveClass('v-input--error')
    expect(screen.getByCSS('.v-messages')).toHaveTextContent('Field required')
  })

  it('emits a SubmitEventPromise', async () => {
    const submitEmits: any[] = []
    render(() => (
      <VForm onSubmit={ onSubmit }>
        <VTextField modelValue="foo" rules={[v => !!v || 'Field required']} />
        <VBtn type="submit"></VBtn>
      </VForm>
    ))

    async function onSubmit (e: SubmitEventPromise) {
      e.preventDefault()
      submitEmits.push(await e)
    }

    await userEvent.click(screen.getByCSS('.v-btn'))

    expect(submitEmits).toEqual([
      { valid: true, errors: [] },
    ])
  })

  it('exposes errors reactively', async () => {
    const form = ref()

    render(() => (
      <VForm ref={ form }>
        <VTextField rules={[v => v?.length < 4 || 'Error']} />
      </VForm>
    ))

    await userEvent.click(screen.getByCSS('.v-text-field'))
    await userEvent.keyboard('Foo')

    expect(form.value.errors).toEqual([])

    await userEvent.keyboard('_Bar')

    expect(form.value.errors).toEqual([
      { id: 'input-v-0', errorMessages: ['Error'] },
    ])
  })

  it('provides validate-on prop to child inputs', async () => {
    const form = ref()

    render(() => (
      <VForm ref={ form } validateOn="submit" onSubmit={ (e: Event) => e.preventDefault() }>
        <VTextField name="empty" rules={[v => v?.length > 5 || 'Error']} />
        <VBtn type="submit" text="Submit" />
      </VForm>
    ))

    await userEvent.click(screen.getByCSS('.v-text-field'))
    await userEvent.keyboard('Hello')

    expect(form.value.isValid).toBeNull()
    expect(screen.getByCSS('.v-text-field')).not.toHaveClass('v-input--error')

    await userEvent.click(screen.getByCSS('.v-btn'))

    expect(form.value.isValid).toBe(false)
    expect(screen.getByCSS('.v-text-field')).toHaveClass('v-input--error')

    await userEvent.click(screen.getByCSS('.v-text-field'))
    await userEvent.keyboard('_World')

    expect(form.value.isValid).toBe(false)
    expect(screen.getByCSS('.v-text-field')).toHaveClass('v-input--error')

    await userEvent.click(screen.getByCSS('.v-btn'))

    expect(form.value.isValid).toBe(true)
    expect(screen.getByCSS('.v-text-field')).not.toHaveClass('v-input--error')
  })

  it('validates inputs to true if there are no rules', async () => {
    const model = ref(false)
    render(() => (
      <VForm v-model={ model.value }>
        <VTextField />
        <VTextField rules={[]} />
      </VForm>
    ))

    await wait(1)
    expect(model.value).toBe(true)
  })

  it.skip('submits form if validation passes', async () => {
    const fieldModel = ref('')
    render(() => (
      <VForm action="/action">
        <VTextField v-model={ fieldModel.value } rules={[v => !!v || 'Field required']} />
        <VBtn type="submit" text="Submit" />
      </VForm>
    ))

    await userEvent.click(screen.getByCSS('.v-btn'))
    // expect(location.href).toBe('/')

    fieldModel.value = 'foo'

    await userEvent.click(screen.getByCSS('.v-btn'))
    expect(location.href).toBe('/action')
  })
})
