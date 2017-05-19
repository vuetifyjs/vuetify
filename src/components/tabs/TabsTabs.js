export default {
  name: 'tabs-tabs',

  props: {
    mobile: Boolean,
    bgColor: String,
  },

  computed: {
    classes () {
      // default classes
      let c = {
        'tabs__tabs': true,
        'tabs__tabs--mobile': this.mobile
      }
      // if set, add bg color class
      if (this.bgColor !== undefined) c[this.bgColor] = true
      return c
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
