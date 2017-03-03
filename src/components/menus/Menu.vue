<template lang="pug">
  div(
    class="menu"
    v-on:keyup.esc="isActive = false"
    v-click-outside
  )

    div(
      class="menu__activator"
      v-on:click="isActive = !isActive"
      ref="activator"
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
        v-on:click="isActive = !closeOnClick"
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
            top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, offsetTop: 0
          },
          content: {
            top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, offsetTop: 0
          },
          list: null,
          selected: null
        },
        direction: { vert: '', horiz: '' },
        position: { left: '0px', top: '0px', right: 'auto', bottom: 'auto' },
        minWidth: 'auto'
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
      nudgeXAuto: {
        type: Number,
        default: -16
      },
      nudgeYAuto: {
        type: Number,
        default: -16
      },
      nudgeTop: {
        type: Number,
        default: 0
      },
      nudgeLeft: {
        type: Number,
        default: 0
      },
      nudgeBottom: {
        type: Number,
        default: 0
      },
      nudgeRight: {
        type: Number,
        default: 0
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
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
        if (this.isActive) this.activate()

        this.$emit('input', this.isActive)
      }
    },

    computed: {
      offset () {
        const { activator: a, content: c } = this.dimensions
        const { direction, offsetX, offsetY, offsetAuto: auto } = this
        const { nudgeLeft: nl, nudgeTop: nt, nudgeRight: nr, nudgeBottom: nb } = this

        const horiz = direction.horiz === 'left'
            ? offsetX ? a.left - c.right + nl : a.right - c.right + nl + auto.horiz
            : offsetX ? a.right - c.left + nr : a.left - c.left + nr + auto.horiz
        const vert = direction.vert === 'top'
            ? offsetY ? a.top - c.bottom + nt : a.bottom - c.bottom + nt + auto.vert
            : offsetY ? a.bottom - c.top + nb : a.top - c.top + nb + auto.vert

        return { horiz, vert }
      },

      offsetAuto () {
        if (!this.auto) return { horiz: 0, vert: 0 }
        if (!this.dimensions.selected) return { horiz: this.nudgeXAuto, vert: this.nudgeYAuto }

        const { activator: a, content: c, selected: s, list } = this.dimensions
        const offsetBottom = list.height - s.height - s.offsetTop
        const scrollMiddle = (c.height - s.height) / 2
        const horiz = this.nudgeXAuto
        let vert = (a.height - c.height + this.nudgeYAuto) / 2

        vert += s.offsetTop < scrollMiddle ? scrollMiddle - s.offsetTop : 0
        vert += offsetBottom < scrollMiddle ? offsetBottom - scrollMiddle : 0

        return { horiz, vert }
      },

      screenDistance () {
        const { activator: a } = this.dimensions
        const { innerHeight: innerH, innerWidth: innerW } = this.window
        const distance = {}

        distance.top = this.offsetY ? a.top : a.bottom
        distance.left = this.offsetX ? a.left : a.right
        distance.bottom = this.offsetY ? innerH - a.bottom : innerH - a.top
        distance.right = this.offsetX ? innerW - a.right : innerW - a.left
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

        const horiz = this.auto && left + c.width > this.window.innerWidth
            ? (left + c.width) - this.window.innerWidth
            : this.auto && left < 0
              ? left
              : 0
        const vert = this.auto && top + c.height > this.window.innerHeight
            ? (top + c.height) - this.window.innerHeight
            : this.auto && top < 0
              ? top
              : 0

        return { horiz, vert }
      }
    },

    methods: {
      activate () {
        this.window = window
        this.setDirection()
        this.updatePosition()
      },

      updatePosition () {
        this.updateDimensions()

        const { horiz, vert } = this.direction
        const { offset, screenOverflow } = this

        const left = horiz === 'left' ? 'auto' : `${offset.horiz - screenOverflow.horiz}px`
        const top = vert === 'top' ? 'auto' : `${offset.vert - screenOverflow.vert}px`
        const right = horiz === 'right' ? 'auto' : `${-offset.horiz - screenOverflow.horiz}px`
        const bottom = vert === 'bottom' ? 'auto' : `${-offset.vert - screenOverflow.vert}px`

        this.setContentPosition({ left, top, right, bottom })
        this.flipFix()
      },

      setContentPosition (position) {
        this.$refs.content.style.top = position.top
        this.$refs.content.style.left = position.left
        this.$refs.content.style.bottom = position.bottom
        this.$refs.content.style.right = position.right
      },

      flipFix () {
        const { auto, screenDistance } = this
        const { content: c } = this.dimensions
        let { horiz, vert } = this.direction

        // Flip direction, if needed, to where there's more room from the window edge.
        horiz = !auto && c.width > screenDistance[horiz] ? screenDistance.horizMaxDir : horiz
        vert = !auto && c.height > screenDistance[vert] ? screenDistance.vertMaxDir : vert

        if (horiz === this.direction.horiz && vert === this.direction.vert) return

        this.setDirection(horiz, vert)
        this.updatePosition(false)
      },

      setDirection (horiz = '', vert = '') {
        this.direction = {
          horiz: horiz || (this.left && !this.auto ? 'left' : 'right'),
          vert: vert || (this.top && !this.auto ? 'top' : 'bottom')
        }

        // On every direction change, we must reset/reorientate position.
        const top = this.direction.vert === 'top' ? 'auto' : '0px'
        const left = this.direction.vert === 'left' ? 'auto' : '0px'
        const bottom = this.direction.vert === 'bottom' ? 'auto' : '0px'
        const right = this.direction.vert === 'right' ? 'auto' : '0px'

        this.setContentPosition({ left, top, right, bottom })
      },

      updateDimensions () {
        this.sneakPeek()
        this.updateMaxMin()

        const { activator: a, content: c } = this.$refs

        // Let the DOM compute dimensions.
        this.dimensions = {
          'activator': a.children ? this.measure(a.children[0]) : this.measure(a),
          'content': this.measure(c),
          'list': this.measure(c, '.list'),
          'selected': this.measure(c, '.list__tile--active', 'parent')
        }

        this.fixOffscreen()
        this.updateScroll()
        this.sneakPeek(false)
      },

      updateMaxMin () {
        const { $el, $refs, maxHeight, auto, nudgeXAuto: nudgeX } = this

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
        return { top, left, bottom, right, width, height, offsetTop: el.offsetTop }
      },

      sneakPeek (on = true) {
        const originalDisplay = this.$refs.content.style.display

        if (on) {
          this.$refs.content.style.opacity = 0
          this.$refs.content.style.display = 'inline-block'
        } else {
          this.$refs.content.style.display = originalDisplay
          this.$refs.content.style.opacity = null
        }
      }
    }
  }
</script>