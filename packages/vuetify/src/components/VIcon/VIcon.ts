import './VIcon.sass'

// Mixins
import BindsAttrs from '../../mixins/binds-attrs'
import Colorable from '../../mixins/colorable'
import Sizeable from '../../mixins/sizeable'
import Themeable from '../../mixins/themeable'

// Util
import { convertToUnit, keys, remapInternalIcon } from '../../util/helpers'

// Types
import Vue, { CreateElement, VNode, VNodeChildren, VNodeData } from 'vue'
import mixins from '../../util/mixins'
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

const VIcon = mixins(
  BindsAttrs,
  Colorable,
  Sizeable,
  Themeable
  /* @vue/component */
).extend({
  name: 'v-icon',

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
      return Boolean(
        this.listeners$.click || this.listeners$['!click']
      )
    },
  },

  methods: {
    getIcon (): VuetifyIcon {
      let iconName = ''
      if (this.$slots.default) iconName = this.$slots.default[0].text!.trim()

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
    // Component data for both font icon and SVG wrapper span
    getDefaultData (): VNodeData {
      return {
        staticClass: 'v-icon notranslate',
        class: {
          'v-icon--disabled': this.disabled,
          'v-icon--left': this.left,
          'v-icon--link': this.hasClickListener,
          'v-icon--right': this.right,
          'v-icon--dense': this.dense,
        },
        attrs: {
          'aria-hidden': !this.hasClickListener,
          disabled: this.hasClickListener && this.disabled,
          type: this.hasClickListener ? 'button' : undefined,
          ...this.attrs$,
        },
        on: this.listeners$,
      }
    },
    getSvgWrapperData () {
      const fontSize = this.getSize()
      const wrapperData = {
        ...this.getDefaultData(),
        style: fontSize ? {
          fontSize,
          height: fontSize,
          width: fontSize,
        } : undefined,
      }
      this.applyColors(wrapperData)

      return wrapperData
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

      return h(this.hasClickListener ? 'button' : this.tag, data, newChildren)
    },
    renderSvgIcon (icon: string, h: CreateElement): VNode {
      const svgData: VNodeData = {
        class: 'v-icon__svg',
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          role: 'img',
          'aria-hidden': true,
        },
      }

      const size = this.getSize()
      if (size) {
        svgData.style = {
          fontSize: size,
          height: size,
          width: size,
        }
      }

      return h(this.hasClickListener ? 'button' : 'span', this.getSvgWrapperData(), [
        h('svg', svgData, [
          h('path', {
            attrs: {
              d: icon,
            },
          }),
        ]),
      ])
    },
    renderSvgIconComponent (
      icon: VuetifyIconComponent,
      h: CreateElement
    ): VNode {
      const data: VNodeData = {
        class: {
          'v-icon__component': true,
        },
      }

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

      return h(this.hasClickListener ? 'button' : 'span', this.getSvgWrapperData(), [
        h(component, data),
      ])
    },
  },

  render (h: CreateElement): VNode {
    const icon = this.getIcon()

    if (typeof icon === 'string') {
      if (isSvgPath(icon)) {
        return this.renderSvgIcon(icon, h)
      }
      return this.renderFontIcon(icon, h)
    }

    return this.renderSvgIconComponent(icon, h)
  },
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
  },
})
