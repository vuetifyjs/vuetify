import { addOnceEventListener } from '../../util/helpers'

export default {
  enter (el, done) {
    el.td = el.parentNode

    addOnceEventListener(el, 'transitionend', done)

    // Get height that is to be scrolled
    el.style.overflow = 'hidden'
    el.style.height = 0
    el.td.style['border-bottom'] = '1px solid rgba(0,0,0,0.12)'

    setTimeout(() => (el.style.height = `${el.scrollHeight}px`), 0)
  },
  afterEnter (el) {
    el.style.overflow = null
    el.style.height = null
  },
  leave (el, done) {
    // Remove initial transition
    addOnceEventListener(el, 'transitionend', done)

    // Set height before we transition to 0
    el.style.overflow = 'hidden'
    el.style.height = `${el.offsetHeight}px`

    setTimeout(() => (el.style.height = 0), 50)
  },
  afterLeave (el) {
    el.td.style['border-bottom'] = null
  }
}
