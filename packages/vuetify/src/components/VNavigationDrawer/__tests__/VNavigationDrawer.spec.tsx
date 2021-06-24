// Components
import { VLayout } from '@/components'
import { VNavigationDrawer } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { resizeWindow } from '@/../test'

describe('VNavigationDrawer', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount({
      render: () => (
        <VLayout>
          <VNavigationDrawer { ...options } />
        </VLayout>
      ),
    }, {
      global: { plugins: [vuetify] },
    }).findComponent(VNavigationDrawer)
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should open when changed to permanent', async () => {
    const wrapper = mount({
      props: { permanent: Boolean },

      render: (props: any) => (
        <VLayout>
          <VNavigationDrawer permanent={ props.permanent } />
        </VLayout>
      ),
    }, {
      global: { plugins: [vuetify] },
    })
    const element = wrapper.findComponent(VNavigationDrawer).element as HTMLElement

    expect(element.classList.contains('v-navigation-drawer--temporary')).toBe(true)

    await wrapper.setProps({ permanent: true })

    expect(element.classList.contains('v-navigation-drawer--temporary')).toBe(false)
  })

  it('should change width when using rail, expandOnHover, and hovering', async () => {
    const wrapper = mountFunction({ rail: true, expandOnHover: true })
    const element = wrapper.element as HTMLElement

    expect(element.style.width).toBe('72px')

    await wrapper.trigger('mouseenter')

    expect(element.style.width).toBe('256px')

    await wrapper.trigger('mouseleave')

    expect(element.style.width).toBe('72px')
  })

  it.each([
    [{ disableResizeWatcher: true }, false],
    [{ disableResizeWatcher: false }, true],
  ])('should show/hide temporary class when resizing and using %s props', async (props, expected) => {
    const wrapper = mountFunction({
      ...props,
      modelValue: true,
    })

    await resizeWindow(1280)
    await resizeWindow(1024)

    expect(wrapper.emitted().hasOwnProperty('update:modelValue')).toBe(expected)
  })

  it.each([
    [{}, [true, false, true]],
    [{ permanent: true }, [false, false, false]],
    [{ temporary: true }, [true, true, true]],
  ])('should show/hide temporary class when resizing and using %s props', async (props, [one, two, three]) => {
    const wrapper = mountFunction(props)
    const element = wrapper.element as HTMLElement

    expect(element.classList.contains('v-navigation-drawer--temporary')).toBe(one)

    await resizeWindow(1280)

    expect(element.classList.contains('v-navigation-drawer--temporary')).toBe(two)

    await resizeWindow(1024)

    expect(element.classList.contains('v-navigation-drawer--temporary')).toBe(three)
  })

  it.each([
    [{}, '256px'],
    [{ rail: true }, '72px'],
    [{ width: 300 }, '300px'],
  ])('should have the correct width when using %s props', (props, width) => {
    const wrapper = mountFunction(props)
    const element = wrapper.element as HTMLElement

    expect(element.style.width).toBe(width)
  })

  it.each([
    [{}, `translateX(-110%)`],
    [{ modelValue: true }, `translateX(0%)`],
    [{ modelValue: false }, `translateX(-110%)`],
    [{ modelValue: true, position: 'right' }, `translateX(0%)`],
    [{ modelValue: false, position: 'right' }, `translateX(110%)`],
    [{ position: 'bottom' }, `translateY(110%)`],
    [{ modelValue: true, position: 'bottom' }, `translateY(0%)`],
    [{ modelValue: false, position: 'bottom' }, `translateY(110%)`],
    [{ temporary: true }, `translateX(-110%)`],
  ])('should have the correct translate using %s props', (props, translate) => {
    const wrapper = mountFunction(props)
    const element = wrapper.element as HTMLElement

    expect(element.style.transform).toBe(translate)
  })
})
