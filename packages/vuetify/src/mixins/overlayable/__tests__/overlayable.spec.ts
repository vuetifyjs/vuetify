// Components
import Overlayable from '../index'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('Overlayable.ts', () => {
  const Mock = Overlayable.extend({
    data: () => ({
      isActive: false,
    }),

    render: h => h('div'),
  })

  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')
  })

  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Mock, {
        mocks: {
          $vuetify: { breakpoint: {} },
        },
        ...options,
      })
    }
  })

  it('should avoid removing overlay', async () => {
    const wrapper = mountFunction()

    wrapper.vm.genOverlay()

    await new Promise(resolve => window.requestAnimationFrame(resolve))

    expect(wrapper.vm.overlay).toBeTruthy()

    wrapper.vm.removeOverlay()
    // Simular overlay being rapidly opened/closed
    wrapper.vm.overlay.value = true

    const event = new Event('transitionend')

    wrapper.vm.overlay.$el.dispatchEvent(event)
    expect(wrapper.vm.overlay).toBeTruthy()

    wrapper.vm.removeOverlay()

    wrapper.vm.overlay.$el.dispatchEvent(event)
    expect(wrapper.vm.overlay).toBeFalsy()
  })

  // https://github.com/vuetifyjs/vuetify/issues/8473
  it('should get root element z-index if activeIndex is not available', async () => {
    const wrapper = mountFunction()

    wrapper.vm.$el.style.zIndex = 8

    wrapper.vm.genOverlay()

    await new Promise(resolve => window.requestAnimationFrame(resolve))

    expect(wrapper.vm.overlay.zIndex).toBe(8)
  })
})
