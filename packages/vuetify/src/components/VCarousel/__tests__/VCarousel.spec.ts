// Libraries
import Vue from 'vue'

// Components
import VCarousel from '../VCarousel'
import VCarouselItem from '../VCarouselItem'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'
import { rafPolyfill } from '../../../../test'

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

describe('VCarousel.ts', () => {
  type Instance = InstanceType<typeof VCarousel>
  let mountFunction: (options?: object) => Wrapper<Instance>

  rafPolyfill(window)

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VCarousel, {
        mocks: {
          $vuetify: {
            rtl: false,
            lang: {
              t: str => str
            }
          }
        },
        ...options
      })
    }
  })

  it('it should restart or clear timeout on cycle change', async () => {
    const wrapper = mountFunction({
      props: { cycle: false }
    })

    const restartTimeout = jest.spyOn(wrapper.vm, 'restartTimeout')

    expect(wrapper.vm.slideTimeout).toBeUndefined()

    wrapper.setProps({ cycle: true })

    await new Promise(resolve => window.requestAnimationFrame(resolve))

    expect(wrapper.vm.slideTimeout).toBeTruthy()
    expect(restartTimeout).toHaveBeenCalled()

    wrapper.setProps({ cycle: false })

    await new Promise(resolve => window.requestAnimationFrame(resolve))

    expect(wrapper.vm.slideTimeout).toBeUndefined()
  })
})
