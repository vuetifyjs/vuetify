import {
  createSimpleFunctional
} from '../../util/helpers'

import VToolbar from './VToolbar'
import VToolbarSideIcon from './VToolbarSideIcon'

VToolbar.install = function install (Vue) {
  const VToolbarTitle = createSimpleFunctional('toolbar__title')
  const VToolbarItems = createSimpleFunctional('toolbar__items')

  Vue.component('v-system-bar', VSystemBar)
  Vue.component('v-toolbar', VToolbar)
  Vue.component('v-toolbar-items', VToolbarItems)
  Vue.component('v-toolbar-title', VToolbarTitle)
  Vue.component('v-toolbar-side-icon', VToolbarSideIcon)
}

export default VSwitch
