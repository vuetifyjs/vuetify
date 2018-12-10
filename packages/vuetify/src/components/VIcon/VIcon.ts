import '../../stylus/components/_icons.styl'
// Mixins
import Colorable from '../../mixins/colorable'
import Sizeable from '../../mixins/sizeable'
import Themeable from '../../mixins/themeable'
// Util
import { convertToUnit, keys, remapInternalIcon } from '../../util/helpers'
// Types
import Vue, { CreateElement, VNode, VNodeChildren, VNodeData } from 'vue'
import mixins from '../../util/mixins'
import { VuetifyIcon, VuetifyIconComponent } from 'vuetify'

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

const VIcon = mixins(
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

  methods: {
    getIcon (): VuetifyIcon {
      let iconName = ''
      if (this.$slots.default) iconName = this.$slots.default[0].text!

      return remapInternalIcon(this, iconName)
    },
    getSize (): string | undefined {
      const sizes = {
        small: this.small,
        medium: this.medium,
        large: this.large,
        xLarge: this.xLarge
      }

      const explicitSize = keys(sizes).find(key => sizes[key])

      return (explicitSize && SIZE_MAP[explicitSize]) || convertToUnit(this.size)
    },
    // Component data for both font and svg icon.
    getDefaultData (): VNodeData {
      const data: VNodeData = {
        staticClass: 'v-icon',
        class: {
          'v-icon--disabled': this.disabled,
          'v-icon--left': this.left,
          'v-icon--link': this.$listeners.click || this.$listeners['!click'],
          'v-icon--right': this.right
        },
        attrs: {
          'aria-hidden': true,
          ...this.$attrs
        },
        on: this.$listeners
      }

      return data
    },
    applyColors (data: VNodeData): void {
      data.class = { ...data.class, ...this.themeClasses }
      this.setTextColor(this.color, data)
    },
    renderFontIcon (icon: string, h: CreateElement): VNode {
      const newChildren: VNodeChildren = []
      const data = this.getDefaultData()

      let iconType = 'material-icons'
      // Material Icon delimiter is _
      // https://material.io/icons/
      const delimiterIndex = icon.indexOf('-')
      const isMaterialIcon = delimiterIndex <= -1

      if (isMaterialIcon) {
        // Material icon uses ligatures.
        newChildren.push(icon)
      } else {
        iconType = icon.slice(0, delimiterIndex)
        if (isFontAwesome5(iconType)) iconType = ''
      }

      data.class[iconType] = true
      data.class[icon] = !isMaterialIcon

      const fontSize = this.getSize()
      if (fontSize) data.style = { fontSize }

      this.applyColors(data)

      return h('i', data, newChildren)
    },
    renderSvgIcon (icon: VuetifyIconComponent, h: CreateElement): VNode {
      const data = this.getDefaultData()
      data.class['v-icon--is-component'] = true

      const size = this.getSize()
      if (size) {
        data.style = {
          fontSize: size,
          height: size
        }
      }

      this.applyColors(data)

      const component = icon.component
      data.props = icon.props
      return h(component, data)
    }
  },

  render (h: CreateElement): VNode {
    const icon = this.getIcon()

    if (typeof icon === 'string') {
      return this.renderFontIcon(icon, h)
    }

    return this.renderSvgIcon(icon, h)
  }
})

export default Vue.extend({
  name: 'v-icon',

  $_wrapperFor: VIcon,

  functional: true,

  render (h, { data, children }): VNode {
    let iconName = ''

    // Support usage of v-text and v-html
    if (data.domProps) {
      iconName = data.domProps.textContent ||
        data.domProps.innerHTML ||
        iconName

      // Remove nodes so it doesn't
      // overwrite our changes
      delete data.domProps.textContent
      delete data.domProps.innerHTML
    }

    return h(VIcon, data, iconName ? [iconName] : children)
  }
})
