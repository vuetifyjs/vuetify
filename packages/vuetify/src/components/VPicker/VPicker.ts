import './VPicker.sass'
import '../VCard/VCard.sass'

// Components
import VPickerBtn from './VPickerBtn'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import mixins from '../../util/mixins'

// Helpers
import { convertToUnit } from '../../util/helpers'

// Types
import { VNode, CreateElement, VNodeChildren } from 'vue/types'

export function genPickerButton (
  h: CreateElement,
  children: VNodeChildren,
  click: () => void,
  active: Boolean,
  readonly = false,
  staticClass = ''
) {
  return h(VPickerBtn, {
    staticClass,
    props: {
      active,
      readonly,
    },
    on: {
      click,
    },
  }, children)
}

const minWidth = 290

/* @vue/component */
export default mixins(Colorable, Themeable).extend({
  name: 'v-picker',

  inheritAttrs: false,

  props: {
    headerColor: String,
    noTitle: Boolean,
    fullWidth: Boolean,
    landscape: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'fade-transition',
    },
    width: {
      type: [Number, String],
      default: minWidth,
    },
  },

  computed: {
    computedTitleColor (): string | false {
      const defaultTitleColor = this.isDark ? false : (this.color || 'primary')
      return this.headerColor || defaultTitleColor
    },
    computedWidth (): number {
      if (!this.width || parseInt(this.width, 10) < minWidth) return minWidth
      else return parseInt(this.width, 10)
    },
  },

  methods: {
    genTitle () {
      return this.$createElement('div', this.setBackgroundColor(this.computedTitleColor, {
        staticClass: 'v-picker__title',
        class: {
          'v-picker__title--landscape': this.landscape,
        },
      }), this.$slots.title)
    },
    genBodyTransition () {
      if (!this.transition) return this.$slots.default

      return this.$createElement('transition', {
        props: {
          name: this.transition,
        },
      }, this.$slots.default)
    },
    genBody () {
      return this.$createElement('div', {
        staticClass: 'v-picker__body',
        class: {
          'v-picker__body--no-title': this.noTitle,
          ...this.themeClasses,
        },
        style: this.fullWidth ? undefined : {
          width: convertToUnit(this.computedWidth),
        },
      }, [
        this.genBodyTransition(),
      ])
    },
    genActions () {
      return this.$createElement('div', {
        staticClass: 'v-picker__actions v-card__actions',
        class: {
          'v-picker__actions--no-title': this.noTitle,
        },
      }, this.$slots.actions)
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-picker v-card',
      class: {
        'v-picker--landscape': this.landscape,
        'v-picker--full-width': this.fullWidth,
        ...this.themeClasses,
      },
    }, [
      this.$slots.title && !this.noTitle && this.genTitle(),
      this.genBody(),
      this.$slots.actions && this.genActions(),
    ])
  },
})
