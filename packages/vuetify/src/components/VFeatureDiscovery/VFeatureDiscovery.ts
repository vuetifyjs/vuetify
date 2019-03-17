// Styles
import './VFeatureDiscovery.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Elevatable from '../../mixins/elevatable'
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
  Elevatable,
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
      default: null as string | Element | null
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
    },
    targetEl: null as Element | null,
    oldZIndex: 0,
    movable: true
  }),

  computed: {
    classes (): object {
      return {
        'v-feature-discovery--flat': this.flat,
        'v-feature-discovery--active': this.isActive,
        'v-feature-discovery--movable': this.movable,
        ...this.themeClasses
      }
    },
    computedElevation (): string | number | undefined {
      return this.flat ? 0 : (this.elevation || 4)
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
    },
    highlightSize (): number {
      return Math.sqrt(2 * (Math.max(this.rect.width, this.rect.height) + 25) ** 2)
    }
  },

  watch: {
    target () {
      this.updateTarget()
    },
    isActive (val: boolean) {
      if (!this.targetEl) return

      (this.targetEl as any).style.zIndex = val ? 11 : this.oldZIndex
    }
  },

  mounted () {
    this.updateTarget()

    document.addEventListener('scroll', this.onScroll)
  },

  methods: {
    updateTarget () {
      if (this.targetEl) (this.targetEl as any).style.zIndex = this.oldZIndex

      if (this.target instanceof Element) this.targetEl = this.target
      else this.targetEl = document.querySelector(this.target)

      if (!this.targetEl) return

      this.rect = this.targetEl.getBoundingClientRect()
      this.oldZIndex = Number(getComputedStyle(this.targetEl).zIndex) || 0
      /* istanbul ignore next */
      if (this.isActive) (this.targetEl as any).style.zIndex = 11
    },
    onScroll () {
      if (!this.targetEl) return

      this.movable = false
      this.rect = this.targetEl.getBoundingClientRect()
      const vm = this
      setTimeout(() => vm.movable = true)
    },
    closeConditional (): boolean {
      return !this.persistent && this.isActive
    },
    genBackdrop (): VNode {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-feature-discovery__backdrop',
        class: this.elevationClasses
      }), this.$slots.default)
    },
    genChildren (): VNode[] {
      return [
        this.genBackdrop(),
        this.genHighlight()
      ]
    },
    genHighlight (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-feature-discovery__highlight',
        style: {
          top: `calc(50% - (${this.highlightSize}px / 2))`,
          left: `calc(50% - (${this.highlightSize}px / 2))`,
          height: `${this.highlightSize}px`,
          width: `${this.highlightSize}px`
        }
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
