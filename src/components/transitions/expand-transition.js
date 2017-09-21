import { addOnceEventListener } from '../../util/helpers'

export default {
  enter (el, done) {
    // Remove initial transition
    el.style.transition = 'none'
    addOnceEventListener(el, 'transitionend', done)

    // Get height that is to be scrolled
    el.style.overflow = 'hidden'
    el.style.height = null
    el.style.display = 'block'
    const height = `${el.clientHeight}px`
    el.style.height = 0
    el.style.transition = null

    setTimeout(() => (el.style.height = height), 100)
  },

  afterEnter (el) {
    el.style.height = 'auto'
    el.style.overflow = null
  },

  leave (el, done) {
    addOnceEventListener(el, 'transitionend', done)

    // Set height before we transition to 0
    el.style.overflow = 'hidden'
    el.style.height = `${el.clientHeight}px`

    setTimeout(() => (el.style.height = 0), 100)
  }
}
