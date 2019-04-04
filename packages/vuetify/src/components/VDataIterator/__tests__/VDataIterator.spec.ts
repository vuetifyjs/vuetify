import VDataIterator from '../VDataIterator'
import { Lang } from '../../../services/lang'
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'
import Vue from 'vue'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      prev: 'mdi-chevron-left',
      next: 'mdi-chevron-right',
      dropdown: 'mdi-menu-down',
      first: 'mdi-page-first',
      last: 'mdi-page-last'
    }
  }
}

describe('VDataIterator.ts', () => {
  type Instance = InstanceType<typeof VDataIterator>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    document.body.setAttribute('data-app', '')

    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDataIterator, {
        mocks: {
          $vuetify: {
            lang: new Lang(),
            theme: {
              dark: false
            }
          }
        },
        ...options
      })
    }
  })

  it('should render and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render and match snapshot with data', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          'foo',
          'bar',
          'baz',
          'qux'
        ]
      },
      scopedSlots: {
        default: '<p slot-scope="item">{{ item }}</p>'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
