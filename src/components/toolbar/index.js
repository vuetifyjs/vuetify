import {
  createSimpleFunctional
} from '../../util/helpers'

import VSystemBar from './VSystemBar'
import VToolbar from './VToolbar'
import VToolbarSideIcon from './VToolbarSideIcon'

const VToolbarTitle = createSimpleFunctional('toolbar__title')
const VToolbarItems = createSimpleFunctional('toolbar__items')

export default {
  VSystemBar,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
  VToolbarSideIcon
}
