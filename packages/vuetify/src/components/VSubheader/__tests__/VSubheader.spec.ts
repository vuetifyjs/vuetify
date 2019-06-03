// Components
import VSubheader from '../VSubheader'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VSubheader.ts', () => {
  type Instance = InstanceType<typeof VSubheader>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VSubheader, {
        ...options,
      })
    }
  })

  it('should have custom class', () => {
    const wrapper = mount({
      render: h => h(VSubheader, { staticClass: 'foo' }),
    })

    expect(wrapper.element.classList.contains('foo')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be light', () => {
    const wrapper = mountFunction({
      propsData: { light: true },
    })

    expect(wrapper.element.classList.contains('theme--light')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be dark', () => {
    const wrapper = mountFunction({
      propsData: { dark: true },
    })

    expect(wrapper.element.classList.contains('theme--dark')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be inset', () => {
    const wrapper = mountFunction({
      propsData: { inset: true },
    })

    expect(wrapper.element.classList.contains('v-subheader--inset')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
