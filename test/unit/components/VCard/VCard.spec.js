import { test } from '@/test'
import VCard from '@/components/VCard'

const imgDeprecate = `'<v-card img="...">' is deprecated, use 'a nested <v-img>' instead`
const raisedDeprecate = `'<v-card raised>' is deprecated, use '<v-card elevation="3">' instead`

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
    expect(imgDeprecate).toHaveBeenTipped()
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
    expect(raisedDeprecate).toHaveBeenTipped()
  })

  it('should render a colored card', () => {
    const wrapper = mount(VCard, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
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

    expect(wrapper.hasStyle('height', heightpx)).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      height: 401
    })
    expect(wrapper.hasStyle('height', '401px')).toBe(true)
  })

  it('should render a tile card', () => {
    const wrapper = mount(VCard, {
      propsData: {
        tile: true
      }
    })

    expect(wrapper.hasClass('v-card--tile')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
