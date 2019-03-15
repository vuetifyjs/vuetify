// Styles
import './VFeatureDiscovery.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import Themeable from '../../mixins/themeable'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

// Directives
import ClickOutside from '../../directives/click-outside'
import { convertToUnit } from '../../util/helpers'

export default mixins(
  Colorable,
  Toggleable,
  Themeable
  /* @vue/component */
).extend({
  name: 'v-feature-discovery',

  directives: { ClickOutside },

  props: {
    persistent: Boolean,
    flat: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      default: 400,
      type: [Number, String],
      validator: (v: string | number) => !isNaN(parseInt(v))
    },
    target: {
      default: null as string | null
    },
    value: {
      default: true
    }
  },

  data: () => ({
    rect: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 0,
      width: 0
    }
  }),

  computed: {
    classes (): object {
      return {
        'v-feature-discovery--flat': this.flat,
        'v-feature-discovery--active': this.isActive,
        ...this.themeClasses
      }
    },
    computedLeft (): number {
      return this.rect.left - (this.computedSize / 2) + (this.rect.width / 2)
    },
    computedTop (): number {
      return this.rect.top - (this.computedSize / 2) + (this.rect.height / 2)
    },
    computedSize (): number {
      return parseInt(this.size)
    },
    styles (): object {
      return {
        left: convertToUnit(this.computedLeft),
        top: convertToUnit(this.computedTop),
        height: convertToUnit(this.computedSize),
        width: convertToUnit(this.computedSize)
      }
    }
  },

  mounted () {
    if (!this.target) return

    const target = document.querySelector(this.target)
    if (!target) return

    this.rect = target.getBoundingClientRect();
    (target as any).style.zIndex = 11
  },

  methods: {
    closeConditional (): boolean {
      return !this.persistent && this.isActive
    },
    genBackdrop () {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-feature-discovery__backdrop'
      }), this.$slots.default)
    },
    genChildren () {
      return [
        this.genBackdrop(),
        this.genHighlight()
      ]
    },
    genHighlight () {
      return this.$createElement('div', {
        staticClass: 'v-feature-discovery__highlight'
      }, this.$slots.default)
    }
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-feature-discovery',
      directives: [
        {
          name: 'click-outside',
          value: () => /* istanbul ignore next */ (this.isActive = false),
          args: {
            closeConditional: this.closeConditional
          }
        },
        {
          name: 'show',
          value: this.isActive
        }
      ],
      class: this.classes,
      style: this.styles
    }

    return h('div', data, this.genChildren())
  }
})
