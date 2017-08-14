import VCarousel from './VCarousel'
import VCarouselItem from './VCarouselItem'

export { VCarousel, VCarouselItem }

VCarousel.install = function install (Vue) {
  Vue.component(VCarousel.name, VCarousel)
  Vue.component(VCarouselItem.name, VCarouselItem)
}

export default VCarousel
