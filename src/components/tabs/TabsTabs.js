export default {
  name: 'tabs-tabs',

  data () {
    return {
      mobile: false
    }
  },

  computed: {
    classes () {
      return {
        'tabs__tabs': true,
        'tabs__tabs--mobile': this.mobile
      }
    }
  },

  methods: {
    scrollLeft () {
      this.$refs.container.scrollLeft -= 50
    },
    scrollRight () {
      this.$refs.container.scrollLeft += 50
    }
  },

  render (h) {
    const container = h('ul', {
      'class': 'tabs__container',
      ref: 'container'
    }, [this.$slots.default])

    const left = h('v-icon', {
      props: {
        left: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      nativeOn: {
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
      nativeOn: {
        click: this.scrollLeft
      }
    }, 'chevron_right')

    return h('div', {
      'class': this.classes
    }, [container, left, right])
  }
}
