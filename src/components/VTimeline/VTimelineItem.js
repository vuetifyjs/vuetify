// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-timeline-item',

  mixins: [Colorable],

  props: {
    icon: {
      type: String
    },
    iconColor: {
      type: String
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    iconFillColor: {
      type: String,
      default: 'white'
    }
  },

  computed: {
    iconFillClass () {
      return this.addBackgroundColorClassChecks({}, this.iconFillColor)
    }
  },

  methods: {
        genIcon () {
      const iconElement = this.noIcon
        ? null
        : this.$createElement( VIcon, { props: { color: this.iconColor } },
            this.icon )
      
      return this.$createElement('div', {
          staticClass: 'v-timeline__icon',
          class: this.iconFillClass
        }, [iconElement])
    },
    genBody () {
      return this.$createElement('div', {
          staticClass: 'v-timeline__body'
        }, this.$slots.item)
    }
  },

  render (h) {
    const children = []

    children.push(this.genIcon())
    children.push(this.genBody())

    return h('li', {
        staticClass: 'v-timeline-item'
      }, children)
  }
}
