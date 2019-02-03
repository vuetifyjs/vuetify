import VCarousel from '@/components/VCarousel/VCarousel'
import VCarouselItem from '@/components/VCarousel/VCarouselItem'
import { test, touch } from '@/test'
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

test('VCarousel.ts', ({ mount }) => {
  it('should render component in RTL mode and match snapshot', async () => {
    const wrapper = mount(VCarousel)
    wrapper.vm.$vuetify.rtl = true
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.vm.$vuetify.rtl = undefined
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

  it('should render component with custom prev icon and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        prevIcon: 'stop'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-carousel__prev .v-icon')[0].text()).toBe('stop')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without prev icon and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        prevIcon: false
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.contains('.v-carousel__prev')).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom next icon and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        nextIcon: 'stop'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-carousel__next .v-icon')[0].text()).toBe('stop')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without next icon and match snapshot', async () => {
    const wrapper = mount(VCarousel, {
      propsData: {
        nextIcon: false
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.contains('.v-carousel__next')).toBe(false)
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
    const vm = new Vue()
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
      wrapper.vm.$on('change', value => {
        input(value)
        input.mock.calls.length === 3 && resolve()
      })
    })

    expect([].concat(...input.mock.calls)).toEqual([2, 0, 1])
  })

  it('should render component without delimiters', async () => {
    const component = create({ hideDelimiters: true })
    const wrapper = mount(component)
    await wrapper.vm.$nextTick()

    expect(wrapper.contains('carousel__controls')).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without controls', async () => {
    const component = create({ hideControls: true })
    const wrapper = mount(component)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-carousel__prev')).toHaveLength(0)
    expect(wrapper.find('.v-carousel__next')).toHaveLength(0)
  })

  it('should change item on swipe', async () => {
    const wrapper = mount(create())
    await wrapper.vm.$nextTick()

    const input = jest.fn()
    wrapper.vm.$children[0].$on('change', input)

    touch(wrapper).start(0, 0).end(-20, 0)
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(1)
    touch(wrapper).start(0, 0).end(20, 0)
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(0)
  })

  it('should change item on controls click', async () => {
    const wrapper = mount(create())
    await wrapper.vm.$nextTick()

    const input = jest.fn()
    wrapper.vm.$children[0].$on('change', input)

    wrapper.find('.v-carousel__controls__item')[2].trigger('click')
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(2)
  })

  it('should auto change height when v-carousel changed height', async () => {
    const vm = new Vue()
    const wrapper = mount(VCarousel, {
      slots: {
        default: {
          vNode: vm.$createElement(VCarouselItem, { attrs: { src: '1' } })
        }
      }
    })

    wrapper.setProps({ height: 600 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.height).toEqual(600)
    expect(wrapper.find('.v-carousel__item')[0].hasStyle('height', '600px')).toBe(true)

    wrapper.setProps({ height: 200 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.height).toEqual(200)
    expect(wrapper.find('.v-carousel__item')[0].hasStyle('height', '200px')).toBe(true)
  })
})
