import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'
import VCalendarCategory from '../VCalendarCategory'

describe('VCalendarCategory', () => {
  type Instance = ExtractVue<typeof VCalendarCategory>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCalendarCategory, {
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
        categories: [{ name: 'Nate' }],
        categoryText: 'name',
      },
    })

    expect(wrapper.find('.v-calendar-category__column-header').text()).toEqual('Nate')
  })

  it('should test categoryText prop as a function', () => {
    const wrapper = mountFunction({
      propsData: {
        categories: [{ name: 'Nate', age: 20 }],
        categoryText (category) {
          return category.age
        },
      },
    })

    expect(wrapper.find('.v-calendar-category__column-header').text()).toEqual('20')
  })

  it('should pass entire cateogry to interval style method', () => {
    function intervalStyle (obj) {
      expect(obj.category).toEqual({ name: 'Nate', age: 20, categoryName: 'Nate' })
    }

    const wrapper = mountFunction({
      propsData: {
        categories: [{ name: 'Nate', age: 20 }],
        categoryText: 'name',
        intervalStyle,
      },
    })
  })
})
