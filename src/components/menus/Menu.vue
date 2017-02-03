<template lang="pug">
  div(
    class="menu" 
    ref="menu"
    v-click-outside 
  )

    div(v-on:click="activate" ref="activator")
      slot(name="activator")

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
  import toggleable from '../../mixins/toggleable'

  export default {
    name: 'menu',
    mixins: [toggleable],

    data () {
      return {
        origin: {
          top: 0,
          left: 0
        }
      }
    },

    props: {
      top: Boolean,
      left: Boolean,
      bottom: Boolean,
      right: Boolean,
      offsetX: Boolean,
      offsetY: Boolean
    },

    computed: {
      classes () {
        return {
        }
      },

      styles () {
        return {
          'top': `${this.origin.top}px`,
          'left': `${this.origin.left}px`
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
        this.$refs.content.style.display = 'block'
        this.origin.top = this.computeOrigin('top', this.top)
        this.origin.left = this.computeOrigin('left', this.left)
      },

      /**
       * Get Activator Dimensions
       *
       * @return {ClientRect}
       */
      getActivatorDimensions () {
        const el = this.$refs.activator.children[0]  // <-- Todo: Check if activator exists.
        return el.getBoundingClientRect()
      },

      /**
       * Get Offset
       *
       * Computes the top or left offset of menu content
       *
       * @param {string} coord Set to 'top' or 'left' to compute top or left offset.
       * @param {boolean} isOppositeDirection Set to true for top or left menu direction.
       * @param {boolean} amount Set to the amount you want to offset.
       * @return {integer}
       */
      getOffset (coord, isOppositeDirection, amount) {
        const offset = coord === 'left' ? this.offsetX : this.offsetY
        if (!offset) return 0
        return isOppositeDirection ? -amount : amount
      },

      /**
       * Compute Origin
       *
       * Computes the top or left position of menu content.
       *
       * @param {string} coord Set to 'top' or 'left' to compute top or left offset.
       * @param {boolean} isOppositeDirection Set to true for top or left menu direction.
       * @param {boolean} checkBounds Set to true if you want to check/fix menu when it appears
       *    over the screen edge.
       * @return {integer}
       */
      computeOrigin (coord, isOppositeDirection, checkBounds = true) {
        const dimension = coord === 'left' ? 'width' : 'height'
        const inner = coord === 'left' ? 'innerWidth' : 'innerHeight'
        const scroll = coord === 'left' ? 'pageXOffset' : 'pageYOffset'
        const activator = this.getActivatorDimensions()
        const content = this.$refs.content.getBoundingClientRect()
        const offset = this.getOffset(coord, isOppositeDirection, activator[dimension])

        // For left & top (aka "opposite") directions we need to pull back the coordinates.
        const directionAdjust = isOppositeDirection ? activator[dimension] - content[dimension] : 0

        // Compute the origin.
        let pos = activator[coord] + offset + directionAdjust + window[scroll]

        // Flip direction if menu appears over the screen edge.
        if (pos - window[scroll] < 0 || pos - window[scroll] + content[dimension] > window[inner]) {
          pos = checkBounds ? this.computeOrigin(coord, !isOppositeDirection, false) : pos
        }

        return pos
      }
    }
  }
</script>

