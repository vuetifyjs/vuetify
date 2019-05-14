// Extensions
import VBottomNavigation from '../VBottomNavigation/VBottomNavigation'

// Utilities
import { deprecate } from '../../util/console'

const VBottomNav = VBottomNavigation.extend({
  created () {
    deprecate('<v-bottom-nav>', '<v-bottom-navigation>')
  }
})

export { VBottomNav }
export default VBottomNav
