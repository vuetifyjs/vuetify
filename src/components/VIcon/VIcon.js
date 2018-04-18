import '../../stylus/components/_icons.styl'

import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'
import {
  convertToUnit,
  getObjectValueByPath
} from '../../util/helpers'

const SIZE_MAP = {
  small: '16px',
  default: '24px',
  medium: '28px',
  large: '36px',
  xLarge: '40px'
}

function isFontAwesome5 (iconType) {
  return ['fas', 'far', 'fal', 'fab'].some(val => iconType.includes(val))
}

const ICONS_PREFIX = '$vuetify.icons.'

// This remaps internal names like '$vuetify.icons.cancel' to the current name
// for that icon. Note the parent component is needed for $vuetify because
// VIcon is a functional component. This function only looks at the
// immediate parent, so it won't remap for a nested functional components.
function remapInternalIcon (parent, iconName) {
  if (!iconName.startsWith(ICONS_PREFIX)) {
    // return original icon name unchanged
    return iconName
  }

  // Now look up icon indirection name, e.g. '$vuetify.icons.cancel':
  return getObjectValueByPath(parent, iconName) || iconName
}

export default {
  name: 'v-icon',

  functional: true,

  mixins: [Colorable, Themeable],

  props: {
    disabled: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    size: {
      type: [Number, String]
    },
    small: Boolean,
    xLarge: Boolean
  },

  render (h, { props, data, parent, children = [] }) {
    const { small, medium, large, xLarge } = props
    const sizes = { small, medium, large, xLarge }
    const explicitSize = Object.keys(sizes).find(key => sizes[key] && key)
    const fontSize = (explicitSize && SIZE_MAP[explicitSize]) || convertToUnit(props.size)

    if (fontSize) data.style = { fontSize, ...data.style }

    let iconName = ''
    if (children.length) iconName = children.pop().text
    // Support usage of v-text and v-html
    else if (data.domProps) {
      iconName = data.domProps.textContent ||
        data.domProps.innerHTML ||
        iconName

      // Remove nodes so it doesn't
      // overwrite our changes
      delete data.domProps.textContent
      delete data.domProps.innerHTML
    }

    // Remap internal names like '$vuetify.icons.cancel' to the current name for that icon
    iconName = remapInternalIcon(parent, iconName)

    let iconType = 'material-icons'
    // Material Icon delimiter is _
    // https://material.io/icons/
    const delimiterIndex = iconName.indexOf('-')
    const isCustomIcon = delimiterIndex > -1

    if (isCustomIcon) {
      iconType = iconName.slice(0, delimiterIndex)

      if (isFontAwesome5(iconType)) iconType = ''
      // Assume if not a custom icon
      // is Material Icon font
    } else children.push(iconName)

    data.attrs = data.attrs || {}
    if (!('aria-hidden' in data.attrs)) {
      data.attrs['aria-hidden'] = true
    }

    const classes = Object.assign({
      'v-icon--disabled': props.disabled,
      'v-icon--left': props.left,
      'v-icon--right': props.right,
      'theme--dark': props.dark,
      'theme--light': props.light
    }, props.color ? Colorable.methods.addTextColorClassChecks.call(props, {}, props.color) : {})

    // Order classes
    // * Component class
    // * Vuetify classes
    // * Icon Classes
    data.staticClass = [
      'v-icon',
      data.staticClass,
      Object.keys(classes).filter(k => classes[k]).join(' '),
      iconType,
      isCustomIcon ? iconName : null
    ].reduce((prev, curr) => curr ? `${prev} ${curr}` : prev)
      .trim()

    return h('i', data, children)
  }
}
