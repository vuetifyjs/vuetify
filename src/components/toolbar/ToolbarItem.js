import { closestParentTag } from '../../util/helpers'

export default {
  name: 'toolbar-item',

  props: {
    disabled: Boolean,

    href: String,

    ripple: Boolean,

    router: Boolean,

    tag: String
  },

  computed: {
    classes () {
      return {
        'toolbar__item': true,
        'toolbar__item--disabled': this.disabled
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

  render (h) {
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
      data.props.activeClass = 'toolbar__item--active'

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
    const item = h(tag, data, [this.$slots.default])

    return h('li', {}, [item])
  }
}
