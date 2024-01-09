// Composables
import { useProxiedModel } from '../proxiedModel'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const TestComponent = defineComponent({
  props: {
    foo: String,
  },
  emits: ['update:foo'],
  setup (props) {
    const proxiedModel = useProxiedModel(props, 'foo', 'syncDefaultValue')
    return () => h('div', {
      onClick: () => proxiedModel.value = 'internal',
    }, [props.foo, proxiedModel.value].join(','))
  },
})

const TestComponentWithPropDefaultValue = defineComponent({
  props: {
    foo: {
      type: String,
      default: 'propDefaultValue',
    },
  },
  emits: ['update:foo'],
  // eslint-disable-next-line sonarjs/no-identical-functions
  setup (props) {
    const proxiedModel = useProxiedModel(props, 'foo', 'syncDefaultValue')
    // eslint-disable-next-line sonarjs/no-identical-functions
    return () => h('div', {
      onClick: () => proxiedModel.value = 'internal',
    }, [props.foo, proxiedModel.value].join(','))
  },
})

const TestComponentWithModelValueProp = defineComponent({
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  setup (props) {
    const proxiedModel = useProxiedModel(props, 'modelValue')
    return () => h('div', {
      onClick: () => proxiedModel.value = 'internal',
    }, [props.modelValue, proxiedModel.value].join(','))
  },
})

describe('useProxiedModel', () => {
  it('should use default prop value as first value if defined', async () => {
    const wrapper = mount(TestComponentWithPropDefaultValue)

    expect(wrapper.element.textContent).toBe('propDefaultValue,propDefaultValue')

    await wrapper.trigger('click')
    expect(wrapper.element.textContent).toBe('propDefaultValue,internal')
  })

  it('should use prop value if defined with kebab case', async () => {
    const wrapper = mount(TestComponentWithModelValueProp, {
      props: {
        'model-value': 'foobar',
      },
    })

    expect(wrapper.element.textContent).toBe('foobar,foobar')
  })

  it('should use prop as initial value if defined', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        foo: 'bar',
      },
    })

    expect(wrapper.element.textContent).toBe('bar,bar')

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:foo')).toStrictEqual([['internal']])

    expect(wrapper.element.textContent).toBe('bar,internal')

    await wrapper.setProps({ foo: 'external' })
    expect(wrapper.element.textContent).toBe('external,external')
  })

  it('should always use prop value if update listener defined', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        foo: 'bar',
        'onUpdate:foo': () => {},
      },
    })

    expect(wrapper.element.textContent).toBe('bar,bar')

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:foo')).toStrictEqual([['internal']])

    // internal value should not change until prop is updated
    expect(wrapper.element.textContent).toBe('bar,bar')

    await wrapper.setProps({ foo: 'external' })
    expect(wrapper.element.textContent).toBe('external,external')
  })

  it('should use internal value if prop not defined', async () => {
    const wrapper = mount(TestComponent, {
      props: { foo: '' },
    })

    expect(wrapper.element.textContent).toBe(',')

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:foo')).toStrictEqual([['internal']])

    // internal value should have changed since prop is not defined
    expect(wrapper.element.textContent).toBe(',internal')
  })

  it('should switch to using prop when it is defined', async () => {
    const wrapper = mount(TestComponent, {
      props: { foo: '' },
    })

    expect(wrapper.element.textContent).toBe(',')

    await wrapper.trigger('click')

    expect(wrapper.element.textContent).toBe(',internal')

    await wrapper.setProps({ foo: 'new' })

    expect(wrapper.element.textContent).toBe('new,new')
  })

  describe('transforms', () => {
    const TestComponentTransformed = defineComponent({
      props: {
        foo: Array,
      },
      emits: ['update:foo'],
      setup (props) {
        const proxiedModel = useProxiedModel(props, 'foo', [],
          arr => {
            return (arr ?? []).map(String)
          },
          arr => {
            return arr.map(v => parseInt(v, 10))
          },
        )

        return () => h('div', {
          onClick: () => proxiedModel.value = ['2', '3', '4'],
        }, [JSON.stringify(proxiedModel.value)])
      },
    })

    it('should transform prop value', async () => {
      const wrapper = mount(TestComponentTransformed, {
        props: {
          foo: [1, 2, 3],
        },
      })

      expect(wrapper.element.textContent).toBe('["1","2","3"]')
    })

    it('should emit transformed value', async () => {
      const wrapper = mount(TestComponentTransformed, {
        props: {
          foo: [1, 2, 3],
        },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('update:foo')).toStrictEqual([[[2, 3, 4]]])
    })

    it('should use internal value if prop not defined', async () => {
      const wrapper = mount(TestComponentTransformed)

      expect(wrapper.element.textContent).toBe('[]')

      await wrapper.trigger('click')
      expect(wrapper.emitted('update:foo')).toStrictEqual([[[2, 3, 4]]])

      expect(wrapper.element.textContent).toBe('["2","3","4"]')
    })
  })
})
