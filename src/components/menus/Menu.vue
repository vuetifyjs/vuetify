<template lang="pug">
  div(
    class="menu"
    v-click-outside
  )

    div(
      class="menu__activator"
      v-on:click="activate"
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

    computed: {
      direction () {
        return {
          'vert': (this.bottom || this.auto) ? 'bottom' : 'top',
          'horiz': (this.right || this.auto) ? 'right' : 'left'
        }
      },

      offset () {
        const { activator: a, content: c } = this.dimensions
        const { pageYOffset: pageY, pageXOffset: pageX } = window

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

      offscreen () {
        const { activator: a, content: c } = this.dimensions
        const top = a.top + this.offset[this.direction.vert] + this.autoOffset
        const left = a.left + this.offset[this.direction.horiz]
        const { pageYOffset: pageY, pageXOffset: pageX } = window
        const { innerHeight: innerH, innerWidth: innerW } = window

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
          top: a.top + this.offset[vert] + this.autoOffset + this.offscreen.vert,
          left: a.left + this.offset[horiz] + this.offscreen.horiz
        }
      },

      styles () {
        return {
          top: `${this.position.top}px`,
          left: `${this.position.left}px`,
          maxHeight: isNaN(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`,
          minWidth: `${this.minWidth}px`
        }
      }
    },

    mounted () {
      // Move content to beginning of the document (for more functionality).
      document.body.insertBefore(this.$refs.content, document.body.firstChild)
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

        this.minWidth = this.$el.clientWidth
        this.dimensions = {
          'activator': this.rect(this.$refs.activator),
          'content': this.rect(this.$refs.content),
          'list': this.rect(this.$refs.content, '.list'),
          'selected': this.rect(this.$refs.content, '.list__tile--active', 'parent')
        }

        this.updateScroll()
        this.sneakPeekOff()
      },

      updateScroll () {
        if (!(this.auto && this.dimensions.selected)) return

        const { content: c, selected: s } = this.dimensions
        const scrollMiddle = (c.height - s.height) / 2

        this.$refs.content.scrollTop = s.offsetTop - scrollMiddle + this.offscreen.vert
      },

      // Utils
      // ====================

      rect (el, selector, getParent = false) {
        el = selector ? el.querySelector(selector) : el
        el = el && getParent ? el.parentElement : el

        return el
          ? Object.assign(el.getBoundingClientRect(), { 'offsetTop': el.offsetTop })
          : null
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
