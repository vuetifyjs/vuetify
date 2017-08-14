import { test } from '~util/testing'
import VParallax from '~components/VParallax'

test('VParallax.js', ({ mount }) => {
  it('should abandon init if already destroyed', async () => {
    const wrapper = mount(VParallax, {
      attachToDocument: true
    })

    wrapper.vm.$destroy()
    wrapper.vm.init()
  })
})
