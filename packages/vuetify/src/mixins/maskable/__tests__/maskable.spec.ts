import Maskable from '../'
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'

const Mock = Maskable.extend({
  render: h => h('div')
})

describe('maskable.ts', () => {
  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Mock, options)
    }
  })

  it('should not mask text beforeMount', async () => {
    const maskText = jest.spyOn(Mock.options.methods, 'maskText')
    mountFunction({
      propsData: {
        returnMaskedValue: true,
        value: 'foo'
      }
    })

    expect(maskText).not.toHaveBeenCalled()

    mountFunction({
      propsData: {
        mask: 'credit-card',
        returnMaskedValue: true,
        value: 'foo'
      }
    })

    expect(maskText).toHaveBeenCalled()

    mountFunction({
      propsData: {
        mask: 'credit-card',
        returnMaskedValue: true,
        value: '456712'
      }
    })

    expect(maskText).toHaveBeenCalledTimes(2)

    mountFunction({
      propsData: {
        mask: 'date',
        returnMaskedValue: true,
        value: '12/'
      }
    })

    expect(maskText).toHaveBeenCalledTimes(3)
  })

  it('should reset selections', async () => {
    const wrapper = mountFunction({
      render (h) {
        return h('input', {
          domProps: {
            value: this.value
          }
        })
      },
      propsData: {
        mock: 'credit-card',
        value: '632'
      }
    })

    const input = wrapper.find('input')

    // no selection end
    wrapper.vm.resetSelections(input.element)
    expect(wrapper.vm.selection).toBe(0)
    expect(wrapper.vm.lazySelection).toBe(0)

    input.element.selectionEnd = 3

    wrapper.vm.resetSelections(input.element)

    expect(wrapper.vm.selection).toBe(3)
    expect(wrapper.vm.lazySelection).toBe(3)
  })

  it('should set selection range', async () => {
    const wrapper = mountFunction({
      propsData: {
        mask: 'credit-card',
        value: '4444'
      },
      render (h) {
        return h('input', {
          ref: 'input',
          domProps: {
            value: this.value
          }
        })
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
