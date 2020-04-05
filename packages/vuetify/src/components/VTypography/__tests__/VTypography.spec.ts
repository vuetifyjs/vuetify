// Components
import VTypography from '../VTypography'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VTypography.ts', () => {
  type Instance = InstanceType<typeof VTypography>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VTypography, {
        ...options,
      })
    }
  })

  it('should apply correct classes', () => {
    const wrapper = mountFunction({
      propsData: {
        scale: 'headline',
        sm: 'display-1',
        md: 'display-2',
        lg: 'display-3',
        xl: 'display-4',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
