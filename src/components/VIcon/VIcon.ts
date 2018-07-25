import '../../stylus/components/_icons.styl'

// Mixins
import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'

// Util
import {
  convertToUnit,
  getObjectValueByPath,
  keys
} from '../../util/helpers'

// Types
import { VNode, VNodeChildren } from 'vue'
import mixins from '../../util/mixins'

enum SIZE_MAP {
  small = '16px',
  default = '24px',
  medium = '28px',
  large = '36px',
  xLarge = '40px'
}

function isFontAwesome5 (iconType: string): boolean {
  return ['fas', 'far', 'fal', 'fab'].some(val => iconType.includes(val))
}

const ICONS_PREFIX = '$vuetify.icons.'

// This remaps internal names like '$vuetify.icons.cancel' to the current name
// for that icon. Note the parent component is needed for $vuetify because
// VIcon is a functional component. This function only looks at the
// immediate parent, so it won't remap for a nested functional components.
function remapInternalIcon (parent: object, iconName: string): string {
  if (!iconName.startsWith(ICONS_PREFIX)) {
    // return original icon name unchanged
    return iconName
  }

  // Now look up icon indirection name, e.g. '$vuetify.icons.cancel':
  return getObjectValueByPath(parent, iconName) || iconName
}

const addTextColorClassChecks = Colorable.options.methods.addTextColorClassChecks

/* @vue/component */
export default mixins(Colorable, Themeable).extend({
  name: 'v-icon',

  functional: true,

  props: {
    // TODO: inherit these
    color: String,
    dark: Boolean,
    light: Boolean,

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

  render (h, { props, data, parent, listeners = {}, children = [] }): VNode {
    const { small, medium, large, xLarge } = props
    const sizes = { small, medium, large, xLarge }
    const explicitSize = keys(sizes).find(key => sizes[key] && !!key)
    const fontSize = (explicitSize && SIZE_MAP[explicitSize]) || convertToUnit(props.size)

    const newChildren: VNodeChildren = []

    if (fontSize) data.style = { fontSize, ...data.style }

    let iconName = ''
    if (children.length) iconName = children[0].text!
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
    } else newChildren.push(iconName)

    data.attrs = data.attrs || {}
    if (!('aria-hidden' in data.attrs)) {
      data.attrs['aria-hidden'] = true
    }

    const classes = {
      ...(props.color && addTextColorClassChecks.call(props, {}, props.color)),
      'v-icon--disabled': props.disabled,
      'v-icon--left': props.left,
      'v-icon--link': listeners.click || listeners['!click'],
      'v-icon--right': props.right,
      'theme--dark': props.dark,
      'theme--light': props.light
    }

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
    ].filter(val => !!val).join(' ').trim()

    return h('i', data, newChildren)
  }
})
