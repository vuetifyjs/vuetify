import Toolbar from './Toolbar'
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

  props: {
    dark: Boolean,
    light: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = data.staticClass ? `toolbar__side-icon ${data.staticClass}` : 'toolbar__side-icon'
    data.props = Object.assign({
      icon: true
    }, props)

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
