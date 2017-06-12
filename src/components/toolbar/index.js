import Toolbar from './Toolbar'
import ToolbarItem from './ToolbarItem'

import {
  createSimpleFunctional
} from '../../util/helpers'

const ToolbarTitle = createSimpleFunctional('toolbar__title')
const ToolbarItems = createSimpleFunctional('toolbar__items')
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
const SystemBar = {
  functional: true,

  props: {
    dark: Boolean,
    light: Boolean,
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = (`system-bar ${data.staticClass || ''}`).trim()

    if (props.dark) data.staticClass += ' dark--text'
    if (props.light) data.staticClass += ' light--text'
    if (props.status) data.staticClass += ' system-bar--status'
    if (props.window) data.staticClass += ' system-bar--window'
    if (props.lightsOut) data.staticClass += ' system-bar--lights-out'

    return h('div', data, children)
  }
}

export default {
  SystemBar,
  Toolbar,
  ToolbarItem,
  ToolbarItems,
  ToolbarTitle,
  ToolbarSideIcon
}
