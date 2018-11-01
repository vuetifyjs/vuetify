import { test } from '@/test'
import VResponsive from '@/components/VResponsive'

test('VResponsive', ({ mount }) => {
  it('should force aspect ratio', () => {
    const wrapper = mount(VResponsive, {
      propsData: { aspectRatio: 16/9 }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render content', () => {
    const wrapper = mount(VResponsive, {
      slots: {
        default: { render: h => h('div', ['content']) }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set height', () => {
    const wrapper = mount(VResponsive, {
      propsData: { height: 100, maxHeight: 200 }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
