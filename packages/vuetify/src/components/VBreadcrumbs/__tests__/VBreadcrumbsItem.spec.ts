// Components
import VBreadcrumbsItem from '../VBreadcrumbsItem'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VBreadcrumbsItem.ts', () => {
  type Instance = InstanceType<typeof VBreadcrumbsItem>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VBreadcrumbsItem, {
        ...options
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: Use vue-router or nuxt in tests
  it.skip('should have a custom active class', () => {
    const wrapper = mountFunction({
      propsData: {
        activeClass: 'v-breadcrumbs-item--active',
        to: '/'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
