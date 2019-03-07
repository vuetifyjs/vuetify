import { createSimpleFunctional } from '../../util/helpers'

import VToolbar from './VToolbar'
import VToolbarAction from './VToolbarAction'
import VToolbarSideIcon from './VToolbarSideIcon'

const VToolbarTitle = createSimpleFunctional('v-toolbar__title')
const VToolbarItems = createSimpleFunctional('v-toolbar__items')

export {
  VToolbar,
  VToolbarAction,
  VToolbarSideIcon,
  VToolbarTitle,
  VToolbarItems
}

export default {
  $_vuetify_subcomponents: {
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
    VToolbarAction,
    VToolbarSideIcon
  }
}
