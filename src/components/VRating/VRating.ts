import '../../stylus/components/_rating.styl'

import { VNode, CreateElement, VNodeChildrenArrayContents } from 'vue'

import mixins from '../../util/mixins'

// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Sizeable from '../../mixins/sizeable'
import Rippleable from '../../mixins/rippleable'

import { createRange, remapInternalIcon } from '../../util/helpers'

type ItemSlotProps = {
  index: number
  value: number
  isFilled: boolean
  isHalfFilled: boolean
  isHovered: boolean
  isHalfHovered: boolean
  click: Function
}

export default mixins(Colorable, Sizeable, Rippleable).extend({
  name: 'v-rating',

  props: {
    backgroundColor: {
      type: String,
      default: 'secondary'
    },
    color: {
      type: String,
      default: 'primary'
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
    halfIncrements: Boolean,
    length: {
      type: Number,
      default: 5
    },
    readonly: Boolean,
    showHover: Boolean,
    value: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    hoverIndex: -1
  }),

  computed: {
    isHovering (): boolean {
      return this.showHover && this.hoverIndex >= 0
    }
  },

  methods: {
    isHalfEvent (e: MouseEvent): boolean {
      if (this.halfIncrements) {
        const rect = e.target && (e.target as HTMLElement).getBoundingClientRect()
        if (rect && e.offsetX < rect.width / 2) return true
      }

      return false
    },
    createClickFn (i: number): Function {
      return (e: MouseEvent) => {
        if (this.readonly) return

        if (this.isHalfEvent(e)) this.$emit('input', i + 0.5)
        else this.$emit('input', i + 1)
      }
    },
    createProps (i: number): ItemSlotProps {
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
    getIconName (props: ItemSlotProps): string {
      let iconName

      if (this.isHovering) {
        iconName = props.isHovered ? this.fullIcon : props.isHalfHovered ? this.halfIcon : this.emptyIcon
      } else {
        iconName = props.isFilled ? this.fullIcon : props.isHalfFilled ? this.halfIcon : this.emptyIcon
      }

      return remapInternalIcon(this, iconName)
    },
    getColor (props: ItemSlotProps): string {
      if (this.isHovering) {
        if (props.isHovered || props.isHalfHovered) return this.color
      } else {
        if (props.isFilled || props.isHalfFilled) return this.color
      }

      return this.backgroundColor
    },
    onMouseEnter (e: MouseEvent, i: number): void {
      if (this.isHalfEvent(e)) this.hoverIndex = i + 0.5
      else this.hoverIndex = i + 1
    },
    onMouseLeave (e: MouseEvent): void {
      this.hoverIndex = -1
    },
    genItem (h: CreateElement, i: number): VNode | VNodeChildrenArrayContents | string {
      const props = this.createProps(i)

      if (this.$scopedSlots.item) return this.$scopedSlots.item(props)

      let listeners = {
        click: props.click
      } as any // TODO: Better solution to allow listeners.mousemove?

      if (this.showHover) {
        listeners = Object.assign(listeners, {
          mouseenter: (e: MouseEvent) => this.onMouseEnter(e, i),
          mouseleave: this.onMouseLeave
        })

        if (this.halfIncrements) listeners.mousemove = (e: MouseEvent) => this.onMouseEnter(e, i)
      }

      const { small, medium, large, xLarge } = this.$props
      const iconProps = { small, medium, large, xLarge }

      return h(VIcon, {
        directives: !this.readonly && this.ripple && [{
          name: 'ripple',
          value: {
            circle: true
          }
        }] as any, // TODO
        props: iconProps,
        class: this.addTextColorClassChecks({}, this.getColor(props)),
        on: listeners
      }, [this.getIconName(props)])
    }
  },

  render (h): VNode {
    const children = createRange(this.length).map(i => this.genItem(h, i))

    return h('div', {
      staticClass: 'v-rating',
      class: {
        'v-rating--readonly': this.readonly
      }
    }, children)
  }
})
