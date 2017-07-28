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
        headers:[
          { text: 'Other', value:'other' },
          { text: 'Column', value:'column' }
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

    expect(wrapper.propsData().pagination.descending).toBe(true)
    // Also expect tests to not crash :)
  })
})