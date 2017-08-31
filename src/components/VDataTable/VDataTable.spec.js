import Vue from 'vue'
import { test } from '~util/testing'
import VDataTable from './VDataTable'

test('VDataTable.js', ({ mount }) => {
  it('should be able to filter null and undefined values', async () => {
    const pagination = {
      descending: false,
      sortBy: 'column'
    }
    const wrapper = mount(VDataTable, {
      propsData: {
        pagination,
        headers: [
          { text: 'Other', value: 'other' },
          { text: 'Column', value: 'column' }
        ],
        items: [
          { other: 1, column: 'foo' },
          { other: 2, column: null },
          { other: 3, column: undefined }
        ]
      }
    })

    await wrapper.vm.$nextTick()

    pagination.descending = true

    expect(wrapper.vm.$props.pagination.descending).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
    // Also expect tests to not crash :)
  })

/* avoriaz needs to support scoped slots
  it('should emit pagination object with correct items length', async () => {
    const vm = new Vue()
    const wrapper = mount(VDataTable, {
      propsData: {
        pagination: {},
        headers: [
          { text: 'First', value: 'first' },
          { text: 'Second', value: 'first' }
        ],
        items: [
          { first: 1, second: 'foo' },
          { first: 2, second: 'bar' },
          { first: 3, second: 'baz' }
        ]
      },
      scopedSlots: {
        items: (props) => vm.createElement('td', [props.item.first])
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('update:pagination', change)

    wrapper.setProps({ search: 'f' })

    await wrapper.vm.$nextTick()

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
    expect(change).toBeCalledWith({ page: 1, totalItems: 1 })
  })
*/
})
