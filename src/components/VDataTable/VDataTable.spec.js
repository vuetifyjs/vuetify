import Vue from 'vue'
import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VDataTable from './VDataTable'

test('VDataTable.vue', () => {
  function dataTableTestData () {
    return {
      propsData: {
        pagination: {
          descending: false,
          sortBy: 'col1',
          rowsPerPage: 1,
          page: 1
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

  function dataTableTestDataFilter () {
    return {
      propsData: {
        headers: [
          { text: 'First Column', value: 'first' },
          { text: 'Second Column', value: 'second.first' },
          { text: 'Third Column', value: 'third.first.second' }
        ],
        items: [
          { other: 1, first: 'foo', second: { first: 'bar' }, third: { first: { second: 'baz', third: 'outside' } }, fourth: 'outside' }
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

  it('should match a snapshot - no matching results', () => {
    const data = dataTableTestData()
    data.propsData.search = "asdf"
    const wrapper = mount(VDataTable, data)

    expect(wrapper.html()).toMatchSnapshot()

    const content = wrapper.find('table.datatable tbody > tr > td')[0]
    expect(content.element.textContent).toBe('No matching records found')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match a snapshot - no data', () => {
    const data = dataTableTestData()
    data.propsData.items = []
    const wrapper = mount(VDataTable, data)

    expect(wrapper.html()).toMatchSnapshot()

    const content = wrapper.find('table.datatable tbody > tr > td')[0]
    expect(content.element.textContent).toBe('No data available')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match a snapshot - with data', () => {
    const data = dataTableTestData()
    data.propsData.pagination.rowsPerPage = 3

    const vm = new Vue()
    const items = props => vm.$createElement('td', [props.item.col2])
    const component = Vue.component('test', {
      components: {
        VDataTable
      },
      render (h) {
        return h('v-data-table', {
          props: {
            ...data.propsData
          },
          scopedSlots: {
            items
          }
        })
      }
    })

    const wrapper = mount(component)

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match a snapshot with single rows-per-page-items', () => {
    const data = dataTableTestData()
    data.propsData.rowsPerPageItems = [1]
    const wrapper = mount(VDataTable, data)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match display no-data-text when no data', () => {
    const data = dataTableTestData()
    data.propsData.items = []
    data.propsData.noDataText = 'foo'
    const wrapper = mount(VDataTable, data)

    expect(wrapper.find('tbody td')[0].html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match display no-results-text when no results', () => {
    const data = dataTableTestData()
    data.propsData.noResultsText = 'bar'
    data.propsData.search = "no such item"
    const wrapper = mount(VDataTable, data)

    expect(wrapper.find('tbody td')[0].html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render aria-sort attribute on column headers', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    const headers = wrapper.find('thead:first-of-type > tr:first-of-type > th')

    expect(
      headers.map(h => h.getAttribute('aria-sort'))
    ).toEqual(['ascending', 'none', 'none'])

    wrapper.setProps({
      pagination: {
        sortBy: 'col3',
        descending: false
      }
    })

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

  it('should render a progress with headers slot', () => {
    const vm = new Vue()
    const wrapper = mount(Vue.component('test', {
      components: {
        VDataTable
      },
      render (h) {
        return h('v-data-table', {
          props: {
            items: []
          },
          scopedSlots: {
            headers: props => vm.$createElement('tr')
          }
        })
      }
    }))

    expect(wrapper.find('.datatable__progress').length).toBe(1)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should only filter on data specified in headers', async () => {
    const wrapper = mount(VDataTable, dataTableTestDataFilter())

    expect(wrapper.instance().filteredItems.length).toBe(1)
    wrapper.setProps({
      search: 'outside'
    })
    expect(wrapper.instance().filteredItems.length).toBe(0)
    wrapper.setProps({
      search: 'baz'
    })
    expect(wrapper.instance().filteredItems.length).toBe(1)

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should not filter items if search is empty', async () => {
    const data = dataTableTestDataFilter()
    data.propsData.search = '    '
    const wrapper = mount(VDataTable, data)

    expect(wrapper.instance().filteredItems.length).toBe(data.propsData.items.length)

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
