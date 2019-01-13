import { test } from '@/test'
import VSheet from '@/components/VSheet'

test('VSheet.vue', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VSheet)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a colored paper', () => {
    const wrapper = mount(VSheet, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })

  it('should render a tile paper', () => {
    const wrapper = mount(VSheet, {
      propsData: {
        tile: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
