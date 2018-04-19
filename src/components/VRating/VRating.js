import '../../stylus/components/_rating.styl'

// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Sizeable from '../../mixins/sizeable'
import Rippleable from '../../mixins/rippleable'

import { createRange, remapInternalIcon } from '../../util/helpers'

export default {
  name: 'v-rating',

  mixins: [Colorable, Sizeable, Rippleable],

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
      default: '$vuetify.icons.ratingEmpty'
    },
    fullIcon: {
      type: String,
      default: '$vuetify.icons.ratingFull'
    },
    halfIcon: {
      type: String,
      default: '$vuetify.icons.ratingHalf'
    },
    value: {
      type: Number,
      required: true
    },
    showHover: {
      type: Boolean
    },
    halfIncrements: {
      type: Boolean
    },
    readonly: {
      type: Boolean
    }
  },

  data () {
    return {
      hoverIndex: null
    }
  },

  computed: {
    isHovering () {
      return this.showHover && this.hoverIndex !== null
    }
  },

  methods: {
    isHalfEvent (e) {
      if (this.halfIncrements) {
        const rect = e.target.getBoundingClientRect()
        if (e.offsetX < rect.width / 2) return true
      }

      return false
    },
    createClickFn (i) {
      return e => {
        if (this.readonly) return

        if (this.isHalfEvent(e)) this.$emit('input', i + 0.5)
        else this.$emit('input', i + 1)
      }
    },
    createProps (i) {
      const click = this.createClickFn(i)
      const isHovered = Math.floor(this.hoverIndex) > i
      const isHalfHovered = this.halfIncrements && !isHovered && (this.hoverIndex - i) % 1 > 0
      const isFilled = Math.floor(this.value) > i
      const isHalfFilled = this.halfIncrements && !isFilled && (this.value - i) % 1 > 0

      return {
        index: i,
        value: this.value,
        isFilled,
        isHalfFilled,
        isHovered,
        isHalfHovered,
        click
      }
    },
    getIconName (props) {
      let iconName

      if (this.isHovering) {
        iconName = props.isHovered ? this.fullIcon : props.isHalfHovered ? this.halfIcon : this.emptyIcon
      } else {
        iconName = props.isFilled ? this.fullIcon : props.isHalfFilled ? this.halfIcon : this.emptyIcon
      }

      return remapInternalIcon(this, iconName)
    },
    getColor (props) {
      if (props.isFilled || props.isHalfFilled) return this.color
      if (this.isHovering && (props.isHovered || props.isHalfHovered)) return this.color

      return this.backgroundColor
    },
    onMouseEnter (e, i) {
      if (this.isHalfEvent(e)) this.hoverIndex = i + 0.5
      else this.hoverIndex = i + 1
    },
    onMouseLeave (e) {
      this.hoverIndex = null
    },
    genItem (h, i) {
      const props = this.createProps(i)

      if (this.$scopedSlots.item) return this.$scopedSlots.item(props)

      let listeners = {
        click: props.click
      }

      if (this.showHover) {
        listeners = Object.assign(listeners, {
          mouseenter: e => this.onMouseEnter(e, i),
          mouseleave: this.onMouseLeave
        })

        if (this.halfIncrements) listeners.mousemove = e => this.onMouseEnter(e, i)
      }

      const { small, medium, large, xLarge } = this.$props
      const iconProps = { small, medium, large, xLarge }

      return h(VIcon, {
        directives: !this.readonly && this.ripple && [
          {
            name: 'ripple',
            value: {
              circle: true
            }
          }
        ],
        props: iconProps,
        class: this.addTextColorClassChecks({}, this.getColor(props)),
        on: listeners
      }, [this.getIconName(props)])
    }
  },

  render (h) {
    const children = createRange(this.length).map(i => this.genItem(h, i))

    return h('div', {
      staticClass: 'v-rating',
      class: {
        'v-rating--readonly': this.readonly
      }
    }, children)
  }
}
