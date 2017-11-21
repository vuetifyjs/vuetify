import VCarousel from './VCarousel'
import VCarouselItem from './VCarouselItem'
import { test } from '~util/testing'
import Vue from 'vue'

const create = (props = {}, slots = 3) => Vue.component('zxc', {
  functional: true,
  render (h) {
    const items = []
    for (let i = 0; i < slots; i++) {
      items.push(h(VCarouselItem, { props: { src: `${i + 1}` } }))
    }
    return h(VCarousel, { props }, items)
  }
})

test('VCarousel.js', ({ mount }) => {
  it('should render component and match snapshot', async () => {
    const wrapper = mount(VCarousel)
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with image cycling off and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        cycle: false
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom icon and match snapshot', async () => {
    const component = create({
      delimiterIcon: 'stop'
    })
    const wrapper = mount(component)
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom duration between image cycles and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        interval: 1000
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom prepended icon and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        prependIcon: 'stop'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.carousel__left .icon')[0].text()).toBe('stop')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without prepended icon and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        prependIcon: false
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.contains('.carousel__left')).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom appended icon and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        appendIcon: 'stop'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.carousel__right .icon')[0].text()).toBe('stop')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without appended icon and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        appendIcon: false
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.contains('.carousel__right')).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with selected active item', async () => {
    const component = create({ value: 1 })
    const wrapper = mount(component)
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: Use jest's fake timers
  it('should emit input event after interval', async () => {
    const vm = mount(VCarousel).vm
    const wrapper = mount(VCarousel, {
      propsData: {
        value: 1,
        interval: 1
      },
      slots: {
        default: [1, 2, 3].map(i => {
          return {
            vNode: vm.$createElement(VCarouselItem, { attrs: { src: i.toString() } })
          }
        })
      }
    })

    const input = jest.fn()
    await new Promise(resolve => {
      wrapper.vm.$on('input', value => {
        input(value)
        input.mock.calls.length === 3 && resolve()
      })
    })

    expect([].concat(...input.mock.calls)).toEqual([1, 2, 0])
  })

  it('should render component without delimiters', async () => {
    const component = create({ hideDelimiters: true })
    const wrapper = mount(component)
    await wrapper.vm.$nextTick()

    expect(wrapper.contains('carousel__controls')).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
