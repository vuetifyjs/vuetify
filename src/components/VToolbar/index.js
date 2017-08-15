import {
  createSimpleFunctional
} from '../../util/helpers'

import VToolbar from './VToolbar'
import VToolbarSideIcon from './VToolbarSideIcon'

export { VToolbar, VToolbarSideIcon }
export const VToolbarTitle = createSimpleFunctional('toolbar__title')
export const VToolbarItems = createSimpleFunctional('toolbar__items')

VToolbar.install = function install (Vue) {
  Vue.component('v-toolbar', VToolbar)
  Vue.component('v-toolbar-items', VToolbarItems)
  Vue.component('v-toolbar-title', VToolbarTitle)
  Vue.component('v-toolbar-side-icon', VToolbarSideIcon)
}

export default VToolbar
