// Styles
import '../../stylus/components/_slide-group.styl'

// Extensions
import VItemGroup, { GroupableInstance } from '../VItemGroup/VItemGroup'

// Types
import Vue, { VNode, VNodeChildren, VNodeDirective } from 'vue'
import mixins from '../../util/mixins'

interface options extends Vue {
  $refs: {
    container: HTMLElement
    content: HTMLElement
  }
}

type VItemGroupInstance = InstanceType<typeof VItemGroup>

export default mixins<VItemGroupInstance & options>(VItemGroup).extend({
  name: 'v-slide-group',

  props: {
    linear: Boolean,
    mandatory: {
      type: Boolean,
      default: true
    },
    reverseTransition: {
      type: String,
      default: 'slide-reverse-transition'
    },
    transition: {
      type: String,
      default: 'slide-transition'
    }
  },

  data () {
    return {
      isReversed: false,
      scrollOffset: 0,
      startX: 0,
      widths: {
        content: 0,
        container: 0
      }
    }
  },

  computed: {
    computedTransition (): string {
      return !this.isReversed
        ? this.transition
        : this.reverseTransition
    },
    isOverflowing (): boolean {
      return this.widths.content < this.widths.container
    },
    selectedIndex (): number {
      if (!this.selectedIndexes.length) return -1
      return this.selectedIndexes[0]
    },
    selectedItem (): GroupableInstance {
      return this.items[this.selectedIndex]
    }
  },

  watch: {
    selectedItems () {
      if (!this.linear) return

      this.setScrollOffset()
    },
    scrollOffset (val: number) {
      this.$refs.container.style.transform = `translateX(${-val}px)`
    }
  },

  mounted () {
    this.setOverflow()
  },

  updated () {
    this.setOverflow()
  },

  methods: {
    genAffix (affix: string): VNode | undefined {
      let slot

      // Regular slot
      if (this.$slots[affix]) {
        slot = this.$slots[affix]
      // Scoped slot
      } else if (this.$scopedSlots[affix]) {
        slot = this.$scopedSlots[affix]({
          next: this.next,
          prev: this.prev
        })
      // Nothing
      } else return slot

      return this.$createElement('div', {
        staticClass: `v-slide-group__${affix}`
      }, [slot])
    },
    genContainer (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-slide-group__container',
        ref: 'container'
      }, this.$slots.default)
    },
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-slide-group__content',
        directives: [{
          name: 'touch',
          value: {
            start: (e: TouchEvent) => this.overflowCheck(e, this.onTouchStart),
            move: (e: TouchEvent) => this.overflowCheck(e, this.onTouchMove),
            end: (e: TouchEvent) => this.overflowCheck(e, this.onTouchEnd)
          }
        }] as VNodeDirective[],
        ref: 'content'
      }, [this.genContainer()])
    },
    direction (next: number) {
      if (!this.items.length) return

      let index = next > 0 ? 0 : this.items.length - 1
      const selectedIndex = this.selectedIndex

      if (selectedIndex != null &&
        this.items[selectedIndex + next]
      ) {
        index = selectedIndex + next
      }

      this.onClick(this.items[index], index)
    },
    next () {
      this.isReversed = false
      this.direction(1)
    },
    prev () {
      this.isReversed = true
      this.direction(-1)
    },
    onTouchStart (e: TouchEvent) {
      const { container } = this.$refs

      this.startX = this.scrollOffset + e.touchstartX

      container.style.transition = 'none'
      container.style.willChange = 'transform'
    },
    onTouchMove (e: TouchEvent) {
      this.scrollOffset = this.startX - e.touchmoveX
    },
    onTouchEnd () {
      const { container } = this.$refs
      const maxScrollOffset = this.widths.container - this.widths.content

      container.style.transition = null
      container.style.willChange = null

      if (this.scrollOffset > this.widths.container) {
        this.scrollOffset = maxScrollOffset
      } else if (this.scrollOffset + this.widths.content < 0) {
        this.scrollOffset = 0
      }
    },
    overflowCheck (e: TouchEvent, fn: (e: TouchEvent) => void) {
      this.isOverflowing && fn(e)
    },
    setOverflow () {
      const { content, container } = this.$refs

      if (!content || !container) return

      this.widths.content = content.clientWidth
      this.widths.container = container.scrollWidth
    },
    setScrollOffset () {
      if (!this.selectedItems.length) return

      const el = this.selectedItems[0].$el

      if (!el) return

      this.scrollOffset = el.offsetLeft // - 16 // Account for padding
    }
  },

  render (h): VNode {
    const children: VNodeChildren = [this.genContent()]

    const prepend = this.genAffix('prepend')
    const append = this.genAffix('append')

    prepend && children.unshift(prepend)
    append && children.push(append)

    return h('div', {
      staticClass: 'v-item-group v-slide-group'
    }, children)
  }
})
