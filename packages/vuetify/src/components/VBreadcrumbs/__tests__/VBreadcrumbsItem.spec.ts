// Components
import VBreadcrumbsItem from '../VBreadcrumbsItem'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VBreadcrumbsItem.ts', () => {
  type Instance = InstanceType<typeof VBreadcrumbsItem>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VBreadcrumbsItem, {
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with active & link state and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        link: true,
      },
    })
    wrapper.setData({
      isActive: true,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
