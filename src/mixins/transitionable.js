export default {
  data () {
    return {
      transitioning: false
    }
  },
  
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