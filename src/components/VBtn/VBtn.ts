// Styles
import '../../stylus/components/_buttons.styl'

// Types
import { VNode, VNodeChildren } from 'vue'
import { PropValidator } from 'vue/types/options'
import mixins from '../../util/mixins'

// Components
import VProgressCircular from '../VProgressCircular'

// Mixins
import Colorable from '../../mixins/colorable'
import Positionable from '../../mixins/positionable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import { inject as RegistrableInject } from '../../mixins/registrable'

export default mixins(
  Colorable,
  Routable,
  Positionable,
  Themeable,
  ToggleableFactory('inputValue'),
  RegistrableInject('buttonGroup')
  /* @vue/component */
).extend({
  name: 'v-btn',

  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active'
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
    value: null as any as PropValidator<any>
  },

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
        'v-btn--floating': this.fab,
        'v-btn--fixed': this.fixed,
        'v-btn--icon': this.icon,
        'v-btn--large': this.large,
        'v-btn--left': this.left,
        'v-btn--loader': this.loading,
        'v-btn--outline': this.outline,
        'v-btn--depressed': (this.depressed && !this.flat) || this.outline,
        'v-btn--right': this.right,
        'v-btn--round': this.round,
        'v-btn--router': this.to,
        'v-btn--small': this.small,
        'v-btn--top': this.top,
        ...this.themeClasses
      }

      return (!this.outline && !this.flat)
        ? this.addBackgroundColorClassChecks(classes)
        : this.addTextColorClassChecks(classes)
    }
  },

  mounted () {
    if (this.buttonGroup) {
      this.buttonGroup.register(this)
    }
  },

  beforeDestroy () {
    if (this.buttonGroup) {
      this.buttonGroup.unregister(this)
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
        { 'class': 'v-btn__content' },
        [this.$slots.default]
      )
    },
    genLoader (): VNode {
      const children: VNodeChildren = []

      if (!this.$slots.loader) {
        children.push(this.$createElement(VProgressCircular, {
          props: {
            indeterminate: true,
            size: 26,
            width: 2
          }
        }))
      } else {
        children.push(this.$slots.loader)
      }

      return this.$createElement('span', { 'class': 'v-btn__loading' }, children)
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()
    const children = [this.genContent()]

    tag === 'button' && (data.attrs!.type = this.type)
    this.loading && children.push(this.genLoader())

    data.attrs!.value = ['string', 'number'].includes(typeof this.value)
      ? this.value
      : JSON.stringify(this.value)

    return h(tag, data, children)
  }
})
