import { test } from '~util/testing'
import VParallax from '~components/VParallax'

test('VParallax.js', ({ mount }) => {
  it('should render', async () => {
    const wrapper = mount(VParallax, {
      attachToDocument: true
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
