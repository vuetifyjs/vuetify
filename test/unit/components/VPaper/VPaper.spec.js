import { test } from '@/test'
import VPaper from '@/components/VPaper'

test('VPaper.vue', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VPaper)

    expect(wrapper.element.classList).toContain('v-paper')
  })

  it('should render a squared paper', () => {
    const wrapper = mount(VPaper, {
      propsData: {
        square: true
      }
    })

    expect(wrapper.element.classList).toContain('v-paper--square')
  })

  it('should render a colored paper', () => {
    const wrapper = mount(VPaper, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })
})
