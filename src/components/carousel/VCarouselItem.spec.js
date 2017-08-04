import { mount } from 'avoriaz'
import VCarouselItem from '~components/carousel/VCarouselItem'

describe('VCarouselItem.js', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCarouselItem)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with src set and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      src: 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      transition: 'slide-y-transition'
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom reverse transition and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      'reverse-ransition': 'slide-y-reverse-transition'
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

})
