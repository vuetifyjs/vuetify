import { test } from '@/test'
import VCard from '@/components/VCard'

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

  it('should render a colored card', () => {
    const wrapper = mount(VCard, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.classes()).toContain('blue')
    expect(wrapper.classes()).toContain('lighten-1')
  })

  it('should render a tile card', () => {
    const wrapper = mount(VCard, {
      propsData: {
        tile: true
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

    expect(wrapper.element.style.height).toBe(heightpx)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      height: 401
    })
    expect(wrapper.element.style.height).toBe('401px')
  })

  it('should render a tile card', () => {
    const wrapper = mount(VCard, {
      propsData: {
        tile: true
      }
    })

    expect(wrapper.classes()).toContain('v-card--tile')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
