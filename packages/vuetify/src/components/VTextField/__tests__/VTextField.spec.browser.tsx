import { VTextField } from '../VTextField'

// Utilities
import { generate, render, userEvent } from '@test'
import { cloneVNode } from 'vue'

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
      <VTextField rules={[rule]} validate-on="lazy" />
    ))

    expect(element).not.toHaveClass('v-input--error')
    expect(rule).not.toHaveBeenCalled()
    await userEvent.click(element)
    await userEvent.keyboard('Hello')
    expect(rule).toHaveBeenCalledTimes(5)
    expect(element).toHaveClass('v-input--error')
    expect(element).toHaveTextContent('Error!')
  })

  it('handles multiple options in validate-on prop', async () => {
    const rule = vi.fn(v => v?.length > 5 || 'Error!')

    const { element } = render(() => (
      <VTextField validate-on="blur lazy" rules={[rule]} />
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
      <VTextField hide-details="auto" counter></VTextField>
    ))
    await userEvent.click(element)
    expect(element).toHaveTextContent('0')
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
