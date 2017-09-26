/**
 * Loadable
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use default bar with provided or primary color
 * Alternatively can use the progress from "progress" slot
 */
export default {
  props: {
    loading: {
      type: [Boolean, String],
      default: false
    }
  },

  methods: {
    genProgress () {
      if (this.loading === false) return null

      return this.$slots.progress || this.$createElement('v-progress-linear', {
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
}
