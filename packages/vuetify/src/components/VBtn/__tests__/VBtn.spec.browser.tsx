// Components
import { VBtn } from '../VBtn'
import { VBtnToggle } from '@/components/VBtnToggle'

// Utilities
import { commands, gridOn, render, screen, showcase, userEvent, waitAnimationFrame } from '@test'
import { nextTick, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Types
import type { Variant } from '@/composables/variant'

// TODO: generate these from types
const colors = ['success', 'info', 'warning', 'error', 'invalid']
const sizes = ['x-small', 'small', 'default', 'large', 'x-large'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const
const spaced = ['start', 'both', 'end'] as const
const props = {
  color: colors,
  // variant: variants,
  // disabled: false,
  // loading: false,
}

const stories = {
  'Default button': <VBtn>Basic button</VBtn>,
  'Small success button': <VBtn color="success" size="small">Completed!</VBtn>,
  'Large, plain button w/ error': <VBtn color="error" variant="plain" size="large">Whoops</VBtn>,
  Loading: (
    <div style={{ display: 'flex', gap: '1.2rem' }}>
      <VBtn>{{ loader: () => <span>Loading...</span>, default: () => 'Default Content' }}</VBtn>
      <VBtn loading>{{ loader: () => <span>Loading...</span>, default: () => 'Default Content' }}</VBtn>
      <VBtn loading>{{ loader: () => <span>Loading...</span> }}</VBtn>
      <VBtn loading>Default Content</VBtn>
    </div>
  ),
  Icon: <VBtn icon="$vuetify" color="pink"></VBtn>,
  'Density + size': gridOn(densities, sizes, (density, size) =>
    <VBtn size={ size } density={ density }>{ size }</VBtn>
  ),
  Variants: gridOn(['no color', 'primary'], variants, (color, variant) =>
    <VBtn color={ color } variant={ variant }>{ variant }</VBtn>
  ),
  'Disabled variants': gridOn(['no color', 'primary'], variants, (color, variant) =>
    <VBtn disabled color={ color } variant={ variant }>{ variant }</VBtn>
  ),
  Stacked: gridOn([undefined], variants, (_, variant) =>
    <VBtn stacked prependIcon="$vuetify" variant={ variant }>{ variant }</VBtn>
  ),
  Spaced: gridOn([undefined], spaced, (_, spaced) =>
    <VBtn spaced={ spaced } prependIcon="$prev" appendIcon="$next" width="200">{ spaced }</VBtn>
  ),
  'Block + spaced': <VBtn block spaced="both" prependIcon="$prev" appendIcon="$next">Spaced</VBtn>,
}

// Actual tests
describe('VBtn', () => {
  describe('color', () => {
    it('supports default color props', async () => {
      render(() => (
        <>
          { colors.map(color => (
            <VBtn color={ color } class="text-capitalize">
              { color } button
            </VBtn>
          ))}
        </>
      ))

      const buttons = screen.getAllByCSS('button')
      expect(buttons).toHaveLength(colors.length)
      buttons.forEach((button, idx) => {
        expect(button).toHaveTextContent(colors[idx])
      })
    })
  })

  describe('tag', () => {
    it('renders the proper tag instead of a button', async () => {
      render(<VBtn tag="custom-tag">Click me</VBtn>)
      const customTag = screen.getByCSS('custom-tag')
      expect(customTag).toHaveTextContent('Click me')
    })
  })

  describe('elevation', () => {
    it('should have the correct elevation', async () => {
      render(<VBtn elevation={ 5 } />)
      const button = screen.getByCSS('button')
      expect(button).toHaveClass('elevation-5')
    })
  })

  describe('events', () => {
    it('emits native click events', async () => {
      const click = vi.fn()

      const { rerender } = render(() => (
        <VBtn onClick={ click }>Click me</VBtn>
      ))

      await userEvent.click(screen.getByCSS('button'))
      expect(click).toHaveBeenCalledTimes(1)

      await rerender({ to: '#my-anchor' })

      await userEvent.click(screen.getByCSS('button'))
      expect(click).toHaveBeenCalledTimes(2)
    })

    it('selects when clicked within VBtnToggle', async () => {
      const model = ref()
      render(() => (
        <VBtnToggle v-model={ model.value }>
          <VBtn value="a">A</VBtn>
          <VBtn value="b">B</VBtn>
        </VBtnToggle>
      ))

      await userEvent.click(screen.getByText('B'))
      expect(model.value).toBe('b')
      expect(screen.getByText('B').closest('.v-btn')).toHaveClass('v-btn--active')
    })
  })

  describe('href', () => {
    it('should render an <a> tag when using href prop', async () => {
      const anchor = { href: '#anchor', hash: 'anchor' }
      render(<VBtn href={ anchor.href }>Click me</VBtn>)
      const link = screen.getByCSS('a')

      await userEvent.click(link)
      expect(link).toHaveTextContent('Click me')
      expect(link).toHaveFocus()
      expect(window.location.hash).toContain(anchor.hash)
    })

    it('should change route when using to prop', async () => {
      const router = createRouter({
        history: createWebHistory(),
        routes: [
          { path: '/', component: { template: 'Home' } },
          { path: '/about', component: { template: 'About' } },
        ],
      })

      await router.replace('/')

      const result = render(() => (
        <VBtn to="/about">Click me</VBtn>
      ), { global: { plugins: [router] } })

      const link = result.wrapper.element

      await userEvent.click(link)
      expect(link).toHaveFocus()
      await result.findByText('Click me')
      expect(window.location.pathname).toBe('/about')
    })
  })

  describe('value', () => {
    it('should pass string values', async () => {
      const stringValue = 'Foobar'
      const { wrapper } = render(() => (
        <VBtn value={ stringValue }></VBtn>
      ))
      expect(wrapper.element).toHaveValue(stringValue)
    })

    it('should stringify object', async () => {
      const objectValue = { value: {} }
      const { wrapper } = render(() => (
        <VBtn value={ objectValue }></VBtn>
      ))
      expect(wrapper.element).toHaveValue(JSON.stringify(objectValue, null, 0))
    })

    it('should stringify number', async () => {
      const numberValue = 15
      const { wrapper } = render(() => (
        <VBtn value={ numberValue }></VBtn>
      ))
      expect(wrapper.element).toHaveValue(JSON.stringify(numberValue, null, 0))
    })

    it('should stringify array', async () => {
      const arrayValue = ['foo', 'bar']
      const { wrapper } = render(() => (
        <VBtn value={ arrayValue }></VBtn>
      ))
      expect(wrapper.element).toHaveValue(JSON.stringify(arrayValue, null, 0))
    })

    it('should not generate a fallback value when not provided', async () => {
      const { wrapper } = render(<VBtn></VBtn>)
      expect(wrapper.element).not.toHaveValue()
    })
  })

  describe('Reactivity', () => {
    it('disabled', async () => {
      const disabled = ref(true)
      const { wrapper } = render(() => (
        <VBtn color="success" disabled={ disabled.value }></VBtn>
      ))
      expect(wrapper.element).toHaveClass('v-btn--disabled')

      disabled.value = false
      await expect.element(wrapper.element).not.toHaveClass('v-btn--disabled')
    })

    it('variant', async () => {
      const variant = ref<Variant>('plain')
      const { wrapper } = render(() => (
        <VBtn variant={ variant.value }>Plain</VBtn>
      ))

      expect(wrapper.element).toHaveClass('v-btn--variant-plain')

      variant.value = 'elevated'
      await expect.element(wrapper.element).not.toHaveClass('v-btn--variant-plain')
    })
  })

  describe('transitions', () => {
    beforeEach(() => commands.setReduceMotionDisabled())

    afterEach(() => commands.setReduceMotionEnabled())

    it('should not flash when enabled together with a color change', async () => {
      const enabled = ref(false)
      const { wrapper } = render(() => (
        <VBtn
          theme="dark"
          variant="flat"
          color={ enabled.value ? undefined : 'blue-lighten-2' }
          disabled={ !enabled.value }
        >
          Button
        </VBtn>
      ))
      const button = wrapper.element as HTMLElement
      const overlay = button.querySelector('.v-btn__overlay')!
      const context = document.createElement('canvas').getContext('2d')!

      function toRgba (color: string) {
        context.clearRect(0, 0, 1, 1)
        context.fillStyle = color
        context.fillRect(0, 0, 1, 1)
        const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data
        return { r, g, b, a: a / 255 }
      }

      function brightness () {
        const background = toRgba(getComputedStyle(button).backgroundColor)
        const tint = toRgba(getComputedStyle(overlay).backgroundColor)
        const alpha = tint.a * Number(getComputedStyle(overlay).opacity)
        const blend = (from: number, to: number) => (from * (1 - alpha) + to * alpha) / 255
        return 0.2126 * blend(background.r, tint.r) + 0.7152 * blend(background.g, tint.g) + 0.0722 * blend(background.b, tint.b)
      }

      const initial = brightness()
      enabled.value = true
      await nextTick()

      const samples = []
      const start = performance.now()
      while (performance.now() - start < 300) {
        samples.push(brightness())
        await waitAnimationFrame()
      }

      expect(Math.max(...samples)).toBeLessThan(initial + 0.1)
    })
  })

  showcase({ stories, props, component: VBtn })
})
