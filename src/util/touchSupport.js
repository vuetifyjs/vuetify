import { addOnceEventListener } from './helpers'

/**
 * @mixin
 */
export default {
  mounted () {
    addOnceEventListener(window, 'touchstart', () => {
      this.$vuetify.touchSupport = true
    })
  }
}
