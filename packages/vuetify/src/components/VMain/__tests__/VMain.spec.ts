// Components
import VMain from '../VMain'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VMain.ts', () => {
  type Instance = InstanceType<typeof VMain>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VMain, {
        ...options,
        mocks: {
          $vuetify: {
            application: {
              bar: 24,
              top: 64,
              left: 256,
              right: 256,
              footer: 48,
              insetFooter: 32,
              bottom: 56,
            },
          },
        },
      })
    }
  })

  it('should work', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
