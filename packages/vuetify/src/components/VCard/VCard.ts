// Styles
import '../../stylus/components/_cards.styl'

// Extensions
import VSheet from '../VSheet'

// Extensions
import VHover from '../VHover'

// Mixins
import Routable from '../../mixins/routable'

// Helpers
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default mixins(
  Routable,
  VSheet
).extend({
  name: 'v-card',

  props: {
    elevation: {
      type: [Number, String],
      default: 2
    },
    flat: Boolean,
    hover: [Boolean, String, Number],
    img: String,
    raised: Boolean
  },

  data: () => ({
    isHovered: false
  }),

  computed: {
    classes (): object {
      return {
        'v-card': true,
        'v-card--hover': this.isHoverable,
        ...VSheet.options.computed.classes.call(this)
      }
    },
    computedElevation (): number | string {
      if (this.isHovered) {
        return typeof this.hover === 'boolean' ? 8 : Number(this.hover)
      }
      if (this.flat) return 0
      if (this.raised) return 3

      return (VSheet.options.computed as any).computedElevation.call(this)
    },
    isHoverable (): boolean {
      return this.hover != null && this.hover !== false
    },
    styles (): object {
      const style = {
        ...VSheet.options.computed.styles.call(this)
      }

      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`
      }

      return style
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink(this.classes)

    data.style = this.styles

    const card = h(tag, this.setBackgroundColor(this.color, data), this.$slots.default)

    if (!this.isHoverable) return card

    return h(VHover, {
      props: { value: this.isHovered },
      on: {
        input: (val: boolean) => {
          this.isHovered = val
        }
      }
    }, [card])
  }
})
