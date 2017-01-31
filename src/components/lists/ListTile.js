import { closestParentTag } from '../../util/helpers'

export default {
  name: 'list-tile',

  data () {
    return {
      active: false
    }
  },

  props: {
    avatar: Boolean,

    disabled: Boolean,

    href: String,

    ripple: Boolean,

    router: Boolean,

    tag: String
  },

  computed: {
    classes () {
      return {
        'list__tile': true,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled
      }
    },

    listUID () {
      return closestParentTag.call(this, 'v-list')
    }
  },

  methods: {
    click () {
      //
    }
  },

  render (createElement) {
    let tag
    
    const data = {
      attrs: {},
      class: this.classes,
      props: {},
      directives: [
        {
          name: 'ripple',
          value: this.ripple || false
        }
      ]
    }

    if (this.tag) {
      tag = this.tag
    } else if (this.href && this.router) {
      tag = 'router-link'
      data.props.to = this.href
      data.props.exact = this.href === '/'
      data.props.activeClass = 'list__tile--active'

      if (this.click) {
        data.nativeOn = { click: this.click }
      }
    } else {
      tag = 'a'
      data.attrs.href = this.href || 'javascript:;'

      if (this.click) {
        data.on = { click: this.click }
      }
    }

    return createElement(tag, data, [this.$slots.default])
  }
}
