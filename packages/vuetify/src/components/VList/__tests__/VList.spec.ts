// Components
import VList from '../VList'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VList.ts', () => {
  type Instance = InstanceType<typeof VList>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VList, {
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a dense component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dense: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a subheader component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        subheader: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a threeLine component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        threeLine: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a twoLine component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        twoLine: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have an inferred role from injections', () => {
    const wrapper = mountFunction({
      provide: { isInMenu: true },
    })

    expect(wrapper.element.getAttribute('role')).toBeNull()

    const wrapper2 = mountFunction({
      provide: { isInNav: true },
    })

    expect(wrapper2.element.getAttribute('role')).toBeNull()

    const wrapper3 = mountFunction()

    expect(wrapper3.element.getAttribute('role')).toBe('list')
  })
})
