export default {
  methods: {
    snackHandler () {},
    _default (msg, text = 'Close', timeout = 6000) {
      this.message(null, msg, text, timeout)
    },
    _error (msg, text = 'Close', timeout = 6000) {
      this.message('error', msg, text, timeout)
    },
    _success (msg, text = 'Close', timeout = 6000) {
      this.message('success', msg, text, timeout)
    },
    message (color, msg, text, timeout) {
      const handler = this.snackHandler

      this.$store.commit('app/SNACKBAR', {
        color,
        msg,
        text,
        timeout,
        handler
      })
    }
  }
}
