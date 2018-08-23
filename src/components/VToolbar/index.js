import { createSimpleFunctional } from '../../util/helpers'

import VToolbar from './VToolbar'
import VToolbarSideIcon from './VToolbarSideIcon'

const VToolbarTitle = createSimpleFunctional('v-toolbar__title')
const VToolbarItems = createSimpleFunctional('v-toolbar__items')

export { VToolbar, VToolbarSideIcon, VToolbarTitle, VToolbarItems }

export default {
  $_vuetify_subcomponents: {
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
    VToolbarSideIcon
  }
}
