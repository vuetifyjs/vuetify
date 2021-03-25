// Components
import VItem from '../VItem'
import VItemGroup from '../VItemGroup'

// Utilities
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VItemGroup', () => {
  const vuetify = createVuetify()
  const mountFunction = (options = {}) => {
    return mount(VItemGroup, {
      ...options,
      global: {
        plugins: [vuetify],
      },
    })
  }

  it('should update state from child clicks', async () => {
    const wrapper = mountFunction({
      slots: {
        default: () => [
          h(VItem, { value: 'foo' }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['foo'])
          }),
          h(VItem, { value: 'bar' }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['bar'])
          })
        ],
      },
    })

    const items = wrapper.findAll('#item')

    await items[0].trigger('click')

    await items[1].trigger('click')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toEqual([['foo'], ['bar']])
  })

  it('should not deselect value when using mandatory prop', async () => {
    const wrapper = mountFunction({
      props: {
        mandatory: true,
        modelValue: 'foo',
      },
      slots: {
        default: () => [
          h(VItem, { value: 'foo' }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['foo'])
          }),
          h(VItem, { value: 'bar' }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['bar'])
          })
        ],
      },
    })

    const items = wrapper.findAll('#item')

    await items[0].trigger('click')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toBeUndefined()
  })

  it('should update a multiple item group', async () => {
    const wrapper = mountFunction({
      props: {
        multiple: true,
        modelValue: ['foo'],
      },
      slots: {
        default: () => [
          h(VItem, { value: 'foo' }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['foo'])
          }),
          h(VItem, { value: 'bar' }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['bar'])
          })
        ],
      },
    })

    const items = wrapper.findAll('#item')

    await items[0].trigger('click')
    await items[1].trigger('click')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toEqual([
      [[]],
      [['foo', 'bar']]
    ])
  })

  it('should ignore disabled items', async () => {
    const wrapper = mountFunction({
      props: {
        multiple: true,
      },
      slots: {
        default: () => [
          h(VItem, { value: 'foo', disabled: true }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['foo'])
          }),
          h(VItem, { value: 'bar' }, {
            default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['bar'])
          })
        ],
      },
    })

    const items = wrapper.findAll('#item')

    await items[0].trigger('click')
    await items[1].trigger('click')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toEqual([
      [['bar']]
    ])
  })

  // it('should select the first item if mandatory and no value', async () => {
  //   const wrapper = mountFunction({
  //     propsData: { mandatory: true },
  //     slots: {
  //       default: [Mock],
  //     },
  //   })

  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.vm.selectedItems).toHaveLength(1)
  //   expect(wrapper.vm.internalValue).toBe(0)

  //   wrapper.setProps({ multiple: true })

  //   // Manually update selected items
  //   wrapper.vm.updateItemsState()

  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.vm.selectedItems).toHaveLength(1)
  //   expect(wrapper.vm.internalValue).toEqual([0])
  // })

  // it('should update value if mandatory and dynamic items', async () => {
  //   const wrapper = mountFunction({
  //     propsData: {
  //       multiple: true,
  //       value: [3],
  //     },
  //     slots: {
  //       default: [
  //         Mock,
  //         Mock,
  //         Mock,
  //         Mock,
  //       ],
  //     },
  //   })

  //   const change = jest.fn()
  //   wrapper.vm.$on('change', change)

  //   const [first, second, third, fourth] = wrapper.findAll(Mock).wrappers

  //   fourth.destroy()

  //   expect(change).toHaveBeenCalledWith([])

  //   wrapper.setProps({ mandatory: true, value: [2] })

  //   third.destroy()

  //   expect(change).toHaveBeenCalledWith([1])

  //   wrapper.setProps({ multiple: false, value: 1 })

  //   second.destroy()

  //   expect(change).toHaveBeenCalledWith(0)

  //   first.destroy()

  //   expect(change).toHaveBeenCalledWith(undefined)
  // })

  // https://github.com/vuetifyjs/vuetify/issues/5384
  it('should not unregister children when is destroyed', async () => {
    const change = jest.fn()
    const wrapper = mountFunction({
      props: {
        modelValue: 'foo',
        'onUpdate:modelValue': change
      },
      slots: {
        default: () => h(VItem, { value: 'foo' }, () => ['foo']),
      },
    })

    wrapper.unmount()

    expect(change).not.toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/5000
  // it('should update mandatory to first non-disabled item', () => {
  //   const Mock2 = {
  //     name: 'mock2',

  //     render (h) {
  //       return h(VItem, {
  //         props: {
  //           disabled: true,
  //         },
  //         scopedSlots: {
  //           default: defaultSlot,
  //         },
  //       })
  //     },
  //   }

  //   const wrapper = mountFunction({
  //     propsData: {
  //       mandatory: true,
  //     },
  //     slots: {
  //       default: [
  //         Mock2,
  //         Mock,
  //         Mock,
  //       ],
  //     },
  //   })

  //   expect(wrapper.vm.internalValue).toBe(1)
  // })

  // https://github.com/vuetifyjs/vuetify/issues/6278
  // it('should infer index dynamically', () => {
  //   const wrapper = mountFunction({
  //     props: { value: 'foo' },
  //     slots: {
  //       default: () => [
  //         h(VItem, { value: 'foo' }, {
  //           default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['foo'])
  //         }),
  //         h(VItem, { value: 'bar' }, {
  //           default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['bar'])
  //         }),
  //         h(VItem, { value: 'baz' }, {
  //           default: ({ toggle }: any) => h('div', { id: 'item', onClick: toggle }, ['baz'])
  //         }),
  //       ],
  //     },
  //   })

  //   const items = wrapper.findAll('#item')
  //   const item2 = items[1]
  //   const item3 = items[2]

  //   item2.unmount()

  //   item3.trigger('click')

  //   expect(wrapper.vm.internalValue).toBe(1)
  // })

  it('should render with a specified tag when the tag prop is provided with a value', () => {
    const wrapper = mountFunction({
      props: {
        tag: 'button',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
