import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'
import VCalendar from '../VCalendar'

describe('VCalendarCategory', () => {
  type Instance = ExtractVue<typeof VCalendar>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCalendar, {
        ...options,
        mocks: {
          $vuetify: {
            lang: {
              current: 'en-US',
            },
          },
        },
      })
    }
  })

  it('should test categoryText prop as a string', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'category',
        events: [{ start: new Date(), category: 'Nate' }],
        categories: [{ name: 'Nate' }],
        categoryText: 'name',
      },
    })

    expect(wrapper.find('.v-calendar-category__column-header').text()).toEqual('Nate')
  })

  it('should test categoryText prop as a function', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'category',
        events: [{ start: new Date(), category: '20' }],
        categories: [{ name: 'Nate', age: '20' }],
        categoryText (category) {
          return category.age
        },
      },
    })

    expect(wrapper.find('.v-calendar-category__column-header').text()).toEqual('20')
  })

  it('should pass entire cateogry to interval style method', () => {
    function intervalStyle (obj) {
      expect(obj.category.name).toEqual('Nate')
      expect(obj.category.age).toEqual(20)
      expect(obj.category.categoryName).toEqual('Nate')
    }

    const wrapper = mountFunction({
      propsData: {
        type: 'category',
        events: [{ start: new Date(), category: 'Nate' }],
        categories: [{ name: 'Nate', age: 20 }, { name: 'Bob', age: 30 }],
        categoryText: 'name',
        intervalStyle,
      },
    })
  })

  it('should show all categories when events arent tied to each catogry', () => {
    let intervals = 0
    function intervalStyle (obj) {
      if (intervals < 24) expect(obj.category.name).toEqual('Nate')
      else expect(obj.category.name).toEqual('Bob')
      intervals++
    }

    const wrapper = mountFunction({
      propsData: {
        type: 'category',
        categoryShowAll: true,
        events: [{ start: new Date(), category: 'Nate' }],
        categories: [{ name: 'Nate', age: 20 }, { name: 'Bob', age: 30 }],
        categoryText: 'name',
        intervalStyle,
      },
    })
  })

  it('should pass strings from an array', () => {
    let intervals = 0
    function intervalStyle (obj) {
      if (intervals < 24) expect(obj.category).toEqual('Nate')
      else expect(obj.category).toEqual('Bob')
      intervals++
    }

    const wrapper = mountFunction({
      propsData: {
        type: 'category',
        events: [{ start: new Date(), category: 'Nate' }, { start: new Date(), category: 'Bob' }],
        categories: ['Nate', 'Bob'],
        intervalStyle,
      },
    })
  })
})
