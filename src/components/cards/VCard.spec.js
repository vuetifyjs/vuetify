import { test } from '~util/testing'
import VCard from '~components/cards/VCard'

test('VCard.js', ({ mount, functionalContext }) => {
// describe('VCard.vue', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCard, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a flat card', () => {
    const wrapper = mount(VCard, functionalContext({
      propsData: {
        flat: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a raised card', () => {
    const wrapper = mount(VCard, functionalContext({
      propsData: {
        raised: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a tile card', () => {
    const wrapper = mount(VCard, functionalContext({
      propsData: {
        tile: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a card with custom height', () => {
    const wrapper = mount(VCard, functionalContext({
      propsData: {
        height: '400px'
      }
    }))

    console.log(wrapper.hasStyle('height', '400px'))

    expect(wrapper.hasStyle('height', '400px')).toBe(true)
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
