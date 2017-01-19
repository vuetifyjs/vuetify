export default {
  name: 'list-tile-action',

  data () {
    return {
      stack: false
    }
  },

  computed: {
    classes () {
      return {
        'list__tile__action': true,
        'list__tile__action--stack': this.stack
      }
    }
  },

  mounted () {
    this.stack = this.$el.childElementCount > 1
  },

  render (createElement) {
    let data = { 
      'class': this.classes
    }

    return createElement('div', data, this.$slots.default)
  }
}