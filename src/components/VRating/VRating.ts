// Styles
import '../../stylus/components/_rating.styl'

// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Sizeable from '../../mixins/sizeable'
import Rippleable from '../../mixins/rippleable'
import Themeable from '../../mixins/themeable'

// Utilities
import { createRange } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode, VNodeDirective, VNodeChildrenArrayContents } from 'vue'

type ItemSlotProps = {
  index: number
  value: number
  isFilled: boolean
  isHalfFilled: boolean
  isHovered: boolean
  isHalfHovered: boolean
  click: Function
}

/* @vue/component */
export default mixins(
  Colorable,
  Rippleable,
  Sizeable,
  Themeable
).extend({
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
    directives (): VNodeDirective[] {
      if (this.readonly || !this.ripple) return []

      return [{
        name: 'ripple',
        value: { circle: true }
      } as VNodeDirective]
    },
    iconProps (): object {
      const {
        dark,
        medium,
        large,
        light,
        small,
        xLarge
      } = this.$props

      return {
        dark,
        medium,
        large,
        light,
        small,
        xLarge
      }
    },
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
      if (props.isHovered || props.isFilled) return this.fullIcon

      return (this.isHovering && props.isHalfHovered) || (!this.isHovering && props.isHalfFilled)
        ? this.halfIcon
        : this.emptyIcon
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
    genItem (i: number): VNode | VNodeChildrenArrayContents | string {
      const props = this.createProps(i)

      if (this.$scopedSlots.item) return this.$scopedSlots.item(props)

      const listeners: Record<string, Function>= {
        click: props.click
      }

      if (this.showHover) {
        listeners.mouseenter = (e: MouseEvent) => this.onMouseEnter(e, i)
        listeners.mouseleave = this.onMouseLeave

        if (this.halfIncrements) {
          listeners.mousemove = (e: MouseEvent) => this.onMouseEnter(e, i)
        }
      }

      return this.$createElement(VIcon, {
        directives: this.directives,
        props: this.iconProps,
        class: this.addTextColorClassChecks({}, this.getColor(props)),
        on: listeners
      }, [this.getIconName(props)])
    }
  },

  render (h): VNode {
    const children = createRange(this.length).map(i => this.genItem(i))

    return h('div', {
      staticClass: 'v-rating',
      class: {
        'v-rating--readonly': this.readonly
      }
    }, children)
  }
})
