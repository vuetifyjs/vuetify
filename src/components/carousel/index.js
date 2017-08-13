import VCarousel from './VCarousel'
import VCarouselItem from './VCarouselItem'

export default function install (Vue) {
  Vue.component('v-carousel', VCarousel)
  Vue.component('v-carousel-item', VCarouselItem)
}
