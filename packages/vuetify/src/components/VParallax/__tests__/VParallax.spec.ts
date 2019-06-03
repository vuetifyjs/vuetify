// Components
import VParallax from '../VParallax'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VParallax.ts', () => {
  type Instance = InstanceType<typeof VParallax>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VParallax, {
        ...options,
      })
    }
  })

  it('should render', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use alt tag when supplied', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        alt: 'name',
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('name')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use empty alt tag when not supplied', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
    })

    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
