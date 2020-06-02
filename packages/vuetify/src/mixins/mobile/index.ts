// Types
import { BreakpointName } from 'vuetify/types/services/breakpoint'
import Vue, { PropType } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'mobile',

  props: {
    mobileBreakPoint: {
      type: [Number, String] as PropType<BreakpointName>,
      default (): BreakpointName | undefined {
        // Avoid destroying unit
        // tests for users
        return this.$vuetify
          ? this.$vuetify.breakpoint.mobileBreakPoint
          : undefined
      },
      validator: v => (
        !isNaN(Number(v)) ||
        ['xs', 'sm', 'md', 'lg', 'xl'].includes(String(v))
      ),
    },
  },

  computed: {
    isMobile (): boolean {
      const {
        mobile,
        width,
        name,
        mobileBreakPoint,
      } = this.$vuetify.breakpoint

      // Check if local mobileBreakPoint matches
      // the application's mobileBreakPoint
      if (mobileBreakPoint === this.mobileBreakPoint) return mobile

      const mobileWidth = parseInt(this.mobileBreakPoint, 10)
      const isNumber = !isNaN(mobileWidth)

      return isNumber
        ? width < mobileWidth
        : name === this.mobileBreakPoint
    },
  },
})
