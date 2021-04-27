// Components
import { VLayout } from '@/components/VLayout'
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
    [{}, `translateX(-105%)`],
    [{ modelValue: true }, `translateX(0%)`],
    [{ modelValue: false }, `translateX(-105%)`],
    [{ modelValue: false, permanent: true }, `translateX(0%)`],
    [{ modelValue: true, right: true }, `translateX(0%)`],
    [{ modelValue: false, right: true }, `translateX(105%)`],
    [{ bottom: true }, `translateY(105%)`],
    [{ modelValue: true, bottom: true }, `translateY(0%)`],
    [{ modelValue: false, bottom: true }, `translateY(105%)`],
    [{ temporary: true }, `translateX(-105%)`],
  ])('should have the correct translate using %s props', (props, translate) => {
    const wrapper = mountFunction(props)
    const element = wrapper.element as HTMLElement

    expect(element.style.transform).toBe(translate)
  })
})
