import {
  createSimpleFunctional
} from '../../util/helpers'

import VToolbar from './VToolbar'
import VToolbarSideIcon from './VToolbarSideIcon'

const VToolbarTitle = createSimpleFunctional('v-toolbar__title')
const VToolbarItems = createSimpleFunctional('v-toolbar__items')

export { VToolbar, VToolbarSideIcon, VToolbarTitle, VToolbarItems }

/* istanbul ignore next */
VToolbar.install = function install (Vue) {
  Vue.component(VToolbar.name, VToolbar)
  Vue.component(VToolbarItems.name, VToolbarItems)
  Vue.component(VToolbarTitle.name, VToolbarTitle)
  Vue.component(VToolbarSideIcon.name, VToolbarSideIcon)
}

export default VToolbar
