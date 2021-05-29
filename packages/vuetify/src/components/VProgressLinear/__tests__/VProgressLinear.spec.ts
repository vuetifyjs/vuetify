// Components
import { VProgressLinear } from '../'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { h, toRef } from '@vue/runtime-core'

describe('VProgressLinear', () => {
  const vuetify = createVuetify()
  const mountFunction = (options?: any) => mount(VProgressLinear, {
    global: {
      plugins: [vuetify],
    },
    ...options,
  })

  it('should render component and match snapshot', async () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 33,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ modelValue: -1, bufferValue: -1 })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ modelValue: 101, bufferValue: 101 })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render inactive component and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 33,
        active: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in RTL mode', () => {
    const wrapper = mount(VProgressLinear, {
      props: {
        modelValue: 33,
      },
      global: {
        plugins: [createVuetify({ locale: { defaultLocale: 'ar' } })],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render reversed component', () => {
    const wrapper = mountFunction({
      props: {
        reverse: true,
        modelValue: 33,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render reverse component in RTL mode', () => {
    const wrapper = mount(VProgressLinear, {
      props: {
        modelValue: 33,
        reverse: true,
      },
      global: {
        plugins: [createVuetify({ locale: { defaultLocale: 'ar' } })],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 33,
        color: 'orange',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with css color and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 33,
        color: '#336699',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color and background opacity and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 33,
        color: 'orange',
        bgOpacity: 0.5,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color and background color and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 33,
        color: 'orange',
        bgColor: 'blue',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color and background color and opacity and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 33,
        color: 'orange',
        bgColor: 'blue',
        bgOpacity: 0.5,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render indeterminate progress and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        indeterminate: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render indeterminate progress with query prop and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        indeterminate: true,
        query: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with buffer value and match snapshot', async () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 33,
        bufferValue: 80,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({
      bufferValue: 0,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with buffer value and value > buffer value and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 90,
        bufferValue: 80,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render default slot content', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: 90,
        bufferValue: 80,
      },
      slots: {
        default: () => h('div', { class: 'foobar' }, 'content'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respond to click events', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      props: {
        modelValue: 0,
      },
    })

    const rect = wrapper.vm.$el.getBoundingClientRect()

    wrapper.vm.$el.getBoundingClientRect = () => ({
      ...rect,
      width: 1000,
    })

    await wrapper.trigger('click', { offsetX: 200 })

    expect(wrapper.emitted('update:modelValue')).toEqual([
      [20],
    ])
  })

  it('should render a stream component', () => {
    const wrapper = mountFunction({
      props: {
        stream: true,
      },
    })

    expect(wrapper.find('.v-progress-linear__stream')).toBeTruthy()
  })
})
