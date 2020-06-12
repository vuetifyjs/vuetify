// Types
import { BreakpointName } from 'vuetify/types/services/breakpoint'
import { deprecate } from '../../util/console'
import Vue, { PropType } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'mobile',

  props: {
    mobileBreakpoint: {
      type: [Number, String] as PropType<BreakpointName>,
      default (): BreakpointName | undefined {
        // Avoid destroying unit
        // tests for users
        return this.$vuetify
          ? this.$vuetify.breakpoint.mobileBreakpoint
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
        mobileBreakpoint,
      } = this.$vuetify.breakpoint

      // Check if local mobileBreakpoint matches
      // the application's mobileBreakpoint
      if (mobileBreakpoint === this.mobileBreakpoint) return mobile

      const mobileWidth = parseInt(this.mobileBreakpoint, 10)
      const isNumber = !isNaN(mobileWidth)

      return isNumber
        ? width < mobileWidth
        : name === this.mobileBreakpoint
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('mobile-break-point')) {
      deprecate('mobile-break-point', 'mobile-breakpoint', this)
    }
  },
})
