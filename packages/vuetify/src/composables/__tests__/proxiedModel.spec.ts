// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

// Composables
import { useProxiedModel } from '../proxiedModel'

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
  // eslint-disable-next-line sonarjs/no-identical-functions
  setup (props) {
    const proxiedModel = useProxiedModel(props, 'foo', 'syncDefaultValue')
    // eslint-disable-next-line sonarjs/no-identical-functions
    return () => h('div', {
      onClick: () => proxiedModel.value = 'internal',
    }, [props.foo, proxiedModel.value].join(','))
  },
})

describe('useProxiedModel', () => {
  it('should use default prop value as first value if defined', async () => {
    const wrapper = mount(TestComponentWithPropDefaultValue)

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should always use prop value if defined', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        foo: 'bar',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:foo')[0]).toStrictEqual(['internal'])

    // internal value should not change until prop is updated
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ foo: 'internal' })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use internal value if prop not defined', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:foo')[0]).toStrictEqual(['internal'])

    // internal value should have changed since prop is not defined
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should switch to using prop when it is defined', async () => {
    const wrapper = mount(TestComponent)

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.trigger('click')

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ foo: 'new' })

    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('transforms', () => {
    const TestComponentTransformed = defineComponent({
      props: {
        foo: Array,
      },
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

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should emit transformed value', async () => {
      const wrapper = mount(TestComponentTransformed, {
        props: {
          foo: [1, 2, 3],
        },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('update:foo')[0]).toStrictEqual([[2, 3, 4]])
    })

    it('should use internal value if prop not defined', async () => {
      const wrapper = mount(TestComponentTransformed)

      expect(wrapper.html()).toMatchSnapshot()

      await wrapper.trigger('click')
      expect(wrapper.emitted('update:foo')[0]).toStrictEqual([[2, 3, 4]])

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
