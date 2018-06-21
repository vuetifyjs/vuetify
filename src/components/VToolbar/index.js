import {
  createSimpleFunctional
} from '../../util/helpers'

import VToolbar from './VToolbar'
import VToolbarSideIcon from './VToolbarSideIcon'

const VToolbarTitle = createSimpleFunctional('v-toolbar__title')
const VToolbarItems = createSimpleFunctional('v-toolbar__items')

export { VToolbar, VToolbarSideIcon, VToolbarTitle, VToolbarItems }

VToolbar.$_vuetify_subcomponents = {
  VToolbarItems,
  VToolbarTitle,
  VToolbarSideIcon
}

export default VToolbar
