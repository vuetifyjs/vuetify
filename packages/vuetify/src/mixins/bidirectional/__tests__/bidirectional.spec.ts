// Components
import Bidirectional from '../'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('Bidirectional.ts', () => {
  type Instance = InstanceType<typeof Bidirectional>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  const Mock = Bidirectional.extend({ render: h => h('div') })

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Mock, {
        mocks: {
          $vuetify: { rtl: false },
        },
        ...options,
      })
    }
  })

  it('should work', () => {
    const wrapper = mountFunction()
    const vuetify = (wrapper.vm as any).$vuetify

    expect(wrapper.vm.isRtl).toBe(false)

    wrapper.setProps({ rtl: true })

    expect(wrapper.vm.isRtl).toBe(true)

    wrapper.setProps({ rtl: false })
    vuetify.rtl = true

    expect(wrapper.vm.isRtl).toBe(true)

    vuetify.rtl = false

    expect(wrapper.vm.isRtl).toBe(false)
  })
})
