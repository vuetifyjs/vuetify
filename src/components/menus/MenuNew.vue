<template lang="pug">
  div(
    class="menu"
    v-click-outside
  )

    div(
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
        activator: null,
        content: null,
        position: {
          top: 0,
          left: 0
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
          'vertical': (this.bottom || this.auto) ? 'bottom' : 'top',
          'horizontal': (this.right || this.auto) ? 'right' : 'left'
        }
      },

      reverseDirection () {
        return {
          'vertical': this.direction === 'bottom' ? 'top' : 'bottom',
          'horizontal': this.direction === 'right' ? 'left' : 'right'
        }
      },

      styles () {
        return {
          top: `${this.offset.top}px`,
          left: `${this.offset.left}px`,
          maxHeight: isNaN(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`,
          minWidth: `${this.minWidth}px`
        }
      }
    },

    mounted () {
      // Move content to beginning of the document (easier to re-position later).
      document.body.insertBefore(this.$refs.content, document.body.firstChild)
    },

    methods: {
      /**
       * Activate
       *
       * @return {void}
       */
      activate () {
        this.isActive = true
        this.updateDimensions()
        this.updatePosition()
      },

      updateDimensions () {
        this.$refs.content.style.display = 'block'
        this.activator = this.$refs.activator.getBoundingClientRect()
        this.content = this.$refs.content.getBoundingClientRect()
      },

      updatePosition () {
        this.position.top = this.computePosition(this.direction.vertical)
        this.position.left = this.computePosition(this.direction.horizontal)
      },

      computeOffset (dir, amount = 0) {
        const offset = this.isVertical(dir) ? this.offsetY : this.offsetX
  
        if (!offset && !this.auto) return 0

        if (this.auto) return this.computeAutoOffset()

        return this.isBackward(dir) ? -amount : amount
      },

      computeAutoOffset () {
        // Scroll list item to the middle.
        const children = Array.from(this.$refs.content.getElementsByClassName('list__tile'))
        selected = null
        children.forEach((el, i) => {
          if (el.classList.contains('list__tile--active')) {
            // index = i
            selected = el
          }
        })
        console.log(selected)
        setTimeout(() => { this.$refs.content.scrollTop = selected.scrollTop }, 0)
        return 0
      },

      isVertical (dir) {
        return ['top', 'bottom'].includes(dir)
      },

      isBackward (dir) {
        return ['top', 'left'].includes(dir)
      },

      computePosition (dir, checkBounds = true) {
        const isVertical = this.isVertical(dir)
        const coord = isVertical ? 'top' : 'left'
        const dimen = isVertical ? 'height' : 'width'
        const inner = isVertical ? 'innerHeight' : 'innerWidth'
        const scroll = isVertical ? 'pageYOffset' : 'pageXOffset'
        const offset = this.computeOffset(dir, this.activator[dimen])

        // For left & top (aka "backward") directions we need to pull back the coordinates.
        const dirAdjust = this.isBackward(dir) ? this.activator[dimen] - this.content[dimen] : 0

        // Compute the new position.
        let pos = this.activator[coord] + offset + dirAdjust + window[scroll]

        // Flip direction if menu appears over the screen edge.
        if (pos - window[scroll] < 0 || pos - window[scroll] + this.content[dimen] > window[inner]) {
          pos = checkBounds ? this.computePosition(this.reverseDirection[dir], false) : pos
        }

        return pos
      }
    }
  }
</script>