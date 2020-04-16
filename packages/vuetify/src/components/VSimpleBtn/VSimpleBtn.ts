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
    tag: {
      type: String,
      default: 'button',
    },
    text: Boolean,
    type: {
      type: String,
      default: 'button',
    },
    value: null as any as PropType<any>,
  },

  data: () => ({
    proxyClass: 'v-simple-btn--active',
  }),

  computed: {
    classes (): any {
      return {
        'v-btn': true,
        'v-btn--absolute': this.absolute,
        'v-btn--block': this.block,
        'v-btn--bottom': this.bottom,
        'v-btn--contained': this.contained,
        'v-btn--depressed': (this.depressed) || this.outlined,
        'v-btn--disabled': this.disabled,
        'v-btn--fixed': this.fixed,
        'v-btn--flat': this.isFlat,
        'v-btn--left': this.left,
        'v-btn--outlined': this.outlined,
        'v-btn--right': this.right,
        'v-btn--rounded': this.rounded,
        'v-btn--text': this.text,
        'v-btn--tile': this.tile,
        'v-btn--top': this.top,
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
        staticClass: 'v-btn__content',
      }, this.$slots.default)
    },
  },

  render (h): VNode {
    const children = [this.genContent()]
    const setColor = !this.isFlat ? this.setBackgroundColor : this.setTextColor
    const data: VNodeData = {
      attrs: {},
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

    if (this.tag === 'button') {
      data.attrs!.type = this.type
      data.attrs!.disabled = this.disabled
    }

    return h(this.tag, this.disabled ? data : setColor(this.color, data), children)
  },
})
