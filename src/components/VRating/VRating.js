import '../../stylus/components/_rating.styl'

import VIcon from '../VIcon'

import Colorable from '../../mixins/colorable'
import Sizeable from '../../mixins/sizeable'

import Ripple from '../../directives/ripple'

import { createRange } from '../../util/helpers'

export default {
  name: 'v-rating',
  mixins: [Colorable, Sizeable],
  directives: {
    Ripple
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'secondary'
    },
    color: {
      type: String,
      default: 'primary'
    },
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
      hoverIndex: 0
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
      const isHovering = this.hoverIndex > 0
      const isSelected = this.value > i

      if (this.$scopedSlots.item) {
        return this.$scopedSlots.item({
          index: i,
          value: this.value,
          isSelected,
          isHovering,
          click
        })
      }

      let iconName

      if (this.showHover && isHovering) {
        iconName = this.hoverIndex > i ? this.fullIcon : this.emptyIcon
      } else {
        iconName = this.value > i ? this.fullIcon : this.emptyIcon
      }

      let listeners = {
        click
      }

      if (this.showHover) {
        listeners = Object.assign(listeners, {
          mouseenter: () => {
            this.hoverIndex = i + 1
          },
          mouseleave: () => {
            this.hoverIndex = 0
          }
        })
      }

      const { small, medium, large, xLarge } = this.$props
      const props = { small, medium, large, xLarge }
      const color = this.hoverIndex > i || (isSelected && !isHovering) ? this.color : this.backgroundColor

      return h(VIcon, {
        directives: [
          {
            name: 'ripple',
            value: {
              circle: true
            }
          }
        ],
        props,
        class: this.addTextColorClassChecks({}, color),
        on: listeners
      }, [iconName])
    }
  },
  render (h) {
    const children = createRange(this.length).map(i => this.genItem(h, i))

    return h('div', {
      class: this.classes
    }, children)
  }
}
