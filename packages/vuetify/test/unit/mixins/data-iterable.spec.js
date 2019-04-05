import { test } from '@/test'
import DataIterable from '@/mixins/data-iterable'

test('data-iterable.js', ({ mount }) => {

  function dataIterableCmp(value, items) {
    return mount({
      mixins: [DataIterable],
      render(h) {
        return h('div', {}, this.genItems())
      },
      methods: {
        genFilteredItems() {
          const items = []
          for (let index = 0, len = this.filteredItems.length; index < len; ++index) {
            const item = this.filteredItems[index]
            const props = this.createProps(item, index)
            items.push(this.genItem(props))
          }
          return items
        },
        genItem(props) {
          return this.$createElement('div', {
            attrs: {
              'class': 'select-me',
            },
            on: {
              click: () => props.selected = true,
            }
          }, props.item.id)
        },
        genEmptyItems() {
          return []
        },
      }
    }, {
      propsData: {
        items,
        value,
      }
    })
  }

  it('should update selection after items was set to an empty array', async () => {
    const items = [{ id: 'foo' }, { id: 'bar' }]
    let value = []

    const wrapper = dataIterableCmp(value, items)

    let callCount = 0
    const selectionChanged = jest.fn()
    // Emulate v-model behaviour
    wrapper.vm.$on('input', function (newValue) {
      callCount += 1
      value = newValue
      selectionChanged.apply(this, arguments)
    })

    wrapper.find('.select-me')[0].trigger('click')

    expect(callCount).toBe(1)
    expect(selectionChanged).toBeCalledWith([items[0]])

    // All items have been removed, value which hold
    // the selection is going to be updated
    wrapper.setProps({ value, items: [] })

    expect(callCount).toBe(2)
    expect(selectionChanged).toBeCalledWith([])
  })

  it('should preserve selection after items changed to only the selection', async () => {
    const items = [{ id: 'foo' }, { id: 'bar' }]
    let value = []

    const wrapper = dataIterableCmp(value, items)

    let callCount = 0
    const selectionChanged = jest.fn()
    // Emulate v-model behaviour
    wrapper.vm.$on('input', function (newValue) {
      callCount += 1
      value = newValue
      selectionChanged.apply(this, arguments)
    })

    wrapper.find('.select-me')[0].trigger('click')

    expect(callCount).toBe(1)
    expect(selectionChanged).toBeCalledWith([items[0]])

    // Only items[1] has been removed, value which hold
    // the selection is not going to be updated
    wrapper.setProps({ value, items: [items[0]] })

    expect(callCount).toBe(1)
  })

  it('should update selection after items no longer contains selected item', async () => {
    const items = [{ id: 'foo' }, { id: 'bar' }]
    let value = []

    const wrapper = dataIterableCmp(value, items)

    let callCount = 0
    const selectionChanged = jest.fn()
    // Emulate v-model behaviour
    wrapper.vm.$on('input', function (newValue) {
      callCount += 1
      value = newValue
      selectionChanged.apply(this, arguments)
    })

    wrapper.find('.select-me')[0].trigger('click')

    expect(callCount).toBe(1)
    expect(selectionChanged).toBeCalledWith([items[0]])

    // Only items[1] has been removed, value which hold
    // the selection is not going to be updated
    wrapper.setProps({ value, items: [items[1]] })

    expect(callCount).toBe(2)
    expect(selectionChanged).toBeCalledWith([])
  })
})