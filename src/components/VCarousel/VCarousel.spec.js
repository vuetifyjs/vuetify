import VCarousel from '~components/VCarousel'
import { test } from '~util/testing'

test('VCarousel.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCarousel)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with image cycling off and match snapshot', () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        cycle: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom icon and match snapshot', () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        icon: 'stop'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom duration between image cycles and match snapshot', () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        interval: 1000
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom left control icon and match snapshot', () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        leftControlIcon: 'stop'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without left control icon and match snapshot', () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        leftControlIcon: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom right control icon and match snapshot', () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        rightControlIcon: 'stop'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without right control icon and match snapshot', () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        rightControlIcon: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
