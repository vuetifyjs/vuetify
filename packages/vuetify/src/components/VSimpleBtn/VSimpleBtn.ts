// Styles
import './VSimpleBtn.sass'

// Extensions
import VSheet from '../VSheet'

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import Positionable from '../../mixins/positionable'
import Sizeable from '../../mixins/sizeable'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { breaking } from '../../util/console'

// Types
import { VNode, VNodeData } from 'vue'
import { PropType } from 'vue/types/options'
import Ripple, { RippleOptions } from '../../directives/ripple'

const baseMixins = mixins(
  VSheet,
  Positionable,
  Sizeable,
  GroupableFactory('btnToggle'),
  ToggleableFactory('inputValue')
  /* @vue/component */
)
interface options extends ExtractVue<typeof baseMixins> {
  $el: HTMLElement
}

export default baseMixins.extend<options>().extend({
  name: 'v-simple-btn',

  directives: {
    Ripple,
  },

  props: {
    block: Boolean,
    disabled: Boolean,
    depressed: Boolean,
    outlined: Boolean,
    retainFocusOnClick: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null,
    },
    rounded: Boolean,
    text: Boolean,
    value: null as any as PropType<any>,
  },

  data: () => ({
    proxyClass: 'v-simple-btn--active',
  }),

  computed: {
    classes (): any {
      return {
        'v-simple-btn': true,
        'v-simple-btn--absolute': this.absolute,
        'v-simple-btn--block': this.block,
        'v-simple-btn--bottom': this.bottom,
        'v-simple-btn--contained': this.contained,
        'v-simple-btn--depressed': (this.depressed) || this.outlined,
        'v-simple-btn--disabled': this.disabled,
        'v-simple-btn--fixed': this.fixed,
        'v-simple-btn--flat': this.isFlat,
        'v-simple-btn--left': this.left,
        'v-simple-btn--outlined': this.outlined,
        'v-simple-btn--right': this.right,
        'v-simple-btn--rounded': this.rounded,
        'v-simple-btn--text': this.text,
        'v-simple-btn--tile': this.tile,
        'v-simple-btn--top': this.top,
        ...this.themeClasses,
        ...this.groupClasses,
        ...this.elevationClasses,
        ...this.sizeableClasses,
      }
    },
    contained (): boolean {
      return Boolean(
        !this.isFlat &&
        !this.depressed &&
        // Contained class only adds elevation
        // is not needed if user provides value
        !this.elevation
      )
    },
    computedRipple (): RippleOptions | boolean {
      if (this.disabled) return false
      else return this.ripple != null ? this.ripple : true
    },
    isFlat (): boolean {
      return Boolean(
        this.text ||
        this.outlined
      )
    },
    styles (): object {
      return {
        ...this.measurableStyles,
      }
    },
  },

  created () {
    const breakingProps = [
      ['flat', 'text'],
      ['outline', 'outlined'],
      ['round', 'rounded'],
    ]

    /* istanbul ignore next */
    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) breaking(original, replacement, this)
    })
  },

  methods: {
    click (e: MouseEvent): void {
      !this.retainFocusOnClick && e.detail && this.$el.blur()
      this.$emit('click', e)

      this.btnToggle && this.toggle()
    },
    genContent (): VNode {
      return this.$createElement('span', {
        staticClass: 'v-simple-btn__content',
      }, this.$slots.default)
    },
  },

  render (h): VNode {
    const children = [this.genContent()]
    const setColor = !this.isFlat ? this.setBackgroundColor : this.setTextColor
    const data: VNodeData = {
      attrs: {
        disabled: this.disabled,
        value: ['string', 'number'].includes(typeof this.value)
          ? this.value
          : JSON.stringify(this.value),
      },
      class: this.classes,
      style: this.styles,
      props: {},
      directives: [{
        name: 'ripple',
        value: this.computedRipple,
      }],
      on: {
        click: this.click,
      },
    }

    return h('button', this.disabled ? data : setColor(this.color, data), children)
  },
})
