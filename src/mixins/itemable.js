export default {
  props: {
    item: {
      type: Object,
      default () {
        return {
          href: '#!',
          text: '',
          icon: false,
          router: false
        }
      }
    },

    router: Boolean
  }
}