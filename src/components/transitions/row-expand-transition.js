import { addOnceEventListener } from '../../util/helpers'

export default {
  enter (el, done) {
    el.td = el.parentNode

    addOnceEventListener(el, 'transitionend', done)

    // Get height that is to be scrolled
    const height = el.dataset.height || el.clientHeight
    el.dataset.height = height
    el.style.overflow = 'hidden'
    el.style.height = 0
    el.td.style['border-bottom'] = '1px solid rgba(0,0,0,0.12)'

    setTimeout(() => {
      el.dataset.height = el.style.height = `${el.scrollHeight}px`
    }, 50)
  },
  afterEnter (el) {
    el.style.overflow = null
  },
  leave (el, done) {
    // Remove initial transition
    addOnceEventListener(el, 'transitionend', done)

    // Set height before we transition to 0
    el.style.overflow = 'hidden'
    el.style.height = `${el.dataset.height}px`

    setTimeout(() => {
      el.style.height = 0
    }, 50)
  },
  afterLeave (el) {
    el.td.style['border-bottom'] = null
  }
}
