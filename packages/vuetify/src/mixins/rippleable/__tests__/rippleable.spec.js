import { test } from '@/test'
import Rippleable from '@/mixins/rippleable'

const Mock = {
  mixins: [Rippleable],

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
  })
})
