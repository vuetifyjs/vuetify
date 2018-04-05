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
    const onChange = jest.fn()
    Mock.methods = { onChange }
    const wrapper = mount(Mock)

    wrapper.trigger('click')

    expect(onChange).toHaveBeenCalled()
  })

  it('should match snapshot', () => {
    const wrapper = mount(Mock)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setData({ rippleClasses: 'foo' })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
