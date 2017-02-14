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
          activator: { top: 0, left: 0, bottom: 0, right: 0, height: 0, width: 0, offsetTop: 0 },
          content: { top: 0, left: 0, bottom: 0, right: 0, height: 0, width: 0, offsetTop: 0 },
          list: null,
          selected: null
        },
        minWidth: 'auto'
      }
    },

    props: {
      auto: Boolean,
      autoVAdjust: {
        type: Number,
        default: 16
      },
      autoHAdjust: {
        type: Number,
        default: 9
      },
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
        const { offsetY, offsetX, edgeDistance: edge } = this
        const { content: c } = this.dimensions
        let vert = (this.bottom || this.auto) ? 'bottom' : 'top'
        let horiz = (this.right || this.auto) ? 'right' : 'left'

        // Flip direction, if needed, to where there's more room from the screen edge.
        vert = offsetY && c.height > edge[vert] ? edge.maxVertDir : vert
        horiz = offsetX && c.width > edge[horiz] ? edge.maxHorizDir : horiz

        return { vert, horiz }
      },

      offset () {
        const { activator: a, content: c } = this.dimensions
        const { pageYOffset: pageY, pageXOffset: pageX } = this.window

        return {
          'top': this.offsetY ? -c.height + pageY : a.height - c.height + pageY,
          'left': this.offsetX ? -c.width + pageX : a.width - c.width + pageX,
          'bottom': this.offsetY ? a.height + pageY : pageY,
          'right': this.offsetX ? a.width + pageX : pageX
        }
      },

      autoOffset () {
        if (!(this.auto && this.dimensions.selected)) return 0

        const { activator: a, content: c, selected: s, list } = this.dimensions
        const offsetBottom = list.height - s.height - s.offsetTop
        const scrollMiddle = (c.height - s.height) / 2

        let auto = (a.height - c.height) / 2
        if (s.offsetTop < scrollMiddle) auto += scrollMiddle - s.offsetTop
        if (offsetBottom < scrollMiddle) auto += offsetBottom - scrollMiddle

        return auto
      },

      edgeDistance () {
        const { activator: a } = this.dimensions
        const edge = {}

        edge.top = a.top
        edge.bottom = this.window.innerHeight - a.bottom
        edge.left = a.left
        edge.right = this.window.innerWidth - a.right
        edge.maxVert = edge.top > edge.bottom ? edge.top : edge.bottom
        edge.maxHoriz = edge.left > edge.right ? edge.left : edge.right
        edge.maxVertDir = edge.top > edge.bottom ? 'top' : 'bottom'
        edge.maxHorizDir = edge.left > edge.right ? 'left' : 'right'

        return edge
      },

      offscreen () {
        if (this.offsetX || this.offsetY) return { vert: 0, horiz: 0 }

        const { activator: a, content: c } = this.dimensions
        const top = a.top + this.offset[this.direction.vert] + this.autoOffset
        const left = a.left + this.offset[this.direction.horiz]
        const { pageYOffset: pageY, pageXOffset: pageX } = this.window
        const { innerHeight: innerH, innerWidth: innerW } = this.window

        return {
          'vert': top + c.height - pageY > innerH
            ? innerH - (top + c.height - pageY)
            : top - pageY < 0
              ? pageY - top
              : 0,
          'horiz': left + c.width - pageX > innerW
            ? innerW - (left + c.width - pageX)
            : left - pageX < 0
              ? pageX - left
              : 0
        }
      },

      position () {
        const { vert, horiz } = this.direction
        const a = this.dimensions.activator

        return {
          top: a.top + this.offset[vert] + this.autoOffset + this.offscreen.vert - (this.auto ? this.autoHAdjust : 0),
          left: a.left + this.offset[horiz] + this.offscreen.horiz - (this.auto ? this.autoVAdjust : 0)
        }
      },

      styles () {
        return {
          top: `${this.position.top}px`,
          left: `${this.position.left}px`
        }
      }
    },

    mounted () {
      // Move content to beginning of the document (for more functionality).
      document.body.appendChild(this.$refs.content)
    },

    methods: {
      activate () {
        // Get measurements before transitions mess with them.
        this.updateDimensions()

        this.$nextTick(() => {
          this.isActive = true
        })
      },

      updateDimensions () {
        this.sneakPeek()

        // Set minWidth & maxHeight.
        const { $el, $refs, maxHeight, auto, autoVAdjust } = this
        $refs.content.style.minWidth = `${$el.clientWidth + (auto ? autoVAdjust : 0)}px`
        $refs.content.style.maxHeight = null
        $refs.content.style.maxHeight = isNaN(maxHeight) ? maxHeight : `${maxHeight}px`

        // Let the DOM compute dimensions.
        this.window = window
        this.dimensions = {
          'activator': $refs.activator.children
            ? this.rect($refs.activator.children[0])
            : this.rect($refs.activator),
          'content': this.rect($refs.content),
          'list': this.rect($refs.content, '.list'),
          'selected': this.rect($refs.content, '.list__tile--active', 'parent')
        }

        // If offsetY, reduce height to the max vertical distance to a screen edge.
        const { edgeDistance: edge } = this
        const { vert } = this.direction
        if (this.offsetY && this.dimensions.content.height > edge[vert]) {
          $refs.content.style.maxHeight = `${edge.maxVert}px`
          this.dimensions.content.height = $refs.content.getBoundingClientRect().height
        }

        this.updateScroll()
        this.sneakPeekOff()
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

      rect (el, selector, getParent = false) {
        el = selector ? el.querySelector(selector) : el
        el = el && getParent ? el.parentElement : el

        if (!el) return null
        const { top, bottom, right, left, width, height } = el.getBoundingClientRect()
        return { top, bottom, right, left, width, height, offsetTop: el.offsetTop }
      },

      sneakPeek () {
        this.$refs.content.style.opacity = 0
        this.$refs.content.style.display = 'inline-block'
      },

      sneakPeekOff () {
        this.$refs.content.style.display = 'none'
        this.$refs.content.style.opacity = null
      }
    }
  }
</script>
