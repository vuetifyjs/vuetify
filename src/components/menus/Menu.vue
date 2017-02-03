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
        activatorDimensions: {},
        autoTop: null,
        contentDimensions: {},
        minWidth: 'auto',
        offset: {
          top: 0,
          left: 0
        }
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
      styles () {
        return {
          top: `${this.offset.top}px`,
          left: `${this.offset.left}px`,
          maxHeight: isNaN(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`,
          minWidth: `${this.minWidth}px`
        }
      }
    },

    methods: {
      /**
       * Activate
       *
       * @return {void}
       */
      activate () {
        const { top, left } = this.computeLocation()
        this.isActive = true
        this.minWidth = this.$el.clientWidth + (this.auto ? 20 : 0)
        if (this.auto) {
          const { top, scrollTop } = this.autoTop
          this.offset.top = top
          setTimeout(() => this.$refs.content.scrollTop = scrollTop, 0)
        } else {
          this.offset.top = top
        }
        this.offset.left = left - (this.auto ? 10 : 0)
      },

      autoHeight () {
        const children = Array.from(this.$refs.content.getElementsByClassName('list__tile'))
        const el = this.$refs.content
        let scrollTop = 0
        let top = 0
        let selected = {}
        let index = 0

        children.forEach((el, i) => {
          if (el.classList.contains('list__tile--active')) {
            index = i
            selected = el
          }
        })

        el.style.display = 'block'
        if (index < 2 || children.length < 4) {
          top = 8 + (children[0].clientHeight * index)
        } else if (index < children.length - 2) {
          top = el.clientHeight / 2 - 31
          scrollTop = 35 + ((index - 2) * selected.clientHeight)
        } else {
          const number = children.length - 2 === index ? 2 : 3

          top = (selected.clientHeight * number)
          scrollTop = el.scrollHeight
        }
        el.style.display = 'none'

        return {
          top: -top,
          scrollTop
        }
      },

      /**
       * Get Activator Dimensions
       *
       * @return {ClientRect}
       */
      getActivatorDimensions () {
        return {
          top: this.$refs.activator.offsetTop,
          left: this.$refs.activator.offsetLeft,
          width: this.$refs.activator.clientWidth,
          height: this.$refs.activator.clientHeight
        }
      },

      /**
       * Get Content Dimensions
       *
       * @return {ClientRect}
       */
      getContentDimensions () {
        const el = this.$refs.content

        el.style.display = 'block' // <-- Turn on display so we can get the dimensions.
        const dimensions = el.getBoundingClientRect()
        if (this.auto) {
          this.autoTop = this.autoHeight()
        }
        el.style.display = 'none'

        return dimensions
      },

      /**
       * Get Offset
       *
       * Computes the top or left offset of menu content
       *
       * @param {'top'|'left'} coord Designates whether to compute top or left offset.
       * @param {boolean} isDefaultDirection Set to true for bottom or right menu direction.
       * @param {boolean} amount Set to the amount you want to offset.
       * @return {integer}
       */
      getOffset (coord, isDefaultDirection, amount) {
        const offset = coord === 'left' ? this.offsetX : this.offsetY
        if (!offset) return 0
        return isDefaultDirection ? -amount : amount
      },

      /**
       * Compute Origin
       *
       * Computes the top or left position of menu content.
       *
       * @param {'top'|'left'} coord Designates whether to compute top or left position.
       * @param {boolean} isDefaultDirection Set to true for bottom or right menu direction.
       * @param {boolean} checkBounds Set to true if you want to check/fix menu when it appears
       *    over the screen edge.
       * @return {integer}
       */
      computeOrigin (coord, isDefaultDirection, checkBounds = true) {
        const dimension = coord === 'left' ? 'width' : 'height'
        const inner = coord === 'left' ? 'innerWidth' : 'innerHeight'
        const scroll = coord === 'left' ? 'scrollX' : 'scrollY'
        const activator = this.activatorDimensions
        const content = this.contentDimensions
        const offset = this.getOffset(coord, isDefaultDirection, activator[dimension])

        // For left & top (non-default) directions we need to pull back/up the coordinates.
        const directionAdjust = isDefaultDirection ? activator[dimension] - content[dimension] : 0

        // Compute the origin.
        let pos = activator[coord] + offset + directionAdjust

        // Flip direction if menu appears over the screen edge.
        // if (pos - window[scroll] < 0 || pos - window[scroll] + content[dimension] > window[inner]) {
        //   pos = checkBounds ? this.computeOrigin(coord, !isDefaultDirection, false) : pos
        // }

        return pos
      },

      computeLocation () {
        this.activatorDimensions = this.getActivatorDimensions()
        this.contentDimensions = this.getContentDimensions()

        return {
          top: this.computeOrigin('top', this.top),
          left: this.computeOrigin('left', this.left)
        }
      }
    }
  }
</script>