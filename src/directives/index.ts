import { VueConstructor, DirectiveOptions } from 'vue/types'
import ClickOutside from './click-outside'
import Resize from './resize'
import Ripple from './ripple'
import Scroll from './scroll'
import Touch from './touch'

export {
  ClickOutside,
  Ripple,
  Resize,
  Scroll,
  Touch
}

export default function install (Vue: VueConstructor) {
  Vue.directive('click-outside', ClickOutside as any as DirectiveOptions)
  Vue.directive('ripple', Ripple as any as DirectiveOptions)
  Vue.directive('resize', Resize as any as DirectiveOptions)
  Vue.directive('scroll', Scroll as any as DirectiveOptions)
  Vue.directive('touch', Touch as any as DirectiveOptions)
}
