import { test } from '~util/testing'
import VCard from '~components/VCard'

test('VCard.js', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCard)

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
    console.log(wrapper.vm.style)

    expect(wrapper.hasStyle('height', heightpx)).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a tile card', () => {
    const wrapper = mount(VCard, {
      propsData: {
        tile: true
      }
    })

    expect(wrapper.hasClass('card--tile')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
