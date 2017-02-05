import Toolbar from './Toolbar.vue'
import ToolbarItem from './ToolbarItem'
import ToolbarItems from './ToolbarItems.vue'
import ToolbarGroup from './ToolbarGroup.vue'

import {
  createSimpleFunctional
} from '../../util/helpers'

const ToolbarLogo = createSimpleFunctional('toolbar__logo')
const ToolbarTitle = createSimpleFunctional('toolbar__title')
const ToolbarSub = createSimpleFunctional('toolbar__sub')
const ToolbarSideIcon = {
  functional: true,

  render (h, { data, children }) {
    data.staticClass = data.staticClass ? `toolbar__side-icon ${data.staticClass}` : 'toolbar__side-icon'

    const icon = [h('v-icon', 'menu')]
    const anchor = [h('a', { attrs: { href: 'javascript:;' }}, icon)]

    return h('div', data, [anchor])
  }
}

export default {
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  ToolbarItems,
  ToolbarLogo,
  ToolbarTitle,
  ToolbarSideIcon,
  ToolbarSub
}
