// Styles
import './VBtn.scss'

// Extensions
import VSheet from '../VSheet'

// Components
import VHover from '../VHover'
import VProgressCircular from '../VProgressCircular'

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import Positionable from '../../mixins/positionable'
import Routable from '../../mixins/routable'
import Sizeable from '../../mixins/sizeable'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'
import { deprecate } from '../../util/console'

// Types
import { VNode } from 'vue'
import { Prop, PropValidator } from 'vue/types/options'
import mixins, { ExtractVue } from '../../util/mixins'
import { RippleOptions } from '../../directives/ripple'

const baseMixins = mixins(
  VSheet,
  Routable,
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
  name: 'v-btn',

  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active'
    },
    block: Boolean,
    depressed: Boolean,
    elevation: {
      type: [Number, String],
      default: 2
    },
    fab: Boolean,
    flat: Boolean,
    icon: {
      type: String as Prop<'left' | 'right'>,
      default: undefined
    },
    loading: Boolean,
    outline: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    round: Boolean,
    rounded: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    text: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    value: null as any as PropValidator<any>
  },

  data: () => ({
    hasMouseDown: false,
    hasHover: false
  }),

  computed: {
    classes (): any {
      const classes = {
        'v-btn': true,
        [this.activeClass]: this.isActive,
        'v-btn--absolute': this.absolute,
        'v-btn--block': this.block,
        'v-btn--bottom': this.bottom,
        'v-btn--disabled': this.disabled,
        'v-btn--flat': this.flat,
        'v-btn--fab': this.fab,
        'v-btn--fixed': this.fixed,
        'v-btn--left': this.left,
        'v-btn--loading': this.loading,
        'v-btn--outline': this.outline,
        'v-btn--depressed': (this.depressed && !this.flat) || this.outline,
        'v-btn--right': this.right,
        'v-btn--round': this.isRound,
        'v-btn--rounded': this.round,
        'v-btn--router': this.to,
        'v-btn--text': this.text,
        'v-btn--top': this.top,
        ...this.themeClasses,
        ...this.groupClasses,
        ...this.elevationClasses,
        ...this.sizeableClasses
      }

      if (this.icon) {
        classes['v-btn--icon'] = true
        classes[`v-btn--icon-${this.icon}`] = true
      }

      return classes
    },
    computedElevation (): string | number {
      if (this.isFlat || this.disabled) return 0
      if (this.fab) return this.hasMouseDown ? 12 : this.hasHover ? 8 : 6
      if (this.hasMouseDown) return 8
      if (this.hasHover) return 4
      return this.elevation
    },
    computedRipple (): RippleOptions | boolean {
      const defaultRipple = this.icon || this.fab ? { circle: true } : true
      if (this.disabled) return false
      else return this.ripple !== null ? this.ripple : defaultRipple
    },
    isFlat (): boolean {
      return Boolean(
        this.text ||
        this.flat ||
        this.outline
      )
    },
    isRound (): boolean {
      return Boolean(
        this.round ||
        this.fab
      )
    },
    styles (): object {
      return {
        ...this.measurableStyles
      }
    }
  },

  watch: {
    '$route': 'onRouteChange'
  },

  created () {
    if (this.flat) deprecate('flat', 'text', this)
    if (this.icon as any === '' || typeof this.icon === 'boolean') {
      deprecate('icon', 'fab flat')
    }
  },

  methods: {
    // Prevent focus to match md spec
    click (e: MouseEvent): void {
      !this.fab &&
      e.detail &&
      this.$el.blur()

      this.$emit('click', e)

      this.btnToggle && this.toggle()
    },
    genContent (): VNode {
      return this.$createElement(
        'div',
        { 'class': 'v-btn__content' },
        this.$slots.default
      )
    },
    genLoader (): VNode {
      return this.$createElement('span', {
        class: 'v-btn__loader'
      }, this.$slots.loader || [this.$createElement(VProgressCircular, {
        props: {
          indeterminate: true,
          size: 23,
          width: 2
        }
      })])
    },
    onRouteChange () {
      if (!this.to || !this.$refs.link) return

      const path = `_vnode.data.class.${this.activeClass}`

      this.$nextTick(() => {
        if (getObjectValueByPath(this.$refs.link, path)) {
          this.toggle()
        }
      })
    }
  },

  render (h): VNode {
    const children = [
      this.genContent(),
      this.loading && this.genLoader()
    ]
    const setColor = !this.isFlat ? this.setBackgroundColor : this.setTextColor
    const { tag, data } = this.generateRouteLink(this.classes, this.styles)

    if (tag === 'button') data.attrs!.type = this.type

    data.attrs!.value = ['string', 'number'].includes(typeof this.value)
      ? this.value
      : JSON.stringify(this.value)

    if (this.btnToggle) data.ref = 'link'

    const render = h(tag, setColor(this.color, data), children)

    if (this.isFlat) return render

    this._g(render.data!, {
      mousedown: () => (this.hasMouseDown = true),
      mouseup: () => (this.hasMouseDown = false)
    })

    return h(VHover, {
      props: { value: this.hasHover },
      on: {
        input: (val: boolean) => (this.hasHover = val)
      }
    }, [render])
  }
})
