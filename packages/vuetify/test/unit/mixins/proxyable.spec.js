import { test } from '@/test'
import Proxyable, { factory as Proxy } from '@/mixins/proxyable'

const Mock = {
  mixins: [Proxyable],

  render: h => h('div')
}

test('proxyable.ts', ({ mount }) => {
  it('should watch prop and emit event', async () => {
    const change = jest.fn()
    const wrapper = mount(Mock, {
      propsData: { value: 'foo' }
    })

    wrapper.vm.$on('change', change)

    expect(wrapper.vm.internalValue).toBe('foo')

    // Change by prop
    wrapper.setProps({ value: 'bar' })

    expect(wrapper.vm.internalValue).toBe('bar')
    expect(change).not.toBeCalled()

    // Change internal
    wrapper.vm.internalValue = 'fizzbuzz'

    expect(wrapper.vm.internalValue).toBe('fizzbuzz')

    expect(change).toBeCalledWith('fizzbuzz')
  })

  it('should use provided prop and event arguments', () => {
    const input = jest.fn()
    const wrapper = mount({
      mixins: [Proxy('input', 'update:input-value')],
      render: h => h('div')
    }, {
      propsData: {
        input: 'foo'
      }
    })

    wrapper.vm.$on('update:input-value', input)

    expect(wrapper.vm.input).toBe('foo')

    wrapper.vm.internalValue = 'bar'

    expect(input).toBeCalledWith('bar')
  })
})
