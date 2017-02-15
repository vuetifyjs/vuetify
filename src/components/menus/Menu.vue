<template lang="pug">
  div(
    class="menu"
  )

    div(
      class="menu__activator"
      v-on:click="isActive = true"
      ref="activator"
      v-click-outside
    )
      slot(name="activator")

    component(
      v-bind:is="transition"
      v-bind:origin="origin"
    )
      div(
        ref="content"
        class="menu__content"
        v-on:click="isActive = false"
        v-show="isActive"
        v-bind:style="styles"
      )
        slot
</template>

<script>
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'menu',

    mixins: [Toggleable],

    data () {
      return {
        window: {},
        dimensions: {
          activator: {
            cssTop: 0, cssLeft: 0,
            top: 0, left: 0, bottom: 0, right: 0, height: 0, width: 0, offsetTop: 0
          },
          content: {
            cssTop: 0, cssLeft: 0,
            top: 0, left: 0, bottom: 0, right: 0, height: 0, width: 0, offsetTop: 0
          },
          list: null,
          selected: null
        },
        minWidth: 'auto',
        autoNudgeX: -8,
        autoNudgeY: -8
      }
    },

    props: {
      auto: Boolean,
      left: Boolean,
      bottom: Boolean,
      right: Boolean,
      maxHeight: {
        type: [String, Number],
        default: 'auto'
      },
      offsetX: Boolean,
      offsetY: Boolean,
      origin: {
        type: String,
        default: 'top left'
      },
      top: Boolean,
      transition: {
        type: String,
        default: 'v-menu-transition'
      }
    },

    watch: {
      isActive () {
        if (this.isActive) {
          this.activate()
        }

        this.$emit('input', this.isActive)
      }
    },

    computed: {
      direction () {
        const { edgeDistance: edge } = this
        const { content: c } = this.dimensions
        let vert = this.top && !this.auto ? 'top' : 'bottom'
        let horiz = this.left && !this.auto ? 'left' : 'left'

        // Flip direction, if needed, to where there's more room from the screen edge.
        vert = !this.auto && c.height > edge[vert] ? edge.maxVertDir : vert
        horiz = !this.auto && c.width > edge[horiz] ? edge.maxHorizDir : horiz

        return { vert, horiz }
      },

      offset () {
        const { activator: a, content: c } = this.dimensions
        const y = a.top - c.top    // <-- Start with the diff between content and activator to
        const x = a.left - c.left  // <-- shift content to activator's position.

        return {
          'top': this.offsetY ? y - c.height : y + a.height - c.height,
          'left': this.offsetX ? x - c.width : x + a.width - c.width,
          'bottom': this.offsetY ? y + a.height : y,
          'right': this.offsetX ? x + a.width : x
        }
      },

      autoOffsetY () {
        if (!this.auto || !this.dimensions.selected) return this.auto ? this.autoNudgeY - 8 : 0

        const { activator: a, content: c, selected: s, list } = this.dimensions
        const offsetBottom = list.height - s.height - s.offsetTop
        const scrollMiddle = (c.height - s.height) / 2
        let auto = (a.height - c.height) / 2 + this.autoNudgeY

        if (s.offsetTop < scrollMiddle) auto += scrollMiddle - s.offsetTop
        if (offsetBottom < scrollMiddle) auto += offsetBottom - scrollMiddle

        return auto
      },

      autoOffsetX () {
        return this.auto ? this.autoNudgeX : 0
      },

      edgeDistance () {
        const { activator: a } = this.dimensions
        const { innerHeight: innerH, innerWidth: innerW } = this.window
        let edge = {}

        edge = { top: a.top, left: a.left, bottom: innerH - a.bottom, right: innerW - a.right }
        edge.maxVert = edge.top > edge.bottom ? edge.top : edge.bottom
        edge.maxHoriz = edge.left > edge.right ? edge.left : edge.right
        edge.maxVertDir = edge.top > edge.bottom ? 'top' : 'bottom'
        edge.maxHorizDir = edge.left > edge.right ? 'left' : 'right'

        return edge
      },

      offscreen () {
        const { content: c } = this.dimensions
        const top = c.top + this.offset[this.direction.vert] + this.autoOffsetY
        const left = c.left + this.offset[this.direction.horiz] + this.autoOffsetX

        return {
          'vert': this.auto && top + c.height > this.window.innerHeight
            ? this.window.innerHeight - (top + c.height)
            : this.auto && top < 0
              ? -top
              : 0,
          'horiz': this.auto && left + c.width > this.window.innerWidth
            ? this.window.innerWidth - (left + c.width)
            : this.auto && left < 0
              ? -left
              : 0
        }
      },

      position () {
        const { vert, horiz } = this.direction
        const { content: c } = this.dimensions

        return {
          top: c.cssTop + this.offset[vert] + this.autoOffsetY + this.offscreen.vert,
          left: c.cssLeft + this.offset[horiz] + this.autoOffsetX + this.offscreen.horiz
        }
      },

      styles () {
        return {
          top: `${this.position.top}px`,
          left: `${this.position.left}px`
        }
      }
    },

    methods: {
      activate () {
        console.log(this.auto)
        // Get measurements before transitions mess with them.
        this.updateDimensions()

        this.$nextTick(() => {
          this.isActive = true
        })
      },

      updateDimensions () {
        this.sneakPeek()
        this.updateMaxMin()

        // Let the DOM compute dimensions.
        this.window = window
        this.dimensions = {
          'activator': this.$refs.activator.children
            ? this.measure(this.$refs.activator.children[0])
            : this.measure(this.$refs.activator),
          'content': this.measure(this.$refs.content),
          'list': this.measure(this.$refs.content, '.list'),
          'selected': this.measure(this.$refs.content, '.list__tile--active', 'parent')
        }

        this.fixOffscreen()
        this.updateScroll()
        this.sneakPeek(false)
      },

      updateMaxMin () {
        const { $el, $refs, maxHeight, auto, autoNudgeX } = this

        $refs.content.style.minWidth = `${$el.clientWidth + Math.abs(auto ? autoNudgeX : 0)}px`
        $refs.content.style.maxHeight = null  // <-- TODO: This is a temporary fix.
        $refs.content.style.maxHeight = isNaN(maxHeight) ? maxHeight : `${maxHeight}px`
      },

      fixOffscreen () {
        const { $refs, edgeDistance: edge } = this
        const { vert } = this.direction

        // If not auto, reduce height to the max vertical distance to a screen edge.
        if (!this.auto && this.dimensions.content.height > edge[vert]) {
          $refs.content.style.maxHeight = `${edge.maxVert}px`
          this.dimensions.content.height = $refs.content.getBoundingClientRect().height
        }
      },

      updateScroll () {
        if (!(this.auto && this.dimensions.selected)) return

        const { content: c, selected: s, list: l } = this.dimensions
        const scrollMiddle = (c.height - s.height) / 2
        const scrollMax = l.height - c.height
        let offsetTop = s.offsetTop - scrollMiddle

        if (this.offscreen.vert && offsetTop > scrollMax) offsetTop = scrollMax
        if (this.offscreen.vert && offsetTop < 0) offsetTop = 0

        this.$refs.content.scrollTop = offsetTop + this.offscreen.vert
      },

      // Utils
      // ====================

      measure (el, selector, getParent = false) {
        el = selector ? el.querySelector(selector) : el
        el = el && getParent ? el.parentElement : el

        if (!el) return null

        const { top, bottom, right, left, width, height } = el.getBoundingClientRect()
        const cssTop = parseInt(el.style.top) || 0
        const cssLeft = parseInt(el.style.left) || 0
        const offsetTop = el.offsetTop

        return { cssTop, cssLeft, top, bottom, right, left, width, height, offsetTop }
      },

      sneakPeek (on = true) {
        if (on) {
          this.$refs.content.style.opacity = 0
          this.$refs.content.style.display = 'inline-block'
        } else {
          this.$refs.content.style.display = 'none'
          this.$refs.content.style.opacity = null
        }
      }
    }
  }
</script>
