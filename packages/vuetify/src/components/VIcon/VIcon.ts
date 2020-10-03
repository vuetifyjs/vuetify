import './VIcon.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Sizeable from '../../mixins/sizeable'
import Themeable from '../../mixins/themeable'

// Util
import { defineComponent, h } from 'vue'
import { convertToUnit, keys, remapInternalIcon } from '../../util/helpers'

// Types
import type { VNode } from 'vue'
import { VuetifyIcon, VuetifyIconComponent } from 'vuetify/types/services/icons'

enum SIZE_MAP {
  xSmall = '12px',
  small = '16px',
  default = '24px',
  medium = '28px',
  large = '36px',
  xLarge = '40px'
}

function isFontAwesome5 (iconType: string): boolean {
  return ['fas', 'far', 'fal', 'fab', 'fad'].some(val => iconType.includes(val))
}

function isSvgPath (icon: string): boolean {
  return (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(icon) && /[\dz]$/i.test(icon) && icon.length > 4)
}

export default defineComponent({
  name: 'v-icon',

  mixins: [
    Colorable,
    Sizeable,
    Themeable,
  ],

  props: {
    dense: Boolean,
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    size: [Number, String],
    tag: {
      type: String,
      required: false,
      default: 'i',
    },
  },

  computed: {
    medium () {
      return false
    },
    hasClickListener (): boolean {
      return false // TODO
    },
  },

  methods: {
    getIcon (): VuetifyIcon {
      let iconName = ''
      if (this.$slots.default) iconName = this.$slots.default()[0].children!.trim()

      return remapInternalIcon(this, iconName)
    },
    getSize (): string | undefined {
      const sizes = {
        xSmall: this.xSmall,
        small: this.small,
        medium: this.medium,
        large: this.large,
        xLarge: this.xLarge,
      }

      const explicitSize = keys(sizes).find(key => sizes[key])

      return (
        (explicitSize && SIZE_MAP[explicitSize]) || convertToUnit(this.size)
      )
    },
    // Component data for both font and svg icon.
    getDefaultData (): Dictionary {
      return {
        class: {
          'v-icon notranslate': true,
          'v-icon--disabled': this.disabled,
          'v-icon--left': this.left,
          'v-icon--link': this.hasClickListener,
          'v-icon--right': this.right,
          'v-icon--dense': this.dense,
        },
        'aria-hidden': !this.hasClickListener,
        disabled: this.hasClickListener && this.disabled,
        type: this.hasClickListener ? 'button' : undefined,
      }
    },
    applyColors (data: Dictionary): void {
      data.class = { ...data.class, ...this.themeClasses }
      this.setTextColor(this.color, data)
    },
    renderFontIcon (icon: string): VNode {
      const newChildren = []
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

      return h(this.hasClickListener ? 'button' : this.tag, data, newChildren)
    },
    renderSvgIcon (icon: string): VNode {
      const fontSize = this.getSize()
      const wrapperData: Dictionary = {
        ...this.getDefaultData(),
        style: fontSize ? {
          fontSize,
          height: fontSize,
          width: fontSize,
        } : undefined,
      }
      wrapperData.class['v-icon--svg'] = true
      this.applyColors(wrapperData)

      const svgData = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        height: fontSize || '24',
        width: fontSize || '24',
        role: 'img',
        'aria-hidden': true,
      }

      return h(this.hasClickListener ? 'button' : 'span', wrapperData, [
        h('svg', svgData, [
          h('path', {
            d: icon,
          }),
        ]),
      ])
    },
    renderSvgIconComponent (icon: VuetifyIconComponent): VNode {
      const data = this.getDefaultData()
      data.class['v-icon--is-component'] = true

      const size = this.getSize()
      if (size) {
        data.style = {
          fontSize: size,
          height: size,
          width: size,
        }
      }

      this.applyColors(data)

      const component = icon.component
      data.props = icon.props
      data.nativeOn = data.on

      return h(component, data)
    },
  },

  render (): VNode {
    const icon = this.getIcon()

    if (typeof icon === 'string') {
      if (isSvgPath(icon)) {
        return this.renderSvgIcon(icon)
      }
      return this.renderFontIcon(icon)
    }

    return this.renderSvgIconComponent(icon)
  },
})
