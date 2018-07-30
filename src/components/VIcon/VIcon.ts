import '../../stylus/components/_icons.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Sizeable from '../../mixins/sizeable'
import Themeable from '../../mixins/themeable'

// Util
import {
  convertToUnit,
  keys,
  remapInternalIcon
} from '../../util/helpers'

// Types
import { VNode, VNodeChildren, VNodeData } from 'vue'
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

export default mixins(
  Colorable,
  Sizeable,
  Themeable
/* @vue/component */
).extend({
  name: 'v-icon',

  props: {
    disabled: Boolean,
    left: Boolean,
    right: Boolean
  },

  render (h): VNode {
    const sizes = {
      small: this.small,
      medium: this.medium,
      large: this.large,
      xLarge: this.xLarge
    }
    const explicitSize = keys(sizes).find(key => sizes[key] && !!key)
    const fontSize = (explicitSize && SIZE_MAP[explicitSize]) || convertToUnit(this.size)

    const newChildren: VNodeChildren = []
    const data: VNodeData = {
      staticClass: 'v-icon',
      attrs: {
        'aria-hidden': this.$attrs['aria-hidden'] == null ? true : undefined
      }
    }

    if (fontSize) data.style = { fontSize }

    let iconName = ''
    if (this.$slots.default) iconName = this.$slots.default[0].text!
    // Support usage of v-text and v-html
    else if (this.$vnode.data && this.$vnode.data.domProps) {
      iconName = this.$vnode.data.domProps.textContent ||
      this.$vnode.data.domProps.innerHTML ||
        iconName

      // Remove nodes so it doesn't overwrite our changes
      delete this.$vnode.data.domProps.textContent
      delete this.$vnode.data.domProps.innerHTML
    }

    // Remap internal names like '$vuetify.icons.cancel' to the current name for that icon
    iconName = remapInternalIcon(this, iconName)

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

    data.class = [
      this.addTextColorClassChecks({
        'v-icon--disabled': this.disabled,
        'v-icon--left': this.left,
        'v-icon--link': this.$listeners.click || this.$listeners['!click'],
        'v-icon--right': this.right,
        [iconType]: true,
        ...this.themeClasses
      }),
      isCustomIcon ? iconName : undefined
    ]

    return h('i', data, newChildren)
  }
})
