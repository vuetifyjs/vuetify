// Components
import VResponsive from '../VResponsive'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VResponsive.ts', () => {
  type Instance = InstanceType<typeof VResponsive>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VResponsive, {
        ...options,
      })
    }
  })

  it('should force aspect ratio', () => {
    const wrapper = mountFunction({
      propsData: { aspectRatio: 16 / 9 },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render content', () => {
    const wrapper = mountFunction({
      slots: {
        default: { render: h => h('div', ['content']) },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set height', () => {
    const wrapper = mountFunction({
      propsData: { height: 100, maxHeight: 200 },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
