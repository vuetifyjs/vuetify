export default {
  name: 'density',

  props: {
    comfortable: Boolean,
    compact: Boolean,
  },

  computed: {
    normal () {
      return (
        !this.comfortable &&
        !this.compact
      )
    },
  },
}
