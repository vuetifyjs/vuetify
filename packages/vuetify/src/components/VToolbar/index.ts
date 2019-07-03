// Components
import VToolbar from './VToolbar'

// Utilities
import { createSimpleFunctional } from '../../util/helpers'

const VToolbarTitle = createSimpleFunctional('v-toolbar__title')
const VToolbarItems = createSimpleFunctional('v-toolbar__items')

export {
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
}

export default {
  $_vuetify_subcomponents: {
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
  },
}
