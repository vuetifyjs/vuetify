import { closestParentTag } from '../../util/helpers'

export default {
  name: 'tab-item',

  data () {
    return {
      isActive: false
    }
  },
  
  props: {
    href: String
  },

  computed: {
    classes () {
      return {
        'tab__item': true,
        'tab__item--active': this.isActive
      }
    },

    target () {
      return this.href.replace('#', '')
    },

    tabs () {
      return closestParentTag.call(this, 'v-tabs')
    }
  },

  mounted () {
    if (this.selected || window.location.hash.substr(1) === this.target) {
      this.$vuetify().load(this.click)
    }
  },

  methods: {
    click (e) {
      this.tabs.tabClick(this.target)
    }
  },

  render (h) {
    const data = {
      attrs: {},
      class: this.classes,
      props: {},
      domProps: {
        href: 'javascript:;'
      },
      on: {
        click: this.click
      },
      directives: [
        {
          name: 'ripple',
          value: this.ripple || false
        },
        {
          name: 'click-outside'
        }
      ]
    }

    const tab = h('a', data, [this.$slots.default])

    return h('li', {}, [tab])
  }
}
