import { test } from '~util/testing'
import VCard from '~components/VCard'

test('VCard.js', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCard, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a flat card', () => {
    const wrapper = mount(VCard, functionalContext({
      props: {
        flat: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a raised card', () => {
    const wrapper = mount(VCard, functionalContext({
      props: {
        raised: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a tile card', () => {
    const wrapper = mount(VCard, functionalContext({
      props: {
        tile: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a card with custom height', () => {
    const heightpx = '400px'
    const wrapper = mount(VCard, functionalContext({
      props: {
        height: heightpx
      }
    }))

    expect(wrapper.hasStyle('height', heightpx)).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a tile card', () => {
    const wrapper = mount(VCard, functionalContext({
      props: {
        tile: true
      }
    }))

    expect(wrapper.hasClass('card--tile')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
