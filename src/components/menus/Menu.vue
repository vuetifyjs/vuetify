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
            top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, offsetTop: 0
          },
          content: {
            cssTop: 0, cssLeft: 0,
            top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, offsetTop: 0
          },
          list: null,
          selected: null
        },
        minWidth: 'auto',
        nudgeX: -16,
        nudgeY: -16
      }
    },

    props: {
      top: Boolean,
      left: Boolean,
      bottom: Boolean,
      right: Boolean,
      auto: Boolean,
      offsetX: Boolean,
      offsetY: Boolean,
      maxHeight: {
        type: [String, Number],
        default: 'auto'
      },
      origin: {
        type: String,
        default: 'top left'
      },
      transition: {
        type: String,
        default: 'v-menu-transition'
      }
    },

    watch: {
      isActive () {
        if (this.isActive) this.updateDimensions()

        this.$emit('input', this.isActive)
      }
    },

    computed: {
      direction () {
        const { left, top, auto, screenDistance } = this
        const { content: c } = this.dimensions
        let horiz = left && !auto ? 'left' : 'right'
        let vert = top && !auto ? 'top' : 'bottom'

        // Flip direction, if needed, to where there's more room from the window edge.
        horiz = !auto && c.width > screenDistance[horiz] ? screenDistance.horizMaxDir : horiz
        vert = !auto && c.height > screenDistance[vert] ? screenDistance.vertMaxDir : vert

        return { horiz, vert }
      },

      offset () {
        const { activator: a, content: c } = this.dimensions
        const { direction, offsetX, offsetY, offsetAuto } = this
        const x = a.left - c.left  // <-- Start with the diff between content and activator
        const y = a.top - c.top    // <-- to shift content to activator's position.

        return {
          horiz: direction.horiz === 'left'
            ? offsetX ? x - c.width : x + a.width - c.width + offsetAuto.horiz   // left
            : offsetX ? x + a.width : x + offsetAuto.horiz,                      // right
          vert: direction.vert === 'top'
            ? offsetY ? y - c.height : y + a.height - c.height + offsetAuto.vert // top
            : offsetY ? y + a.height : y + offsetAuto.vert                       // bottom
        }
      },

      offsetAuto () {
        if (!this.auto) return { horiz: 0, vert: 0 }
        if (!this.dimensions.selected) return { horiz: this.nudgeX, vert: this.nudgeY }

        const { activator: a, content: c, selected: s, list } = this.dimensions
        const offsetBottom = list.height - s.height - s.offsetTop
        const scrollMiddle = (c.height - s.height) / 2
        const horiz = this.nudgeX
        let vert = (a.height - c.height + this.nudgeY) / 2

        vert += s.offsetTop < scrollMiddle ? scrollMiddle - s.offsetTop : 0
        vert += offsetBottom < scrollMiddle ? offsetBottom - scrollMiddle : 0

        return { horiz, vert }
      },

      screenDistance () {
        const { activator: a } = this.dimensions
        const { innerHeight: innerH, innerWidth: innerW } = this.window
        const x = this.offsetX ? a.right : a.left  // <-- Determine which edge of the
        const y = this.offsetY ? a.bottom : a.top  // <-- activator to measure distance from.
        let distance = {}

        distance = { top: y, left: x, bottom: innerH - y, right: innerW - x }
        distance.horizMax = distance.left > distance.right ? distance.left : distance.right
        distance.horizMaxDir = distance.left > distance.right ? 'left' : 'right'
        distance.vertMax = distance.top > distance.bottom ? distance.top : distance.bottom
        distance.vertMaxDir = distance.top > distance.bottom ? 'top' : 'bottom'

        return distance
      },

      screenOverflow () {
        const { content: c } = this.dimensions
        const left = c.left + this.offset.horiz
        const top = c.top + this.offset.vert

        return {
          'horiz': this.auto && left + c.width > this.window.innerWidth
            ? (left + c.width) - this.window.innerWidth
            : this.auto && left < 0
              ? left
              : 0,
          'vert': this.auto && top + c.height > this.window.innerHeight
            ? (top + c.height) - this.window.innerHeight
            : this.auto && top < 0
              ? top
              : 0
        }
      },

      position () {
        const { content: c } = this.dimensions

        return {
          left: c.cssLeft + this.offset.horiz - this.screenOverflow.horiz,
          top: c.cssTop + this.offset.vert - this.screenOverflow.vert
        }
      },

      styles () {
        return {
          left: `${this.position.left}px`,
          top: `${this.position.top}px`
        }
      }
    },

    methods: {
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
        const { $el, $refs, maxHeight, auto, nudgeX } = this

        $refs.content.style.minWidth = `${$el.clientWidth + Math.abs(auto ? nudgeX : 0)}px`
        $refs.content.style.maxHeight = null  // <-- TODO: This is a temporary fix.
        $refs.content.style.maxHeight = isNaN(maxHeight) ? maxHeight : `${maxHeight}px`
      },

      fixOffscreen () {
        const { $refs, screenDistance } = this
        const { vert } = this.direction

        // If not auto, reduce height to the max vertical distance to a window edge.
        if (!this.auto && this.dimensions.content.height > screenDistance[vert]) {
          $refs.content.style.maxHeight = `${screenDistance.vertMax}px`
          this.dimensions.content.height = $refs.content.getBoundingClientRect().height
        }
      },

      updateScroll () {
        if (!this.auto || !this.dimensions.selected) return

        const { content: c, selected: s, list: l } = this.dimensions
        const scrollMiddle = (c.height - s.height) / 2
        const scrollMax = l.height - c.height
        let offsetTop = s.offsetTop - scrollMiddle

        offsetTop = this.screenOverflow.vert && offsetTop > scrollMax ? scrollMax : offsetTop
        offsetTop = this.screenOverflow.vert && offsetTop < 0 ? 0 : offsetTop
        offsetTop -= this.screenOverflow.vert

        this.$refs.content.scrollTop = offsetTop
      },

      // Utils
      // ====================

      measure (el, selector, getParent = false) {
        el = selector ? el.querySelector(selector) : el
        el = el && getParent ? el.parentElement : el

        if (!el) return null

        const { top, left, bottom, right, width, height } = el.getBoundingClientRect()
        const cssLeft = parseInt(el.style.left) || 0
        const cssTop = parseInt(el.style.top) || 0
        const offsetTop = el.offsetTop

        return { cssTop, cssLeft, top, left, bottom, right, width, height, offsetTop }
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
