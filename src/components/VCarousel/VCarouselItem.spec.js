import { test } from '~util/testing'
import { VCarouselItem } from '~components/VCarousel'

const imageSrc = 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
const warning = 'The v-carousel-item component is not meant to be used outside of a v-carousel.'

test('VCarouselItem.js', ({ mount }) => {
  it('should throw warning when not used inside v-carousel', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc
      }
    })

    expect(warning).toHaveBeenTipped()
  })

  it('should render component and match snapshot', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenTipped()
  })
})
