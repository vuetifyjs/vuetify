import { test } from '@/test'
import Rippleable from '@/mixins/rippleable'

const Mock = {
  mixins: [Rippleable],

  data: () => ({
    rippleClasses: null
  }),

  render (h) {
    return this.genRipple()
  }
}

test('menuable.js', ({ mount }) => {
  it('should react to click', () => {
    const wrapper = mount(Mock)

    const click = jest.fn()

    wrapper.setMethods({ toggle: click })
    wrapper.trigger('click')

    expect(click).toHaveBeenCalled()
  })

  it('should match snapshot', () => {
    const wrapper = mount(Mock)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setData({ rippleClasses: 'foo' })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
