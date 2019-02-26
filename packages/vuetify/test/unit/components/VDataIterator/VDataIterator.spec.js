import Vue from 'vue'
import { test } from '@/test'
import VDataIterator from '@/components/VDataIterator'
import VBtn from '@/components/VBtn'

test.skip('VDataIterator.js', ({ mount, compileToFunctions }) => {
  function dataIteratorTestData () {
    return {
      propsData: {
        pagination: {
          descending: false,
          sortBy: 'col1',
          rowsPerPage: 5,
          page: 1
        },
        items: [
          { other: 1, col1: 'foo', col2: 'a', col3: 1 },
          { other: 2, col1: null, col2: 'b', col3: 2 },
          { other: 3, col1: undefined, col2: 'c', col3: 3 }
        ]
      }
    }
  }

  it('should match a snapshot - no matching records', () => {
    const data = dataIteratorTestData()
    data.propsData.search = "asdf"
    const wrapper = mount(VDataIterator, data)

    expect(wrapper.html()).toMatchSnapshot()

    const content = wrapper.find('.v-data-iterator div div')[0]
    expect(content.element.textContent).toBe('No matching records found')

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should match a snapshot - hideActions and no footer slot', () => {
    const data = dataIteratorTestData()
    data.propsData.hideActions = true
    const wrapper = mount(VDataIterator, data)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match a snapshot - footer slot', () => {
    const data = dataIteratorTestData()
    data.slots = {
      footer: [compileToFunctions('<span>footer</span>')],
    }
    const wrapper = mount(VDataIterator, data)

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should match a snapshot - no data', () => {
    const data = dataIteratorTestData()
    data.propsData.items = []
    const wrapper = mount(VDataIterator, data)

    expect(wrapper.html()).toMatchSnapshot()

    const content = wrapper.find('.v-data-iterator div div')[0]
    expect(content.element.textContent).toBe('No data available')

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should match a snapshot - with data', async () => {
    const data = dataIteratorTestData()

    const vm = new Vue()
    const item = props => vm.$createElement('div', [props.item.col2])
    const component = Vue.component('test', {
      render (h) {
        return h(VDataIterator, {
          props: {
            'content-tag': 'span',
            ...data.propsData
          },
          scopedSlots: {
            item
          }
        })
      }
    })

    const wrapper = mount(component)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$vuetify.rtl = true
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-data-iterator__actions__range-controls')[0].html()).toMatchSnapshot()
    wrapper.vm.$vuetify.rtl = undefined

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should pass attrs, class and props to content', () => {
    const data = dataIteratorTestData()

    const vm = new Vue()
    const item = props => vm.$createElement('div', [props.item.col2])
    const component = Vue.component('test', {
      render (h) {
        return h(VDataIterator, {
          props: {
            'content-tag': 'button', // TODO: use v-btn so we can test content-props
            ...data.propsData,
            // 'content-props': { block: true }, // TODO: enable when migrating to vue-test-utils
            'content-class': 'test__class'
          },
          attrs: {
            id: "testButtonId"
          },
          scopedSlots: {
            item
          }
        })
      }
    })

    const wrapper = mount(component)

    const mainDiv = wrapper.find('.v-data-iterator')[0]
    expect(mainDiv.hasAttribute('id')).toBe(false)

    var button = mainDiv.find('button')[0]
    expect(button.getAttribute('id')).toBe('testButtonId')
    // expect(button.hasClass('v-btn--block')).toBe(true) // TODO: enable when migrating to vue-test-utils
    expect(button.hasClass('test__class')).toBe(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should not filter items if search is empty', async () => {
    const data = dataIteratorTestData()
    data.propsData.search = '    '
    const wrapper = mount(VDataIterator, data)

    expect(wrapper.instance().filteredItems).toHaveLength(data.propsData.items.length)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render header slot', async () => {
    const data = dataIteratorTestData()
    data.slots = {
      footer: [compileToFunctions('<span class="header">header</span>')],
    }

    const wrapper = mount(VDataIterator, data)

    expect(wrapper.find('span.header').length).toBe(1)
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should reset to page 1 when data is smaller than current page', async () => {
    const data = dataIteratorTestData()
    data.propsData.pagination.rowsPerPage = 1
    data.propsData.pagination.page = 2

    const wrapper = mount(VDataIterator, data)

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-data-iterator__actions__pagination')[0].text()).toBe('2-2 of 3')

    wrapper.setProps({ items: [] })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-data-iterator__actions__pagination')[0].text()).toBe('–')
    expect(wrapper.find('[aria-label="Previous page"]')[0].hasClass('v-btn--disabled')).toBe(false)
    expect(wrapper.find('[aria-label="Next page"]')[0].hasClass('v-btn--disabled')).toBe(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
