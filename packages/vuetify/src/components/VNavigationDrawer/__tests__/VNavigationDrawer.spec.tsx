// Components
import { VLayout } from '@/components/VLayout'
import { VNavigationDrawer } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

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

  it('should change width when using rail, expandOnHover, and hovering', async () => {
    const wrapper = mountFunction({ rail: true, expandOnHover: true })
    const element = wrapper.element as HTMLElement

    expect(element.style.width).toBe('72px')

    await wrapper.trigger('mouseenter')

    expect(element.style.width).toBe('256px')

    await wrapper.trigger('mouseleave')

    expect(element.style.width).toBe('72px')
  })

  it('should render image when using src prop', () => {
    const prop = mountFunction({ src: 'foo.png' })

    expect(prop.find('img').exists()).toBe(true)
    expect(prop.find('img').attributes().src).toBe('foo.png')
  })

  it.each([
    [{}, '256px'],
    [{ rail: true }, '72px'],
    [{ width: 300 }, '300px'],
  ])('should have the correct width', (props, width) => {
    const wrapper = mountFunction(props)
    const element = wrapper.element as HTMLElement

    expect(element.style.width).toBe(width)
  })

  it.each([
    [{}, `translateX(0%)`],
    [{ modelValue: true }, `translateX(0%)`],
    [{ modelValue: false }, `translateX(-100%)`],
    [{ modelValue: false, permanent: true }, `translateX(0%)`],
    [{ modelValue: true, right: true }, `translateX(0%)`],
    [{ modelValue: false, right: true }, `translateX(100%)`],
    [{ bottom: true }, `translateY(0%)`],
    [{ modelValue: true, bottom: true }, `translateY(0%)`],
    [{ modelValue: false, bottom: true }, `translateY(100%)`],
  ])('should have the correct translate', (props, translate) => {
    const wrapper = mountFunction(props)
    const element = wrapper.element as HTMLElement

    expect(element.style.transform).toBe(translate)
  })
})
