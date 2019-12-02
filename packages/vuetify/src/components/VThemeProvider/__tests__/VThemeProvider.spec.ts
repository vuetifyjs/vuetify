// Components
import VThemeProvider from '../VThemeProvider'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VThemeProvider.ts', () => {
  type Instance = InstanceType<typeof VThemeProvider>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VThemeProvider, {
        ...options,
      })
    }
  })

  it('should change based upon root $vuetify', () => {
    const wrapper = mountFunction({
      provide: {
        theme: { isDark: true },
      },
      mocks: {
        $vuetify: {
          theme: { dark: false },
        },
      },
    })

    expect(wrapper.vm.isDark).toBe(true)

    wrapper.setProps({ root: true })

    expect(wrapper.vm.isDark).toBe(false)
  })
})
