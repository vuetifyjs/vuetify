export default {
  methods: {
    snackHandler () {},
    _default (msg, text = 'Close') {
      this.message(null, msg, text)
    },
    _error (msg, text = 'Close') {
      this.message('error', msg, text)
    },
    _success (msg, text = 'Close') {
      this.message('success', msg, text)
    },
    message (color, msg, text) {
      const handler = this.snackHandler

      this.$store.commit('app/SNACKBAR', {
        color,
        msg,
        text,
        handler
      })
    }
  }
}
