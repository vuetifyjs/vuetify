import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VDataTable from './VDataTable'

test('VDataTable.vue', () => {
  function dataTableTestData () {
    return {
      propsData: {
        pagination: {
          descending: false,
          sortBy: 'col1'
        },
        headers: [
          { text: 'First Column', value: 'col1', class: 'a-string' },
          { text: 'Second Column', value: 'col2', sortable: false },
          { text: 'Third Column', value: 'col3', class: ['an', 'array'] }
        ],
        items: [
          { other: 1, col1: 'foo', col2: 'a', col3: 1 },
          { other: 2, col1: null, col2: 'b', col3: 2 },
          { other: 3, col1: undefined, col2: 'c', col3: 3 }
        ]
      }
    }
  }

  // TODO: This doesn't actually test anything
  it.skip('should be able to filter null and undefined values', async () => {
    const data = dataTableTestData()
    const pagination = data.propsData.pagination
    const wrapper = mount(VDataTable, data)

    pagination.descending = true

    expect(wrapper.vm.$props.pagination.descending).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match a snapshot', () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match a snapshot with single rows-per-page-items', () => {
    const data = dataTableTestData()
    data.propsData.rowsPerPageItems = [1]
    const wrapper = mount(VDataTable, data)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render aria-sort attribute on column headers', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    let headers = wrapper.find('thead:first-of-type > tr:first-of-type > th')

    expect(
      headers.map(h => h.getAttribute('aria-sort'))
    ).toEqual(['ascending', 'none', 'none'])

    wrapper.setProps({ pagination: {
      sortBy: 'col3',
      descending: false
    }})

    expect(
      headers.map(h => h.getAttribute('aria-sort'))
    ).toEqual(['none', 'none', 'ascending'])

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match not allow a null sort', async () => {
    const data = {
      propsData: {
        mustSort: true,
        headers: [
          { text: 'First Column', value: 'col1' },
          { text: 'Second Column', value: 'col2', sortable: false },
          { text: 'Third Column', value: 'col3' }
        ],
        items: [
          { other: 1, col1: 'foo', col2: 'a', col3: 1 },
          { other: 2, col1: null, col2: 'b', col3: 2 },
          { other: 3, col1: undefined, col2: 'c', col3: 3 }
        ]
      }
    }

    const wrapper = mount(VDataTable, data)

    expect(wrapper.vm.defaultPagination.descending).toBe(false)
    wrapper.vm.sort(0)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.defaultPagination.descending).toBe(false)
    wrapper.vm.sort(0)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.defaultPagination.descending).toBe(true)
    wrapper.vm.sort(0)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.defaultPagination.descending).toBe(false)

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
