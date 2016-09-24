export default {
  mounted () {
    this.transitions.forEach(([el, cb]) => {
      el.addEventListener('transitionend', cb, false)
    })
  },

  beforeDestroy () {
    this.transitions.forEach(([el, cb]) => {
      el.removeEventListener('transitionend', cb, false)
    })
  }
}