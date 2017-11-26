import Vue from 'vue'
import { compileToFunctions } from 'vue-template-compiler'
import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VDataIterator from './VDataIterator'
import VBtn from '~components/VBtn'

test('VDataIterator.js', () => {
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

    const content = wrapper.find('.data-iterator div div')[0]
    expect(content.element.textContent).toBe('No matching records found')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
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
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match a snapshot - no data', () => {
    const data = dataIteratorTestData()
    data.propsData.items = []
    const wrapper = mount(VDataIterator, data)

    expect(wrapper.html()).toMatchSnapshot()

    const content = wrapper.find('.data-iterator div div')[0]
    expect(content.element.textContent).toBe('No data available')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should match a snapshot - with data', () => {
    const data = dataIteratorTestData()

    const vm = new Vue()
    const item = props => vm.$createElement('div', [props.item.col2])
    const component = Vue.component('test', {
      components: {
        VBtn,
        VDataIterator
      },
      render (h) {
        return h('v-data-iterator', {
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
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should pass attrs, class and props to content', () => {
    const data = dataIteratorTestData()

    const vm = new Vue()
    const item = props => vm.$createElement('div', [props.item.col2])
    const component = Vue.component('test', {
      components: {
        VBtn,
        VDataIterator
      },
      render (h) {
        return h('v-data-iterator', {
          props: {
            'content-tag': 'v-btn',
            ...data.propsData,
            'content-props': { block: true },
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

    const mainDiv = wrapper.find('.data-iterator')[0]
    expect(mainDiv.hasAttribute('id')).toBe(false)

    var button = mainDiv.find('button')[0]
    expect(button.getAttribute('id')).toBe('testButtonId')
    expect(button.hasClass('btn--block')).toBe(true)
    expect(button.hasClass('test__class')).toBe(true)

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should not filter items if search is empty', async () => {
    const data = dataIteratorTestData()
    data.propsData.search = '    '
    const wrapper = mount(VDataIterator, data)

    expect(wrapper.instance().filteredItems).toHaveLength(data.propsData.items.length)

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
