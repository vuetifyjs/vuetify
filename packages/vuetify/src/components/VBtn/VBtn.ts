// Styles
import './VBtn.sass'

// Extensions
import VSheet from '../VSheet'

// Components
import VProgressCircular from '../VProgressCircular'

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import Positionable from '../../mixins/positionable'
import Routable from '../../mixins/routable'
import Sizeable from '../../mixins/sizeable'

// Utilities
import { cloneVNode, defineComponent, h } from 'vue'

// Types
import type { Prop, VNode } from 'vue'
import { RippleOptions } from '../../directives/ripple'

export default defineComponent({
  name: 'v-btn',

  mixins: [
    VSheet,
    Routable,
    Positionable,
    Sizeable,
    GroupableFactory('btnToggle'),
    ToggleableFactory('inputValue'),
  ],

  props: {
    activeClass: String,
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    icon: Boolean,
    loading: Boolean,
    outlined: Boolean,
    retainFocusOnClick: Boolean,
    rounded: Boolean,
    tag: {
      type: String,
      default: 'button',
    },
    text: Boolean,
    tile: Boolean,
    type: {
      type: String,
      default: 'button',
    },
    value: null as any as Prop<any>,
  },

  data: () => ({
    proxyClass: 'v-btn--active',
  }),

  computed: {
    classes (): any {
      return {
        'v-btn': true,
        ...Routable.computed!.classes.call(this),
        'v-btn--absolute': this.absolute,
        'v-btn--block': this.block,
        'v-btn--bottom': this.bottom,
        'v-btn--contained': this.contained,
        'v-btn--depressed': (this.depressed) || this.outlined,
        'v-btn--disabled': this.disabled,
        'v-btn--fab': this.fab,
        'v-btn--fixed': this.fixed,
        'v-btn--flat': this.isFlat,
        'v-btn--icon': this.icon,
        'v-btn--left': this.left,
        'v-btn--loading': this.loading,
        'v-btn--outlined': this.outlined,
        'v-btn--right': this.right,
        'v-btn--round': this.isRound,
        'v-btn--rounded': this.rounded,
        'v-btn--router': this.to,
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
      const defaultRipple = this.icon || this.fab ? { circle: true } : true
      if (this.disabled) return false
      else return this.ripple ?? defaultRipple
    },
    isFlat (): boolean {
      return Boolean(
        this.icon ||
        this.text ||
        this.outlined
      )
    },
    isRound (): boolean {
      return Boolean(
        this.icon ||
        this.fab
      )
    },
    styles (): object {
      return {
        ...this.measurableStyles,
      }
    },
  },

  methods: {
    click (e: MouseEvent): void {
      // TODO: Remove this in v3
      !this.retainFocusOnClick && !this.fab && e.detail && this.$el.blur()
      this.$emit('click', e)

      this.btnToggle && this.toggle()
    },
    genContent (): VNode {
      return h('span', {
        class: 'v-btn__content',
      }, this.$slots.default?.())
    },
    genLoader (): VNode {
      return h('span', {
        class: 'v-btn__loader',
      }, this.$slots.loader?.() || [h(VProgressCircular, {
        indeterminate: true,
        size: 23,
        width: 2,
      })])
    },
  },

  render (): VNode {
    const children = [
      this.genContent(),
      this.loading && this.genLoader(),
    ]
    const setColor = !this.isFlat ? this.setBackgroundColor : this.setTextColor
    const vnode = this.generateRouteLink(children)
    const data: Dictionary = {}

    if (vnode.type === 'button') {
      data.type = this.type
      data.disabled = this.disabled
    }
    data.value = ['string', 'number'].includes(typeof this.value)
      ? this.value
      : JSON.stringify(this.value)
    if (!this.disabled) setColor(this.color, data)

    return cloneVNode(vnode, data)
  },
})
