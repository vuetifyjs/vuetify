// Components
import { VTextField } from '../VTextField'
import { VBtn } from '@/components/VBtn'
import { VMenu } from '@/components/VMenu'

// Utilities
import { commands, render, screen, showcase, userEvent, wait } from '@test'
import { cloneVNode, ref } from 'vue'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VTextField />,
  Disabled: <VTextField disabled />,
  Affixes: <VTextField prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VTextField prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VTextField prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VTextField placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex align-start" style="gap: 0.4rem; height: 100px;">
          { cloneVNode(v, { variant, density, label: `${variant} ${density}` }) }
          { cloneVNode(v, { variant, density, label: `with value`, modelValue: 'Value' }) }
        </div>
      ))
    )).flat()}
  </div>
)]))

describe('VTextField', () => {
  it('validates input on mount', async () => {
    const rule = vi.fn(v => v?.length > 4 || 'Error!')

    const { element } = render(() => (
      <VTextField rules={[rule]} />
    ))

    expect(element).not.toHaveClass('v-input--error')
    expect(rule).toHaveBeenCalledOnce()
    expect(rule).toHaveBeenCalledWith(undefined)
    await userEvent.click(element)
    await userEvent.keyboard('Hello')
    expect(rule).toHaveBeenCalledTimes(6)
    expect(element).not.toHaveClass('v-input--error')
  })

  it('does not validate on mount when using validate-on lazy', async () => {
    const rule = vi.fn(v => v?.length > 5 || 'Error!')

    const { element } = render(() => (
      <VTextField rules={[rule]} validateOn="lazy" />
    ))

    expect(element).not.toHaveClass('v-input--error')
    expect(rule).not.toHaveBeenCalled()
    await userEvent.click(element)
    await userEvent.keyboard('Hello')
    expect(rule).toHaveBeenCalledTimes(5)
    expect(element).toHaveClass('v-input--error')
    expect(element).toHaveTextContent('Error!')
  })

  it('does not trigger infinite loop when autofilled by password manager', async () => {
    render(() => (
      <div>
        <VTextField label="username" name="username" type="email" />
        <VTextField label="password" name="password" type="password" />
        <VBtn>
          Some button
          <VMenu activator="parent">
            <div class="my-menu-content">Some text in menu</div>
          </VMenu>
        </VBtn>
      </div>
    ))

    const input1 = screen.getByCSS('input[name="username"]') as HTMLInputElement
    const input2 = screen.getByCSS('input[name="password"]') as HTMLInputElement

    await commands.abortAfter(5000, 'VTextField infinite loop detection')

    input1.focus()
    input1.value = 'my username'
    input1.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertFromPaste' }))
    input1.dispatchEvent(new Event('change', { bubbles: true }))

    input2.focus()
    input2.value = 'my password'
    input2.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertFromPaste' }))
    input2.dispatchEvent(new Event('change', { bubbles: true }))

    await wait(100)
    const button = screen.getByCSS('.v-btn')
    await userEvent.click(button)
    await wait(100)

    const menuContent = screen.getByCSS('.my-menu-content')
    expect(menuContent).toBeVisible()

    await commands.clearAbortTimeout()
  })

  it('handles multiple options in validate-on prop', async () => {
    const rule = vi.fn(v => v?.length > 5 || 'Error!')

    const { element } = render(() => (
      <VTextField validateOn="blur lazy" rules={[rule]} />
    ))

    expect(element).not.toHaveClass('v-input--error')
    expect(rule).not.toHaveBeenCalled()

    await userEvent.click(element)
    await userEvent.keyboard('Hello')
    expect(element).not.toHaveClass('v-input--error')
    expect(rule).not.toHaveBeenCalled()

    await userEvent.click(document.body)
    expect(rule).toHaveBeenCalledOnce()
    expect(element).toHaveClass('v-input--error')
    expect(element).toHaveTextContent('Error!')
  })

  // https://github.com/vuetifyjs/vuetify/issues/15231
  it('renders details if using hide-details="auto" and counter prop', async () => {
    const { element } = render(() => (
      <VTextField hideDetails="auto" counter></VTextField>
    ))
    await userEvent.click(element)
    expect(element).toHaveTextContent('0')
  })

  it('keeps -0 with v-model.number', async () => {
    const model = ref()
    const { element } = render(() => (
      <VTextField v-model_number={ model.value }></VTextField>
    ))
    await userEvent.click(element)
    await userEvent.keyboard('-0.1')
    await expect.element(await screen.findByRole('textbox')).toHaveValue('-0.1')
    expect(model.value).toBe(-0.1)
  })

  showcase({ stories })
})
