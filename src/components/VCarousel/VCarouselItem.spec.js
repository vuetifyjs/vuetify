import { mount } from 'avoriaz'
import { VCarouselItem } from '~components/VCarousel'

const imageSrc = 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'

describe('VCarouselItem.js', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc,
        transition: 'slide-y-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom reverse transition and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc,
        'reverse-ransition': 'slide-y-reverse-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
