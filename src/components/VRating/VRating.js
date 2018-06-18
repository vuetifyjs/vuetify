import VIcon from '../VIcon'
import Colorable from '../../mixins/colorable'

import { createRange } from '../../util/helpers'

export default {
  name: 'v-rating',
  mixins: [Colorable],
  props: {
    length: {
      type: Number,
      default: 5
    },
    emptyIcon: {
      type: String,
      default: 'star_border'
    },
    fullIcon: {
      type: String,
      default: 'star'
    },
    value: {
      type: Number,
      required: true
    },
    showHover: {
      type: Boolean
    }
  },
  data () {
    return {
      hover: 0
    }
  },
  computed: {
    classes () {
      return {
        'v-rating': true
      }
    }
  },
  methods: {
    createClickFn (i) {
      return () => {
        this.$emit('input', i + 1)
      }
    },
    genIcon (h, i) {
      const click = this.createClickFn(i)

      if (this.$scopedSlots.item) {
        return this.$scopedSlots.item({
          index: i,
          value: this.value,
          full: this.value > i,
          click,
          hover: this.hover,
          showHover: this.showHover
        })
      }

      let icon

      if (this.showHover && this.hover > 0) {
        icon = this.hover > i ? this.fullIcon : this.emptyIcon
      } else {
        icon = this.value > i ? this.fullIcon : this.emptyIcon
      }

      let listeners = {
        click
      }

      if (this.showHover) {
        listeners = Object.assign(listeners, {
          mouseenter: () => {
            this.hover = i + 1
          },
          mouseleave: () => {
            this.hover = 0
          }
        })
      }

      return h(VIcon, {
        class: this.addTextColorClassChecks({}, this.color),
        on: listeners
      }, [icon])
    },
    genItems (h) {
      return createRange(this.length).map(i => this.genIcon(h, i))
    }
  },
  render (h) {
    const children = this.genItems(h)

    return h('div', {
      class: this.classes
    }, children)
  }
}
