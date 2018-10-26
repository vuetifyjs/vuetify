import Vue, { VNode } from 'vue'
import VProgressLinear from '../components/VProgressLinear'

interface colorable extends Vue {
  color?: string
}

/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */
/* @vue/component */
export default Vue.extend<colorable>().extend({
  name: 'loadable',

  props: {
    loading: {
      type: [Boolean, String],
      default: false
    }
  },

  methods: {
    genProgress (): VNode | VNode[] | null {
      if (this.loading === false) return null

      return this.$slots.progress || this.$createElement(VProgressLinear, {
        props: {
          color: (this.loading === true || this.loading === '')
            ? (this.color || 'primary')
            : this.loading,
          height: 2,
          indeterminate: true
        }
      })
    }
  }
})
