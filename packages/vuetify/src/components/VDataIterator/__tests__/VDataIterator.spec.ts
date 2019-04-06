// Components
import VData from '../../VData/VData'
import VDataIterator from '../VDataIterator'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'

describe('VDataIterator.ts', () => {
  type Instance = InstanceType<typeof VDataIterator>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  let makeItems: (length: number) => any[]

  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')
    makeItems = (length: number) => Array.from(Array(length), (v, k) => ({ id: k }))

    mountFunction = (options = {}) => {
      return mount(VDataIterator, {
        sync: false,
        mocks: {
          $vuetify: {
            lang: {
              t: str => str
            },
            theme: {
              dark: false
            }
          }
        },
        ...options
      })
    }
  })

  it('should toggle items selected/not selected', () => {
    const items = [{ id: 1, text: 'Foo' }]
    const wrapper = mountFunction({
      propsData: {
        items
      }
    })

    expect(Object.keys(wrapper.vm.selection)).toHaveLength(0)

    wrapper.vm.toggleSelectAll(true)

    expect(wrapper.vm.isSelected(items[0])).toBe(true)
    expect(Object.keys(wrapper.vm.selection)).toHaveLength(1)

    wrapper.vm.toggleSelectAll(false)

    expect(wrapper.vm.isSelected(items[0])).toBe(false)
  })

  it('should select an item', () => {
    const items = makeItems(3)
    const wrapper = mountFunction({
      propsData: {
        singleSelect: true,
        items
      }
    })

    wrapper.vm.select({ id: 1 })
    expect(Object.keys(wrapper.vm.selection)).toHaveLength(1)

    wrapper.vm.select({ id: 2 })
    expect(Object.keys(wrapper.vm.selection)).toHaveLength(1)

    wrapper.vm.select({ id: 2 }, false)
    expect(Object.keys(wrapper.vm.selection)).toHaveLength(0)
  })

  it('should expand expansions', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: makeItems(3)
      }
    })

    wrapper.vm.expand({ id: 1 })
    expect(Object.keys(wrapper.vm.expansion)).toHaveLength(1)
    expect(wrapper.vm.isExpanded({ id: 1 })).toBe(true)

    wrapper.vm.expand({ id: 2 })
    expect(Object.keys(wrapper.vm.expansion)).toHaveLength(2)
    expect(wrapper.vm.isExpanded({ id: 1 })).toBe(true)
    expect(wrapper.vm.isExpanded({ id: 2 })).toBe(true)

    wrapper.vm.expand({ id: 2 }, false)
    expect(Object.keys(wrapper.vm.expansion)).toHaveLength(1)
    expect(wrapper.vm.isExpanded({ id: 1 })).toBe(true)
    expect(wrapper.vm.isExpanded({ id: 2 })).toBe(false)

    wrapper.setProps({ expanded: [{ id: 2 }] })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isExpanded({ id: 1 })).toBe(false)
    expect(wrapper.vm.isExpanded({ id: 2 })).toBe(true)
  })

  it('should check if any or all items are selected', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: makeItems(5)
      }
    })

    expect(wrapper.vm.everyItem).toBe(false)
    expect(wrapper.vm.someItems).toBe(false)

    wrapper.vm.toggleSelectAll(true)

    expect(wrapper.vm.everyItem).toBe(true)
    expect(wrapper.vm.someItems).toBe(true)

    wrapper.vm.select({ id: 2 }, false)

    expect(wrapper.vm.everyItem).toBe(false)
    expect(wrapper.vm.someItems).toBe(true)

    wrapper.setProps({ value: [] })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.everyItem).toBe(false)
    expect(wrapper.vm.someItems).toBe(false)

  })
})
