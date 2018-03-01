import { test } from '@/test'
import VTabsSlider from '@/components/VTabs/VTabsSlider.js'

test('VTabsSlider.vue', ({ mount }) => {
  it('should render a tabs slider', () => {
    const wrapper = mount(VTabsSlider, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })
})
