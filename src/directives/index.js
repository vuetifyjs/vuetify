import Badge from './badge'
import ClickOutside from './click-outside'
import Resize from './resize'
import Ripple from './ripple'
import Scroll from './scroll'
import Tooltip from './tooltip'
import Touch from './touch'

export {
  Badge,
  ClickOutside,
  Ripple,
  Resize,
  Scroll,
  Tooltip,
  Touch
}

export default function install (Vue) {
  Vue.directive('badge', Badge)
  Vue.directive('click-outside', ClickOutside)
  Vue.directive('ripple', Ripple)
  Vue.directive('resize', Resize)
  Vue.directive('scroll', Scroll)
  Vue.directive('tooltip', Tooltip)
  Vue.directive('touch', Touch)
}
