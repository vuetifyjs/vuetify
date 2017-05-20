export default {
  name: 'tabs-bar',

  props: {
    mobile: Boolean
  },

  computed: {
    classes () {
      return {
        'tabs__bar': true,
        'tabs__bar--mobile': this.mobile
      }
    }
  },

  methods: {
    scrollLeft () {
      this.$refs.container.scrollLeft -= 75
    },
    scrollRight () {
      this.$refs.container.scrollLeft += 75
    }
  },

  render (h) {
    const container = h('ul', {
      'class': 'tabs__container',
      ref: 'container'
    }, this.$slots.default)

    const left = h('v-icon', {
      props: {
        left: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      on: {
        click: this.scrollLeft
      }
    }, 'chevron_left')

    const right = h('v-icon', {
      props: {
        right: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      on: {
        click: this.scrollRight
      }
    }, 'chevron_right')

    return h('div', {
      'class': this.classes
    }, [container, left, right])
  }
}
