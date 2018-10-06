// Styles
import '../../stylus/components/_bottom-navs.styl'

// Mixins
import Applicationable from '../../mixins/applicationable'
import ButtonGroup from '../../mixins/button-group'
import Colorable from '../../mixins/colorable'

// Util
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

export default mixins(
  Applicationable('bottom', [
    'height',
    'value'
  ]),
  Colorable
  /* @vue/component */
).extend({
  name: 'v-bottom-nav',

  props: {
    active: [Number, String],
    mandatory: Boolean,
    height: {
      default: 56,
      type: [Number, String],
      validator: (v: string | number): boolean => !isNaN(parseInt(v))
    },
    shift: Boolean,
    value: null as any as PropValidator<any>
  },

  computed: {
    classes (): object {
      return {
        'v-bottom-nav--absolute': this.absolute,
        'v-bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
        'v-bottom-nav--shift': this.shift,
        'v-bottom-nav--active': this.value
      }
    },
    computedHeight (): number {
      return parseInt(this.height)
    }
  },

  methods: {
    updateApplication (): number {
      return !this.value
        ? 0
        : this.computedHeight
    },
    updateValue (val: any) {
      this.$emit('update:active', val)
    }
  },

  render (h): VNode {
    return h(ButtonGroup, this.setBackgroundColor(this.color, {
      staticClass: 'v-bottom-nav',
      class: this.classes,
      style: {
        height: `${parseInt(this.computedHeight)}px`
      },
      props: {
        mandatory: Boolean(this.mandatory || this.active !== undefined),
        value: this.active
      },
      on: { change: this.updateValue }
    }), this.$slots.default)
  }
})
