import VList from '~components/VList'
import { test } from '~util/testing'

test('VList.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VList)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a dense component and match snapshot', () => {
    const wrapper = mount(VList, {
      propsData: {
        dense: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a subheader component and match snapshot', () => {
    const wrapper = mount(VList, {
      propsData: {
        subheader: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a threeLine component and match snapshot', () => {
    const wrapper = mount(VList, {
      propsData: {
        threeLine: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a twoLine component and match snapshot', () => {
    const wrapper = mount(VList, {
      propsData: {
        twoLine: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
