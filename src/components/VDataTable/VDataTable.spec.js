// import Vue from 'vue'
import { test } from '~util/testing'
import VDataTable from './VDataTable'

test('VDataTable.js', ({ mount }) => {
  function dataTableTestData () {
    return {
      propsData: {
        pagination: {
          descending: false,
          sortBy: 'col1'
        },
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
  }

  it('should be able to filter null and undefined values', async () => {
    const data = dataTableTestData()
    const pagination = data.propsData.pagination
    const wrapper = mount(VDataTable, data)

    await wrapper.vm.$nextTick()

    pagination.descending = true

    expect(wrapper.vm.$props.pagination.descending).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
    // Also expect tests to not crash :)
  })

  it('should render role attribute on column headers', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    const headerEles = wrapper.find('thead:first-of-type > tr:first-of-type > th')
    expect(headerEles.length).toBe(3)
    expect(headerEles[0].getAttribute('role')).toBe('columnheader')
    expect(headerEles[1].getAttribute('role')).toBe('columnheader')
    expect(headerEles[2].getAttribute('role')).toBe('columnheader')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render scope attribute on column headers', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    const headerEles = wrapper.find('thead:first-of-type > tr:first-of-type > th')
    expect(headerEles.length).toBe(3)
    expect(headerEles[0].getAttribute('scope')).toBe('col')
    expect(headerEles[1].getAttribute('scope')).toBe('col')
    expect(headerEles[2].getAttribute('scope')).toBe('col')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render aria-hidden attribute on column header sort icon', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    const icons = wrapper.find('thead:first-of-type > tr:first-of-type > th > i')
    expect(icons.length).toBe(2)
    expect(icons[0].getAttribute('aria-hidden')).toBe('true')
    expect(icons[1].getAttribute('aria-hidden')).toBe('true')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render aria-label attribute on column headers', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    const headerEles = wrapper.find('thead:first-of-type > tr:first-of-type > th')
    expect(headerEles.length).toBe(3)
    expect(headerEles[0].element.getAttribute('aria-label')).toEqual(expect.stringContaining(data.propsData.headers[0].text))
    expect(headerEles[0].element.getAttribute('aria-label')).toEqual(expect.stringContaining('Sorted ascending'))
    expect(headerEles[1].element.getAttribute('aria-label')).toEqual(expect.stringContaining(data.propsData.headers[1].text))
    expect(headerEles[1].element.getAttribute('aria-label')).toEqual(expect.stringContaining('Not sorted'))
    expect(headerEles[2].element.getAttribute('aria-label')).toEqual(expect.stringContaining(data.propsData.headers[2].text))
    expect(headerEles[2].element.getAttribute('aria-label')).toEqual(expect.stringContaining('Not sorted'))

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render aria-sort attribute on column headers', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    let headerEles = wrapper.find('thead:first-of-type > tr:first-of-type > th')
    expect(headerEles.length).toBe(3)
    expect(headerEles[0].getAttribute('aria-sort')).toBe('ascending')
    expect(headerEles[1].getAttribute('aria-sort')).toBe('none')
    expect(headerEles[2].getAttribute('aria-sort')).toBe('none')

    const pagination = data.propsData.pagination
    pagination.sortBy = 'col3'
    pagination.descending = false
    wrapper.setProps({ pagination: pagination })

    headerEles = wrapper.find('thead:first-of-type > tr:first-of-type > th')
    expect(headerEles.length).toBe(3)
    expect(headerEles[0].getAttribute('aria-sort')).toBe('none')
    expect(headerEles[1].getAttribute('aria-sort')).toBe('none')
    expect(headerEles[2].getAttribute('aria-sort')).toBe('ascending')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render tabindex on sortable column headers', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    const headerEles = wrapper.find('thead:first-of-type > tr:first-of-type > th')
    expect(headerEles.length).toBe(3)
    expect(headerEles[0].getAttribute('tabindex')).toBe('0')
    expect(headerEles[1].element.getAttribute('tabindex')).toBeFalsy()
    expect(headerEles[2].getAttribute('tabindex')).toBe('0')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render aria-label attribute on pagination arrow buttons', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    const buttons = wrapper.find('.datatable__actions > button')
    expect(buttons.length).toBe(2)
    expect(buttons[0].element.getAttribute('aria-label')).toEqual(expect.stringContaining('Previous page'))
    expect(buttons[1].element.getAttribute('aria-label')).toEqual(expect.stringContaining('Next page'))

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render aria-label attribute on pagination select', async () => {
    const data = dataTableTestData()
    const wrapper = mount(VDataTable, data)

    const select = wrapper.find('.datatable__actions .input-group--select')
    expect(select.length).toBe(1)
    expect(select[0].element.getAttribute('aria-label')).toEqual(expect.stringContaining(wrapper.vm.$props.rowsPerPageText))

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
