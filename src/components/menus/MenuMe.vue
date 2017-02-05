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
        const isVertical = this.isVertical(dir)
        const offset = isVertical ? this.offsetY : this.offsetX

        if (this.auto) return isVertical ? this.computeAutoOffset(dir) : 0
        if (offset) return this.isTopOrLeft(dir) ? -amount : amount

        return 0
      },

      getEl (className, fromEl = document) {
        const query = fromEl.getElementsByClassName(className)
        return query.length ? query[0] : null
      },

      computeAutoOffset (dir) {
        const contentEl = this.$refs.content
        const itemH = this.getEl('list__item', contentEl).getBoundingClientRect().height
        const listH = this.getEl('list', contentEl).getBoundingClientRect().height - itemH
        const scrollH = this.content.height - itemH
        const scrollToMiddle = scrollH / 2

        let offset = -(this.content.height - this.activator.height) / 2
        let selected = this.getEl('list__tile--active', contentEl)

        if (selected) {
          selected = selected.parentElement
          const offsetTop = selected.offsetTop
          const offsetBottom = listH - offsetTop

          if (offsetTop < scrollToMiddle) offset += scrollToMiddle - offsetTop
          if (offsetBottom < scrollToMiddle) offset += offsetBottom - scrollToMiddle

          this.autoScroll(dir, offsetTop, scrollH)
        }

        offset = this.isReverse(dir) ? 0 : offset

        console.log(offset)

        return offset
      },

      autoScroll (dir, offsetTop, scrollHeight) {
        let scroll = offsetTop - (scrollHeight / 2)

        if (this.isReverse(dir)) {
          scroll = dir === 'top' ? 0 : offsetTop + scrollHeight
        }

        setTimeout(() => {
          this.$refs.content.scrollTop = scroll
        }, 500)
      },

      isVertical (dir) {
        return dir === 'top' || dir === 'bottom'
      },

      isTopOrLeft (dir) {
        return ['top', 'left'].includes(dir)
      },

      getReverse (dir) {
        if (this.isVertical) {
          return this.direction['vertical'] === 'top' ? 'bottom' : 'top'
        }
        return this.direction['horizontal'] === 'left' ? 'right' : 'left'
      },

      isReverse (dir) {
        return this.isVertical(dir)
          ? this.direction['vertical'] !== dir
          : this.direction['horizontal'] !== dir
      },

      computePosition (dir, checkBounds = true) {
        const isVertical = this.isVertical(dir)
        const coord = isVertical ? 'top' : 'left'
        const dimen = isVertical ? 'height' : 'width'
        const inner = isVertical ? 'innerHeight' : 'innerWidth'
        const scroll = isVertical ? 'pageYOffset' : 'pageXOffset'
        const offset = this.computeOffset(dir, this.activator[dimen])

        // For left & top directions we need to pull back the coordinates.
        const dirAdjust = this.isTopOrLeft(dir) ? this.activator[dimen] - this.content[dimen] : 0

        // Compute the new position.
        let pos = this.activator[coord] + offset + dirAdjust + window[scroll]

        // Flip direction if menu appears over the screen edge.
        if (pos - window[scroll] < 0 || pos - window[scroll] + this.content[dimen] > window[inner]) {
          pos = checkBounds ? this.computePosition(this.getReverse(dir), false) : pos
        }

        return pos
      }
    }
  }
</script>
