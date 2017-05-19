import { addOnceEventListener } from '../util/helpers'

export default {
  methods: {
    enter (el, done) {
      el.style.overflow = 'hidden'
      el.style.height = null
      el.style.display = 'block'
      const height = `${el.clientHeight}px`
      el.style.height = 0

      setTimeout(() => {
        el.style.height = height
        addOnceEventListener(el, 'transitionend', done)
      }, 50)
    },
    afterEnter (el) {
      el.style.height = 'auto'
      el.style.overflow = null
    },
    leave (el, done) {
      el.style.overflow = 'hidden'
      el.style.height = `${el.clientHeight}px`
      
      setTimeout(() => el.style.height = 0, 0)

      addOnceEventListener(el, 'transitionend', done)
    }
  }
}