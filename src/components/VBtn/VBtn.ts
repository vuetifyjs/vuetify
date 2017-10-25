// Styles
import '../../stylus/components/_buttons.styl'

import Vue, { VNode, ComponentOptions, VNodeChildren } from 'vue'
import mixins from '../../util/mixins'

// Components
import VProgressCircular from '../VProgressCircular'

// Mixins
import Colorable from '../../mixins/colorable'
import Positionable from '../../mixins/positionable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'
// import { inject as RegistrableInject } from '../../mixins/registrable'

export default mixins(
  Colorable,
  Routable,
  Positionable,
  Themeable,
  ToggleableFactory('inputValue')
  // RegistrableInject('buttonGroup') // TODO
).extend({
  name: 'v-btn',

  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    large: Boolean,
    loading: Boolean,
    outline: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    round: Boolean,
    small: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    value: null
  },

  computed: {
    classes (): any {
      const classes = {
        'btn': true,
        [this.activeClass]: this.isActive,
        'btn--absolute': this.absolute,
        'btn--block': this.block,
        'btn--bottom': this.bottom,
        'btn--disabled': this.disabled,
        'btn--flat': this.flat,
        'btn--floating': this.fab,
        'btn--fixed': this.fixed,
        // 'btn--hover': this.hover, // TODO
        'btn--icon': this.icon,
        'btn--large': this.large,
        'btn--left': this.left,
        'btn--loader': this.loading,
        'btn--outline': this.outline,
        'btn--depressed': (this.depressed && !this.flat) || this.outline,
        'btn--right': this.right,
        'btn--round': this.round,
        'btn--router': this.to,
        'btn--small': this.small,
        'btn--top': this.top,
        ...this.themeClasses
      }

      return (!this.outline && !this.flat)
        ? this.addBackgroundColorClassChecks(classes)
        : this.addTextColorClassChecks(classes)
    }
  },

  methods: {
    // Prevent focus to match md spec
    click (e: MouseEvent): void {
      !this.fab &&
      e.detail &&
      this.$el.blur()

      this.$emit('click', e)
    },
    genContent (): VNode {
      return this.$createElement(
        'div',
        { 'class': 'btn__content' },
        [this.$slots.default]
      )
    },
    genLoader (): VNode {
      const children: VNodeChildren = []

      if (!this.$slots.loader) {
        children.push(this.$createElement(VProgressCircular as ComponentOptions<Vue>, {
          props: {
            indeterminate: true,
            size: 23,
            width: 2
          }
        }))
      } else {
        children.push(this.$slots.loader)
      }

      return this.$createElement('span', { 'class': 'btn__loading' }, children)
    }
  },

  mounted () {
    // if (this.buttonGroup) {
    //   this.buttonGroup.register(this)
    // }
  },

  beforeDestroy () {
    // if (this.buttonGroup) {
    //   this.buttonGroup.unregister(this)
    // }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()
    const children = [this.genContent()]

    tag === 'button' && (data.attrs.type = this.type)
    this.loading && children.push(this.genLoader())

    data.attrs.value = ['string', 'number'].includes(typeof this.value)
      ? this.value
      : JSON.stringify(this.value)

    return h(tag, data, children)
  }
})
