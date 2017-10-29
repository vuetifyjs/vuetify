import { addOnceEventListener } from './helpers'

/**
 * @mixin
 */
export default {
  mounted () {
    const setupPointerSupport = (propName, eventName) => {
      addOnceEventListener(window, eventName, () => {
        this.$vuetify[propName] = true
        this.$vuetify.load(() => {
          const app = document.querySelector('[data-app]') || document.body
          const className = 'application--' + propName.replace(/([A-Z])/g, '-$1').toLowerCase()
          app.classList.add(className)
        })
      })
    }

    // Adds application--touch-support class
    // after touchstart event is triggered
    setupPointerSupport('touchSupport', 'touchstart')

    // Add application--hover-support class
    // after mouseover event is triggered
    setupPointerSupport('hoverSupport', 'mouseover')
  }
}
