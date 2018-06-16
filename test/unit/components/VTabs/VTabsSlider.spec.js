import { test } from '@/test'
import VTabsSlider from '@/components/VTabs/VTabsSlider.js'

test('VTabsSlider.vue', ({ mount }) => {
  it('should render a tabs slider', () => {
    const wrapper = mount(VTabsSlider, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.classes()).toContain('blue')
    expect(wrapper.classes()).toContain('lighten-1')
  })
})
