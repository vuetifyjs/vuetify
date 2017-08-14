import { VListGroup } from '~components/VList'
import { test } from '~util/testing'

test('VListGroup.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VListGroup)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a lazy component and match snapshot', () => {
    const wrapper = mount(VListGroup, {
      propsData: {
        lazy: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a component with no padding for action icon and match snapshot', () => {
    const wrapper = mount(VListGroup, {
      propsData: {
        noAction: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a component with route namespace and match snapshot', () => {
    const $route = { path: '' }
    const wrapper = mount(VListGroup, {
      propsData: {
        group: 'listGroup'
      },
      globals: {
        $route
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
