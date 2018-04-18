import { test } from '@/test'
import { VCardExpansion } from '@/components/VCard'

test('VCardExpansion.js', ({ mount }) => {
  it('should render with "display:none" applied and dropdown class', () => {
    const wrapper = mount(VCardExpansion)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with no "display:none" applied and dropdown class', () => {
    const wrapper = mount(VCardExpansion, {
      propsData: {
        show: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with "display:none" applied and cover class', () => {
    const wrapper = mount(VCardExpansion, {
      propsData: {
        cover: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with no "display:none" applied and cover class', () => {
    const wrapper = mount(VCardExpansion, {
      propsData: {
        cover: true,
        show: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
