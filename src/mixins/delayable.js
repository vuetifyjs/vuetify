/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close
 * delay time for elements
 */
export default {
  data: () => ({
    openTimeout: null,
    closeTimeout: null
  }),

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

  methods: {
    /**
     * Clear any pending delay
     * timers from executing
     * 
     * @return {void}
     */
    clearDelay () {
      clearTimeout(this.openTimeout)
      clearTimeout(this.closeTimeout)
    },
    /**
     * Runs callback after
     * a specified delay
     * 
     * @param  {String}   type
     * @param  {Function} cb
     * 
     * @return {void}
     */
    runDelay (type, cb) {
      this.clearDelay()

      const delay = parseInt(this[`${type}Delay`], 10)

      this[`${type}Timeout`] = setTimeout(cb, delay)
    }
  }
}
