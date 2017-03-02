import Toolbar from './Toolbar.vue'
import ToolbarItem from './ToolbarItem'

import {
  createSimpleFunctional
} from '../../util/helpers'

const ToolbarLogo = createSimpleFunctional('toolbar__logo')
const ToolbarTitle = createSimpleFunctional('toolbar__title')
const ToolbarSub = createSimpleFunctional('toolbar__sub')
const ToolbarItems = createSimpleFunctional('toolbar__items', 'ul')
const ToolbarSideIcon = {
  functional: true,

  render (h, { data, children }) {
    data.staticClass = data.staticClass ? `toolbar__side-icon ${data.staticClass}` : 'toolbar__side-icon'
    data.props = {
      icon: true,
      dark: true
    }

    return h('v-btn', data, [h('v-icon', 'menu')])
  }
}

export default {
  Toolbar,
  ToolbarItem,
  ToolbarItems,
  ToolbarLogo,
  ToolbarTitle,
  ToolbarSideIcon,
  ToolbarSub
}
