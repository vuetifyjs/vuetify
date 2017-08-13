import {
  createSimpleFunctional
} from '../../util/helpers'

import VSystemBar from './VSystemBar'
import VToolbar from './VToolbar'
import VToolbarSideIcon from './VToolbarSideIcon'

export default function install (Vue) {
  const VToolbarTitle = createSimpleFunctional('toolbar__title')
  const VToolbarItems = createSimpleFunctional('toolbar__items')

  Vue.component('v-system-bar', VSystemBar)
  Vue.component('v-toolbar', VToolbar)
  Vue.component('v-toolbar-items', VToolbarItems)
  Vue.component('v-toolbar-title', VToolbarTitle)
  Vue.component('v-toolbar-side-icon', VToolbarSideIcon)
}
