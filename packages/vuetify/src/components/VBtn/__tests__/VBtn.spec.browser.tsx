import { VBtn } from '../VBtn'

// Utilities
import { generate, gridOn, render, userEvent } from '@test'
import { ref, markRaw, computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { vi } from 'vitest'
import { ActionCoreSymbol, type ActionDefinition, type ActionCorePublicAPI, type ActionContext } from '@/labs/action-core'

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

// ActionCore Integration Tests
describe('VBtn Action Integration', () => {
  let mockActionCore: ActionCorePublicAPI
  const mockIntegrationStatus = ref(true) // For controlling isComponentIntegrationEnabled

  // Helper to create a mock ActionCore instance
  const createMockActionCore = (): ActionCorePublicAPI => ({
    isComponentIntegrationEnabled: vi.fn((componentName: string) => componentName === 'VBtn' && mockIntegrationStatus.value),
    executeAction: vi.fn(async (actionId: string, context?: ActionContext) => {}),
    registerActionsSource: vi.fn(() => Symbol('mockSourceKey')),
    unregisterActionsSource: vi.fn(() => true),
    getAction: vi.fn((actionId: string): ActionDefinition | undefined => undefined), // Default getAction returns undefined
    allActions: computed(() => []),
    isLoading: ref(false),
    destroy: vi.fn(),
  })

  // Helper to render VBtn with mocked ActionCore
  // Using markRaw for mockActionCore in provide to prevent Vue from making it reactive if it causes issues.
  const renderWithActionCore = (props: InstanceType<typeof VBtn>['$props']) => {
    return render(VBtn, {
      props,
      global: {
        provide: {
          [ActionCoreSymbol as symbol]: markRaw(mockActionCore),
        },
      },
    })
  }

  beforeEach(() => {
    mockIntegrationStatus.value = true // Default to integration enabled for VBtn
    mockActionCore = createMockActionCore()
  })

  it('should execute command by string ID when clicked', async () => {
    const testActionId = 'testAction1'
    mockActionCore.getAction = vi.fn((id: string) => id === testActionId ? { id: testActionId, title: 'Test Action', handler: vi.fn() } : undefined);
    const { container } = renderWithActionCore({ command: testActionId })
    const button = container.querySelector('button')!

    await userEvent.click(button)

    expect(mockActionCore.executeAction).toHaveBeenCalledWith(testActionId, expect.anything())
  })

  it('should register and execute inline ActionDefinition when clicked', async () => {
    const inlineActionHandler = vi.fn()
    const inlineAction: ActionDefinition = { id: 'inlineTest', title: 'Inline Action', handler: inlineActionHandler }
    mockActionCore.getAction = vi.fn((id: string) => id === inlineAction.id ? inlineAction : undefined)

    // Spy on the registerActionsSource method of the mockActionCore instance for this test
    const registerSpy = vi.spyOn(mockActionCore, 'registerActionsSource');

    const { container, unmount } = renderWithActionCore({ command: inlineAction })
    const button = container.querySelector('button')!

    expect(registerSpy).toHaveBeenCalledWith([inlineAction])

    await userEvent.click(button)
    expect(mockActionCore.executeAction).toHaveBeenCalledWith(inlineAction.id, expect.anything())

    // Test unregistration on unmount
    // Ensure there was a result and get its value
    if (registerSpy.mock.results.length > 0) {
      const registeredSymbol = registerSpy.mock.results[0].value;
      unmount();
      expect(mockActionCore.unregisterActionsSource).toHaveBeenCalledWith(registeredSymbol);
    } else {
      // Should not happen if registerSpy was called
      throw new Error('registerActionsSource was not called as expected');
    }
  })

  it('should pass commandData to executeAction context', async () => {
    const testActionId = 'dataAction'
    const commandData = { userId: 123, context: 'test' }
    mockActionCore.getAction = vi.fn((id: string) => id === testActionId ? { id: testActionId, title: 'Data Action', handler: vi.fn() } : undefined);

    const { container } = renderWithActionCore({ command: testActionId, commandData })
    const button = container.querySelector('button')!
    await userEvent.click(button)

    expect(mockActionCore.executeAction).toHaveBeenCalledWith(
      testActionId,
      expect.objectContaining({
        data: commandData,
        trigger: 'component-vbtn',
      })
    )
  })

  it('should not execute command if componentIntegration for VBtn is false', async () => {
    mockIntegrationStatus.value = false // Disable integration for VBtn
    // Re-initialize mockActionCore with the new mockIntegrationStatus effect
    // This is important if createMockActionCore captures mockIntegrationStatus.value at creation time.
    // However, our createMockActionCore always reads the current ref value, so direct change is fine.

    const testActionId = 'noExecAction'
    const { container } = renderWithActionCore({ command: testActionId })
    const button = container.querySelector('button')!
    await userEvent.click(button)

    expect(mockActionCore.executeAction).not.toHaveBeenCalled()
  })

  it('should not execute command if ActionCore is not provided', async () => {
    // Render VBtn without providing ActionCoreSymbol
    const clickSpy = vi.fn()
    const { container } = render(VBtn, {
      props: { command: 'testAction', onClick: clickSpy },
      // No global provide for ActionCoreSymbol here
    })
    const button = container.querySelector('button')!
    await userEvent.click(button)

    // We can't directly check mockActionCore.executeAction as it wasn't injected.
    // Instead, verify normal button behavior (e.g. click event emitted).
    expect(clickSpy).toHaveBeenCalled()
  })

  it('command execution should take precedence over router navigation', async () => {
    const testActionId = 'navAction'
    mockActionCore.getAction = vi.fn((id: string) => id === testActionId ? { id: testActionId, title: 'Nav Action', handler: vi.fn() } : undefined);

    // Mock router and its navigate function
    const mockNavigate = vi.fn()
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: { template: 'Home' } }, { path: '/about', component: { template: 'About' } }],
    })
    // Spy on the router's push/replace or the link's navigate method if possible.
    // For VBtn, useLink composable handles navigation. We can check if link.navigate was called.
    // This is harder to spy on directly from outside without deeper mocking of composables.
    // Alternative: check window.location or router.currentRoute if navigation actually occurs.

    const { container } = render(VBtn, {
      props: { command: testActionId, to: '/about' },
      global: {
        plugins: [router],
        provide: {
          [ActionCoreSymbol as symbol]: markRaw(mockActionCore),
        },
      },
    })
    const button = container.querySelector('button')!
    const initialPath = router.currentRoute.value.path

    await userEvent.click(button)

    expect(mockActionCore.executeAction).toHaveBeenCalledWith(testActionId, expect.anything())
    // Check that router did not navigate
    expect(router.currentRoute.value.path).toBe(initialPath)
    // Ideally, also check that link.navigate (from useLink) was not called if easily mockable.
  })

  // TODO: Add test for precedence over group.toggle if VBtn is in a VBtnToggle
  // TODO: Add test for e.defaultPrevented stopping command execution
})
