import Rippleable from '../'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('rippleable.ts', () => {
  const Mock = Rippleable.extend({
    render () {
      return this.genRipple()
    },
  })

  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Mock, options)
    }
  })

  it('should react to click', () => {
    const onChange = jest.fn()
    const wrapper = mountFunction({
      methods: {
        onChange,
      },
    })

    wrapper.trigger('click')

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('should match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
