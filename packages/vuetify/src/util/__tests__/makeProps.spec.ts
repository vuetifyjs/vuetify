// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { makeProps } from '../makeProps'

describe('makeProps', () => {
  function mountFunction (vuetify, options = {}) {
    return mount({
      name: 'Foo',
      props: makeProps({
        bar: {
          default: 'from self',
        },
      }),
      render: () => {},
    }, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should use global default if defined', () => {
    const vuetify = createVuetify({
      defaults: {
        global: {
          bar: 'from global',
        },
      },
    })

    const vm = mountFunction(vuetify)

    expect(vm.props().bar).toBe('from global')
  })

  it('should use component default if defined', () => {
    const vuetify = createVuetify({
      defaults: {
        global: {
          bar: 'from global',
        },
        Foo: {
          bar: 'from component',
        },
      },
    })

    const vm = mountFunction(vuetify)

    expect(vm.props().bar).toBe('from component')
  })

  it('should use local default if global or component not defined', () => {
    const vuetify = createVuetify({
      defaults: {
        global: {},
      },
    })

    const vm = mountFunction(vuetify)

    expect(vm.props().bar).toBe('from self')
  })

  it('should handle prop with default factory function', () => {
    const vuetify = createVuetify({
      defaults: {
        Foo: {
          bar: () => ({ baz: 'from component' }),
        },
      },
    })

    const wrapper = mount({
      name: 'Foo',
      props: makeProps({
        bar: {
          type: Object,
          default: () => ({ baz: 'from self' }),
        },
      }),
      render: () => {},
    }, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.props().bar).toEqual({
      baz: 'from component',
    })
  })

  it('should handle prop with Boolean type', () => {
    const vuetify = createVuetify({
      defaults: {
        Foo: {
          bar: true,
        },
      },
    })

    const wrapper = mount({
      name: 'Foo',
      props: makeProps({
        bar: Boolean,
      }),
      render: () => {},
    }, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.props().bar).toBe(true)
  })

  it('should handle prop with [Boolean] type', () => {
    const vuetify = createVuetify({
      defaults: {
        Foo: {
          bar: true,
        },
      },
    })

    const wrapper = mount({
      name: 'Foo',
      props: makeProps({
        bar: [Boolean],
      }),
      render: () => {},
    }, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.props().bar).toBe(true)
  })

  it('should handle function prop correctly', () => {
    const vuetify = createVuetify({
      defaults: {
        Foo: {
          bar: () => 'from component',
        },
      },
    })

    const wrapper = mount({
      name: 'Foo',
      props: makeProps({
        bar: [Function], // Function must be wrapped in array
      }),
      render: () => {},
    }, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.props().bar()).toBe('from component')
  })
})
