import * as vue from 'vue'
import { mount } from '@vue/test-utils'
import * as framework from '../../framework'
import makeProps from '../makeProps'

describe('makeProps', () => {
  it('should use global default if defined', () => {
    // @ts-expect-error
    jest.spyOn(vue, 'getCurrentInstance').mockReturnValueOnce({ type: { name: 'Foo' } })

    jest.spyOn(framework, 'useVuetify').mockReturnValueOnce({
      defaults: {
        Foo: {
          bar: 'hello world',
        },
      },
    })

    const props = makeProps({
      bar: {
        type: String,
        default: 'goodbye world',
      },
    })

    // @ts-expect-error
    expect(props.bar.default()).toBe('hello world')
  })

  it('should use component default if global not defined', () => {
    // @ts-expect-error
    jest.spyOn(vue, 'getCurrentInstance').mockReturnValueOnce({ type: { name: 'Foo' } })

    jest.spyOn(framework, 'useVuetify').mockReturnValueOnce({
      defaults: {},
    })

    const props = makeProps({
      bar: {
        type: String,
        default: 'goodbye world',
      },
    })

    // @ts-expect-error
    expect(props.bar.default()).toBe('goodbye world')
  })

  it('should handle prop with default factory function', () => {
    const vuetify = framework.createVuetify({
      defaults: {
        TestComponent: {
          foo: () => ({ bar: 'baz' }),
        },
      },
    })

    const TestComponent = vue.defineComponent({
      name: 'TestComponent',
      props: makeProps({
        foo: {
          type: Object,
          default: () => ({}),
        },
      }),
      setup (props) {
        return () => vue.h('div', {}, JSON.stringify(props.foo))
      },
    })

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should handle function prop correctly', () => {
    const vuetify = framework.createVuetify({
      defaults: {
        TestComponent: {
          foo: () => 'this should be visible',
        },
      },
    })

    const TestComponent = vue.defineComponent({
      name: 'TestComponent',
      props: makeProps({
        foo: {
          type: [Function], // Function must be wrapper in array
        },
      }),
      setup (props) {
        return () => vue.h('div', [props.foo?.()])
      },
    })

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
