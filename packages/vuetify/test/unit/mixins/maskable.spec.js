import { test } from '@/test'
import Maskable from '@/mixins/maskable'

const Mock = Maskable.extend({
  render: h => h('div')
})

test('maskable.js', ({ mount }) => {
  it('should not mask text beforeMount', async () => {
    const maskText = jest.spyOn(Mock.options.methods, 'maskText')
    mount(Mock, {
      propsData: {
        returnMaskedValue: true,
        value: 'foo'
      }
    })

    expect(maskText).not.toBeCalled()

    mount(Mock, {
      propsData: {
        mask: 'credit-card',
        returnMaskedValue: true,
        value: 'foo'
      }
    })

    expect(maskText).toBeCalled()

    mount(Mock, {
      propsData: {
        mask: 'credit-card',
        returnMaskedValue: true,
        value: '456712'
      }
    })

    expect(maskText).toHaveBeenCalledTimes(2)

    mount(Mock, {
      propsData: {
        mask: 'date',
        returnMaskedValue: true,
        value: '12/'
      }
    })

    expect(maskText).toHaveBeenCalledTimes(3)
  })

  it('should reset selections', async () => {
    const wrapper = mount({
      mixins: [Maskable],
      render (h) {
        return h('input', {
          domProps: {
            value: this.value
          }
        })
      }
    }, {
      propsData: {
        mock: 'credit-card',
        value: '632'
      }
    })

    const input = wrapper.first('input')

    // no selection end
    wrapper.vm.resetSelections(input)
    expect(wrapper.vm.selection).toBe(0)
    expect(wrapper.vm.lazySelection).toBe(0)

    input.selectionEnd = 3

    wrapper.vm.resetSelections(input)

    expect(wrapper.vm.selection).toBe(3)
    expect(wrapper.vm.lazySelection).toBe(3)
  })

  it('should set selection range', async () => {
    const wrapper = mount({
      mixins: [Maskable],
      render (h) {
        return h('input', {
          ref: 'input',
          domProps: {
            value: this.value
          }
        })
      }
    }, {
      propsData: {
        mask: 'credit-card',
        value: '4444'
      }
    })

    const input = wrapper.vm.$refs.input
    wrapper.setData({ lazySelection: 4 })
    wrapper.vm.setSelectionRange()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selection).toBe(4)
    expect(wrapper.vm.lazySelection).toBe(0)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(input.selectionStart).toBe(4)
    expect(input.selectionEnd).toBe(4)

    input.value = ''
    wrapper.vm.setSelectionRange()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selection).toBe(0)
    expect(wrapper.vm.lazySelection).toBe(0)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(input.selectionStart).toBe(0)
    expect(input.selectionEnd).toBe(0)
  })
})
