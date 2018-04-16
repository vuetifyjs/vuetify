import VBtn from '../VBtn'
import VIcon from '../VIcon'

import Colorable from '../../mixins/colorable'

import Ripple from '../../directives/ripple'

import { createRange } from '../../util/helpers'

export default {
  name: 'v-rating',
  mixins: [Colorable],
  directives: {
    Ripple
  },
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
    },
    large: {
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
    genItem (h, i) {
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

      let iconName

      if (this.showHover && this.hover > 0) {
        iconName = this.hover > i ? this.fullIcon : this.emptyIcon
      } else {
        iconName = this.value > i ? this.fullIcon : this.emptyIcon
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

      const icon = h(VIcon, {
        directives: [
          {
            name: 'ripple',
            value: true
          }
        ],
        props: {
          large: this.large
        },
        class: this.addTextColorClassChecks({}, this.color),
        on: listeners
      }, [iconName])

      return h(VBtn, {
        props: {
          ripple: true,
          icon: true,
          large: this.large
        },
        on: listeners
      }, [icon])
    }
  },
  render (h) {
    const children = createRange(this.length).map(i => this.genItem(h, i))

    return h('div', {
      class: this.classes
    }, children)
  }
}
