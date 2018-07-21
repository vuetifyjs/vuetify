import { test } from '@/test'
import VPaper from '@/components/VPaper'

test('VPaper.vue', ({ mount }) => {
  it('should render component', () => {
    const wrapper = mount(VPaper)

    expect(wrapper.element.classList).toContain('v-paper')
    expect(wrapper.element.classList).toContain('elevation-0')
  })

  it('should render component with the proper elevation', () => {
    const wrapper = mount(VPaper, {
      propsData: {
        elevation: 10
      }
    })

    expect(wrapper.element.classList).toContain('v-paper')
    expect(wrapper.element.classList).toContain('elevation-10')
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
