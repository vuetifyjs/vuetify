import { test, functionalContext } from '@/test'
import VPaper from '@/components/VPaper'

test('VPaper.vue', ({ mount }) => {
  it('should change elevation on mouseover', async () => {
    const wrapper = mount(VPaper, functionalContext({
      props: {
        elevation: 5
      }
    }))

    expect(wrapper.element.classList.contains('elevation-5')).toBe(true)
  })
})
