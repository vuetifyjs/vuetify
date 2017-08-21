import VCarousel from '~components/VCarousel'
import VCarouselItem from './VCarouselItem'
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

  it('should render component with selected active item', async () => {
    const vm = mount(VCarousel).vm
    const wrapper = mount(VCarousel, {
      propsData: {
        value: 1
      },
      slots: {
        default: [1, 2, 3].map(i => {
          return {
            vNode: vm.$createElement(VCarouselItem, { attrs: { src: i.toString() } })
          }
        })
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event after interval', async () => {
    const vm = mount(VCarousel).vm
    const wrapper = mount(VCarousel, {
      propsData: {
        value: 1,
        interval: 3
      },
      slots: {
        default: [1, 2, 3].map(i => {
          return {
            vNode: vm.$createElement(VCarouselItem, { attrs: { src: i.toString() } })
          }
        })
      }
    })

    const values = []
    await new Promise(resolve => {
      wrapper.instance().$on('input', value => {
        values.push(value)
        if (values.length === 3) {
          resolve()
        }
      })
    })
    expect(values).toEqual([1, 2, 0])
  })
})
