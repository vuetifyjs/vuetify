// Libraries
import Vue from 'vue'

// Components
import VCarousel from '../VCarousel'
import VCarouselItem from '../VCarouselItem'
import VProgressLinear from '../../VProgressLinear/VProgressLinear'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
describe('VCarousel.ts', () => {
  type Instance = InstanceType<typeof VCarousel>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VCarousel, {
        sync: false,
        mocks: {
          $vuetify: {
            rtl: false,
            lang: {
              t: str => str,
            },
          },
        },
        ...options,
      })
    }
  })

  // TODO: animation frame not starting with jest 24
  it.skip('it should restart or clear timeout on cycle change', async () => {
    const wrapper = mountFunction({
      propsData: { cycle: false },
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

  it('should generate vertical delimiters', () => {
    const wrapper = mountFunction({
      propsData: { verticalDelimiters: 'left' },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ verticalDelimiters: 'right' })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should generate delimiters for each item', async () => {
    const wrapper = mountFunction({
      slots: {
        default: [
          { extends: VCarouselItem },
          { extends: VCarouselItem },
          { extends: VCarouselItem },
        ],
      },
    })

    await wrapper.vm.$nextTick()
    const items = wrapper.findAll('.v-carousel__controls__item')

    expect(items).toHaveLength(3)

    items.wrappers.forEach(item => {
      expect(item.attributes()['aria-label']).toBeDefined()
    })

    items.at(1).trigger('click')

    expect(wrapper.vm.internalIndex).toBe(1)

    items.at(0).trigger('click')

    expect(wrapper.vm.internalIndex).toBe(0)
  })

  it('should render a progress component', async () => {
    const wrapper = mountFunction({
      propsData: {
        progress: true,
      },
    })

    expect(wrapper.find(VProgressLinear).element).toBeTruthy()
  })

  it('should update internal height when height changes', async () => {
    const wrapper = mountFunction()

    wrapper.setProps({ height: 300 })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalHeight).toBe(300)

    wrapper.setProps({ height: 0 })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalHeight).toBe(300)
  })
})
