// Styles
import '../../stylus/components/_slide.styl'

// Types
import Vue, { VNode, VNodeChildren, VNodeDirective } from 'vue'

interface options extends Vue {
  $refs: {
    container: HTMLElement
    content: HTMLElement
  }
}

/* @vue/component */
export default Vue.extend<options>().extend({
  data () {
    return {
      scrollOffset: 0,
      startX: 0,
      widths: {
        content: 0,
        container: 0
      }
    }
  },

  computed: {
    isOverflowing (): boolean {
      return this.widths.content < this.widths.container
    }
  },

  watch: {
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
          scrollTo: this.scrollTo
        })
      // Nothing
      } else {
        return slot
      }

      return this.$createElement('div', {
        staticClass: `v-slide__${affix}`
      }, [slot])
    },
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-slide__content',
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
    genContainer (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-slide__container',
        ref: 'container'
      }, this.$slots.default)
    },
    newOffset (direction: string): number {
      const { content, container } = this.widths

      if (direction === 'prev') {
        return Math.max(this.scrollOffset - content, 0)
      } else {
        return Math.min(this.scrollOffset + content, container - content)
      }
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
    scrollTo (direction: string) {
      this.scrollOffset = this.newOffset(direction)
    },
    setOverflow () {
      const { content, container } = this.$refs

      if (!content || !container) return

      this.widths.content = content.clientWidth
      this.widths.container = container.scrollWidth
    }
  },

  render (h): VNode {
    const children: VNodeChildren = [this.genContent()]

    const prepend = this.genAffix('prepend')
    const append = this.genAffix('append')

    prepend && children.unshift(prepend)
    append && children.push(append)

    return h('div', {
      staticClass: 'v-slide'
    }, children)
  }
})
