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
import { VuetifyIcon, VuetifyIconComponent, VuetifyIconSVG } from 'vuetify/types/services/icons'

enum SIZE_MAP {
  xSmall = '12px',
  small = '16px',
  default = '24px',
  medium = '28px',
  large = '36px',
  xLarge = '40px'
}

interface FontAwesome5IconDefinition {
  icon: [ number, number, string[], string, string ]
  iconName: string
  prefix: string
}

function isFontAwesome5 (iconType: string): boolean {
  return ['fas', 'far', 'fal', 'fab', 'fad'].some(val => iconType.includes(val))
}

function isVuetifyIconSVG (obj: any): obj is VuetifyIconSVG {
  return Boolean(typeof obj === 'object' && 'path' in obj && 'viewBox' in obj)
}

function isVNode (obj: any): obj is VNode {
  return typeof obj === 'object' && 'isComment' in obj
}

function isFontAwesome5IconDefinition (obj: any): obj is FontAwesome5IconDefinition {
  return Boolean(
    typeof obj === 'object' &&
    typeof obj.icon === 'object' &&
    obj.icon.length === 5,
    /* this additionnal checks are overkilled for only FA
      typeof obj.icon[0] === 'number' &&
      typeof obj.icon[1] === 'number' &&
      typeof obj.icon[4] === 'string'
    */
  )
}

function isSvgPath (icon: string): boolean {
  return (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(icon) && /[\dz]$/i.test(icon) && icon.length > 4)
}

const VIcon = mixins(
  BindsAttrs,
  Colorable,
  Sizeable,
  Themeable,
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
        this.listeners$.click || this.listeners$['!click'],
      )
    },
  },

  methods: {
    getIcon (): VuetifyIcon {
      let iconName = ''
      if (this.$slots.default) {
        // Casting to any, because this may not be a VNode anymore
        const mixedDefinition = this.$slots.default[0] as any

        if (isVuetifyIconSVG(mixedDefinition)) {
          return mixedDefinition
        }

        if (isFontAwesome5IconDefinition(mixedDefinition)) {
          return {
            path: mixedDefinition.icon[4],
            viewBox: `0 0 ${mixedDefinition.icon[0]} ${mixedDefinition.icon[1]}`,
            name: mixedDefinition.iconName,
            prefix: mixedDefinition.prefix,
          }
        }

        if (isVNode(mixedDefinition) && mixedDefinition.text) {
          iconName = mixedDefinition.text.trim()
        }
      }

      const icon = remapInternalIcon(this, iconName)
      if (typeof icon === 'string' && isSvgPath(icon)) {
        return {
          path: icon,
          viewBox: `0 0 24 24`,
        }
      }

      return icon
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
    getDefaultData (): VNodeData {
      const data: VNodeData = {
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

      return h(this.hasClickListener ? 'button' : this.tag, data, newChildren)
    },
    renderSvgIcon (icon: VuetifyIconSVG, h: CreateElement): VNode {
      const fontSize = this.getSize()
      const wrapperData = {
        ...this.getDefaultData(),
        style: fontSize ? {
          fontSize,
          height: fontSize,
          width: fontSize,
        } : undefined,
      }
      wrapperData.class['v-icon--svg'] = true
      this.applyColors(wrapperData)

      const svgData: VNodeData = {
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: icon.viewBox,
          height: fontSize || '24',
          width: fontSize || '24',
          role: 'img',
          'aria-hidden': true,
        },
      }

      return h(this.hasClickListener ? 'button' : 'span', wrapperData, [
        h('svg', svgData, [
          h('path', {
            attrs: {
              d: icon.path,
            },
          }),
        ]),
      ])
    },
    renderSvgIconComponent (
      icon: VuetifyIconComponent,
      h: CreateElement,
    ): VNode {
      const data = this.getDefaultData()
      data.class['v-icon--is-component'] = true

      const size = this.getSize()
      if (size) {
        data.style = {
          fontSize: size,
          height: size,
        }
      }

      this.applyColors(data)

      const component = icon.component
      data.props = icon.props
      data.nativeOn = data.on

      return h(component, data)
    },
  },

  render (h: CreateElement): VNode {
    const icon = this.getIcon()

    // Object with a path is now always a VuetifyIconSVG
    if (isVuetifyIconSVG(icon)) {
      return this.renderSvgIcon(icon, h)
    }

    if (typeof icon === 'string') {
      return this.renderFontIcon(icon, h)
    }

    // Remaining is a VuetifyIconComponent
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
