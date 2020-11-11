// Components
import VProgressLinear from '../VProgressLinear'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { compileToFunctions } from 'vue-template-compiler'

describe('VProgressLinear.ts', () => {
  type Instance = InstanceType<typeof VProgressLinear>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VProgressLinear, {
        mocks: {
          $vuetify: {
            rtl: false,
          },
        },
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: -1, bufferValue: -1 })
    const htmlMinus1 = wrapper.html()

    wrapper.setProps({ value: 0, bufferValue: 0 })
    const html0 = wrapper.html()

    wrapper.setProps({ value: 100, bufferValue: 100 })
    const html100 = wrapper.html()

    wrapper.setProps({ value: 101, bufferValue: 101 })
    const html101 = wrapper.html()

    expect(htmlMinus1).toBe(html0)
    expect(html100).toBe(html101)
    expect(html0).not.toBe(html100)

    wrapper.setProps({ value: '-1', bufferValue: '-1' })
    const htmlMinus1String = wrapper.html()

    wrapper.setProps({ value: '0', bufferValue: '0' })
    const html0String = wrapper.html()

    wrapper.setProps({ value: '100', bufferValue: '100' })
    const html100String = wrapper.html()

    wrapper.setProps({ value: '101', bufferValue: '101' })
    const html101String = wrapper.html()

    expect(htmlMinus1String).toBe(html0String)
    expect(html100String).toBe(html101String)
    expect(html0String).not.toBe(html100String)
  })

  it('should render inactive component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
        active: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in RTL mode', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
      },
      mocks: {
        $vuetify: {
          rtl: true,
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render reversed component', () => {
    const wrapper = mountFunction({
      propsData: {
        reverse: true,
        value: 33,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render reverse component in RTL mode', () => {
    const wrapper = mountFunction({
      propsData: {
        reverse: true,
        value: 33,
      },
      mocks: {
        $vuetify: { rtl: true },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
        color: 'orange',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with css color and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
        color: '#336699',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color and background opacity and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
        color: 'orange',
        backgroundOpacity: 0.5,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color and background color and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
        color: 'orange',
        backgroundColor: 'blue',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color and background color and opacity and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
        color: 'orange',
        backgroundColor: 'blue',
        backgroundOpacity: 0.5,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render indeterminate progress and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        indeterminate: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render indeterminate progress with query prop and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        indeterminate: true,
        query: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with buffer value and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 33,
        bufferValue: 80,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      bufferValue: 0,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with buffer value and value > buffer value and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 90,
        bufferValue: 80,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render default slot content', () => {
    const wrapper = mountFunction({
      propsData: {
        value: 90,
        bufferValue: 80,
      },
      slots: {
        default: [compileToFunctions('<div class="foobar">content</div>')],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.foobar')).toHaveLength(1)
  })

  it('should respond to click events', () => {
    const change = jest.fn()
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        value: 0,
      },
      listeners: { change },
    })

    const rect = wrapper.vm.$el.getBoundingClientRect()

    wrapper.vm.$el.getBoundingClientRect = () => ({
      ...rect,
      width: 1000,
    })

    expect(wrapper.vm.internalLazyValue).toBe(0)

    wrapper.trigger('click', { offsetX: 200 })

    expect(wrapper.vm.internalLazyValue).toBe(20)
  })

  it('should render a stream component', () => {
    const wrapper = mountFunction({
      propsData: {
        stream: true,
      },
    })

    expect(wrapper.find('.v-progress-linear__stream')).toBeTruthy()
  })
})
