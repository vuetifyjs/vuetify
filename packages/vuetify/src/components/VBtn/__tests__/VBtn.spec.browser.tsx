import { VBtn } from '../VBtn'

// Utilities
import { generate, gridOn, render, userEvent } from '@test'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Types
import type { Variant } from '@/composables/variant'

// TODO: generate these from types
const colors = ['success', 'info', 'warning', 'error', 'invalid']
const sizes = ['x-small', 'small', 'default', 'large', 'x-large'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const
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
}

// Actual tests
describe('VBtn', () => {
  describe('color', () => {
    it('supports default color props', async () => {
      const { container } = render(() => (
        <>
          { colors.map(color => (
            <VBtn color={ color } class="text-capitalize">
              { color } button
            </VBtn>
          ))}
        </>
      ))

      const buttons = container.querySelectorAll('button')
      expect(buttons).toHaveLength(colors.length)
      buttons.forEach((button, idx) => {
        expect(button).toHaveTextContent(colors[idx])
      })
    })
  })

  describe('tag', () => {
    it('renders the proper tag instead of a button', async () => {
      const { container } = render(<VBtn tag="custom-tag">Click me</VBtn>)
      const customTag = container.querySelector('custom-tag')
      expect(customTag).toHaveTextContent('Click me')
    })
  })

  describe('elevation', () => {
    it('should have the correct elevation', async () => {
      const { container } = render(<VBtn elevation={ 24 } />)
      const button = container.querySelector('button')
      expect(button).toHaveClass('elevation-24')
    })
  })

  describe('events', () => {
    it('emits native click events', async () => {
      const click = vi.fn()

      const { container, rerender } = render(() => (
        <VBtn onClick={ click }>Click me</VBtn>
      ))

      await userEvent.click(container.querySelector('button')!)
      expect(click).toHaveBeenCalledTimes(1)

      await rerender({ to: '#my-anchor' })

      await userEvent.click(container.querySelector('button')!)
      expect(click).toHaveBeenCalledTimes(2)
    })

    // Pending test, is "toggle" even going to be emitted anymore?
    it.todo('emits toggle when used within a button group', () => {
      // const register = jest.fn()
      // const unregister = jest.fn()
      // const toggle = jest.fn()
      // const wrapper = mountFunction({
      //   provide: {
      //     btnToggle: { register, unregister },
      //   },
      //   methods: { toggle },
      // })

      // wrapper.trigger('click')
      // expect(toggle).toHaveBeenCalled()
    })
  })

  // These tests were copied over from the previous Jest tests,
  // but they are breaking because the features have not been implemented
  describe.todo('activeClass', () => {
    it('should use custom active-class', async () => {
      const { wrapper } = render(<VBtn active activeClass="my-active-class">Active Class</VBtn>)
      expect(wrapper.element).toHaveClass('my-active-class')
    })
  })

  describe('href', () => {
    it.todo('should render an <a> tag when using href prop', async () => {
      const anchor = { href: '#anchor', hash: 'anchor' }
      const { container } = render(<VBtn href={ anchor.href }>Click me</VBtn>)
      const link = container.querySelector('a')!

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

    it.todo('activeClass', async () => {
      const { container, wrapper } = render(() => (
        <VBtn activeClass="my-active-class">Active Class</VBtn>
      ))

      await wrapper.setProps({ activeClass: 'different-class' })

      const activeClassElement = container.querySelector('.different-class')
      expect(activeClassElement).not.toBeVisible()
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

  describe('Showcase', () => {
    generate({ stories, props, component: VBtn })
  })
})
