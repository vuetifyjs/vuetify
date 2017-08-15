import { VList, VListGroup } from '~components/VList'
import { test } from '~util/testing'

test('VListGroup.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VList, {
      slots: {
        default: [VListGroup]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a lazy component and match snapshot', () => {
    const wrapper = mount(VList, {
      propsData: {
        lazy: true
      },
      slots: {
        default: [VListGroup]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a component with no padding for action icon and match snapshot', () => {
    const wrapper = mount(VList, {
      propsData: {
        noAction: true
      },
      slots: {
        default: [VListGroup]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a component with route namespace and match snapshot', () => {
    const $route = { path: '' }
    const wrapper = mount(VList, {
      propsData: {
        group: 'listGroup'
      },
      slots: {
        default: [VListGroup]
      },
      globals: {
        $route
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
