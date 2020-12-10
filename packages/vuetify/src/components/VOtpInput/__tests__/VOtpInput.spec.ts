import VOtpInput from '../VOtpInput'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VOtpInput.ts', () => {
  type Instance = InstanceType<typeof VOtpInput>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VOtpInput, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        ...options,
      })
    }
  })

  // @todo - write more tests.
  it('should emit an input update', () => {
    const wrapper = mountFunction()

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    expect(wrapper.vm.lazyValue).toBeUndefined()
    wrapper.vm.internalValue = 'foo'
    expect(wrapper.vm.lazyValue).toBe('foo')
  })
})
