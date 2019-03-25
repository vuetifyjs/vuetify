import { test } from '@/test'
import VCard from '@/components/VCard/VCard'

test('VCard.vue', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCard)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render card with img', () => {
    const wrapper = mount(VCard, {
      propsData: {
        img: 'image.jpg'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a flat card', () => {
    const wrapper = mount(VCard, {
      propsData: {
        flat: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a raised card', () => {
    const wrapper = mount(VCard, {
      propsData: {
        raised: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a card with custom height', () => {
    const heightpx = '400px'
    const wrapper = mount(VCard, {
      propsData: {
        height: heightpx
      }
    })

    expect(wrapper.hasStyle('height', heightpx)).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      height: 401
    })
    expect(wrapper.hasStyle('height', '401px')).toBe(true)
  })
})
