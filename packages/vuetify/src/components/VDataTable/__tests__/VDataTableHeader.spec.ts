import VDataTableHeader from '../VDataTableHeader'
import { Lang } from '../../../services/lang'
import ripple from '../../../directives/ripple'
import VSelect from '../../VSelect/VSelect'
import { preset } from '../../../presets/default'

import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import Vue from 'vue'

const testHeaders = [
  {
    text: 'Dessert (100g serving)',
    align: 'left',
    sortable: false,
    value: 'name',
  },
  { text: 'Calories', width: 50, value: 'calories' },
  { text: 'Fat (g)', width: '50em', value: 'fat' },
  { text: 'Carbs (g)', value: 'carbs' },
  { text: 'Protein (g)', value: 'protein' },
  { text: 'Iron (%)', value: 'iron' },
]

Vue.prototype.$vuetify = {
  rtl: false,
  lang: new Lang(preset),
  theme: {
    dark: false,
  },
}
Vue.directive('ripple', ripple)

describe('VDataTableHeader.ts', () => {
  type Instance = InstanceType<typeof VDataTableHeader>
  let mountFunction: (options?: MountOptions<Instance>, isMobile?: boolean) => Wrapper<Instance>

  ;[false, true].forEach(isMobile => {
    describe(isMobile ? 'mobile' : 'desktop', () => { // eslint-disable-line jest/valid-title
      beforeEach(() => {
        document.body.setAttribute('data-app', 'true')

        mountFunction = (options?: MountOptions<Instance>) => {
          return mount(VDataTableHeader, {
            ...options,
            // https://github.com/vuejs/vue-test-utils/issues/1130
            sync: false,
            propsData: {
              headers: testHeaders,
              mobile: isMobile,
              ...(options || {}).propsData,
            },
          })
        }
      })

      it('should render', () => {
        const wrapper = mountFunction()

        expect(wrapper.html()).toMatchSnapshot()
      })
      it('should work with showGroupBy', () => {
        const wrapper = mountFunction({
          propsData: {
            showGroupBy: true,
          },
        })

        expect(wrapper.html()).toMatchSnapshot()
      })

      it('should work with multiSort', () => {
        const wrapper = mountFunction({
          propsData: {
            options: {
              multiSort: true,
              sortBy: ['iron'],
              sortDesc: [true],
            },
          },
        })

        expect(wrapper.html()).toMatchSnapshot()
      })

      it('should work with sortBy correctly', () => {
        const wrapper = mountFunction({
          propsData: {
            options: {
              sortBy: ['iron'],
              sortDesc: [true],
            },
          },
        })

        expect(wrapper.html()).toMatchSnapshot()
      })

      it('should work with sortDesc correctly', () => {
        const wrapper = mountFunction({
          propsData: {
            options: {
              sortBy: ['iron', 'carbs'],
              sortDesc: [false, true],
            },
          },
        })

        expect(wrapper.html()).toMatchSnapshot()
      })

      if (isMobile) {
        it('should render with data-table-select header', () => {
          const wrapper = mountFunction({
            propsData: {
              headers: [...testHeaders, { text: 'test', value: 'data-table-select' }],
            },
          })

          expect(wrapper.html()).toMatchSnapshot()
        })

        it('should sort when select changes', () => {
          const sort = jest.fn()
          const wrapper = mountFunction({
            listeners: {
              sort,
            },
          })
          const select = wrapper.find(VSelect)

          select.vm.$emit('change', 'test')
          expect(sort).toHaveBeenLastCalledWith('test')
        })

        it('should apply header class and width for select-all column', () => {
          const wrapper = mount(VDataTableHeader, {
            propsData: {
              mobile: isMobile,
              headers: [
                {
                  value: 'data-table-select',
                  width: '100px',
                  class: 'foo',
                },
              ],
            },
          })

          const foo = wrapper.find('.foo')
          expect(foo.exists()).toBe(true)
          expect(foo.attributes().width).toBe('100px')
        })
      }
    })
  })
})
