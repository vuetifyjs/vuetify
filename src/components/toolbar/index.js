import {
  createSimpleFunctional
} from '~util/helpers'

import SystemBar from './ToolbarSideIcon'
import Toolbar from './Toolbar'
import ToolbarSideIcon from './ToolbarSideIcon'

const ToolbarTitle = createSimpleFunctional('toolbar__title')
const ToolbarItems = createSimpleFunctional('toolbar__items')

export default {
  SystemBar,
  Toolbar,
  ToolbarItems,
  ToolbarTitle,
  ToolbarSideIcon
}
