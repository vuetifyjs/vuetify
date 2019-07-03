// Components
import VContent from '../VContent'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VContent.ts', () => {
  type Instance = InstanceType<typeof VContent>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VContent, {
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
