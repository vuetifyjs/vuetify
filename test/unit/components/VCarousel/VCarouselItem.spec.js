import { test } from '@/test'
import { VCarouselItem } from '@/components/VCarousel'

const imageSrc = 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
const warning = '[Vuetify] The v-carousel-item component must be used inside a v-carousel'

test('VCarouselItem.js', ({ mount }) => {
  it('should throw warning when not used inside v-carousel', () => {
    const wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
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
