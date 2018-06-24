import Vue from 'vue'

/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */
export default Vue.extend({
  name: 'delayable',

  props: {
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 200
    }
  },

  data: () => ({
    openTimeout: undefined as number | undefined,
    closeTimeout: undefined as number | undefined
  }),

  methods: {
    /**
     * Clear any pending delay timers from executing
     */
    clearDelay (): void {
      clearTimeout(this.openTimeout)
      clearTimeout(this.closeTimeout)
    },
    /**
     * Runs callback after a specified delay
     */
    runDelay (type: 'open' | 'close', cb: () => void): void {
      this.clearDelay()

      const delay = parseInt((this as any)[`${type}Delay`], 10)

      ;(this as any)[`${type}Timeout`] = setTimeout(cb, delay)
    }
  }
})
