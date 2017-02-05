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
        dimensions: {
          activator: {},
          content: {},
          list: {},
          item: {}
        },
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

      activate () {
        this.isActive = true
        this.updateDimensions()
        this.updatePosition()
      },

      updateDimensions () {
        this.$refs.content.style.display = 'block'
        this.dimensions = {
          'activator': this.rect(this.$refs.activator),
          'content': this.rect(this.$refs.content),
          'list': this.rect(this.$refs.content, '.list'),
          'item': this.rect(this.$refs.content, '.list__item')
        }
      },

      updatePosition () {
        const { vertical, horizontal } = this.direction
        this.position.top = this.computePosition(vertical)
        this.position.left = this.computePosition(horizontal)
      },

      computeOffset (dir, amount = 0) {
        const isVertical = this.isVertical(dir)
        const isAuto = this.auto
        const isOffset = isVertical ? this.offsetY : this.offsetX

        if (isAuto) return isVertical ? this.computeAutoOffset(dir) : 0
        if (isOffset) return this.isTopOrLeft(dir) ? -amount : amount
        return 0
      },

      computeAutoOffset (dir) {
        const { activator, content, list, item } = this.dimensions
        const isReversed = this.isReversed(dir)
        const selected = this.$refs.content.querySelector('.list__tile--active')
        let offset = (activator.height - content.height) / 2

        if (!selected) return isReversed ? 0 : offset

        const scrollHeight = content.height - item.height
        const scrollToMiddle = scrollHeight / 2
        const offsetTop = selected.parentElement.offsetTop
        const offsetBottom = list.height - item.height - offsetTop

        if (offsetTop < scrollToMiddle) offset += scrollToMiddle - offsetTop
        if (offsetBottom < scrollToMiddle) offset += offsetBottom - scrollToMiddle

        this.scrollToItem(dir, offsetTop, scrollHeight)

        // Todo: Temporary out-of-bound fix. Need to discuss.
        return isReversed ? 0 : offset
      },

      scrollToItem (dir, offsetTop, scrollHeight) {
        let scroll = offsetTop - (scrollHeight / 2)

        // Todo: Temporary out-of-bound fix. Need to discuss.
        if (this.isReversed(dir)) {
          scroll = dir === 'top' ? offsetTop - scrollHeight : offsetTop
        }

        this.$refs.content.scrollTop = scroll
      },

      computePosition (dir, fixBounds = true) {
        const { activator, content } = this.dimensions
        const isVertical = this.isVertical(dir)
        const coord = isVertical ? 'top' : 'left'
        const dimen = isVertical ? 'height' : 'width'
        const winInner = isVertical ? window['innerHeight'] : window['innerWidth']
        const winScroll = isVertical ? window['pageYOffset'] : window['pageXOffset']
        const offset = this.computeOffset(dir, activator[dimen])

        // Adjust for Top or Left direction to push the coordinates back.
        const dirAdjust = this.isTopOrLeft(dir) ? activator[dimen] - content[dimen] : 0

        // Compute the new position.
        let pos = activator[coord] + offset + dirAdjust + winScroll

        // Reverse direction if menu appears over the screen edge.
        if (this.isOutOfBounds(pos, content[dimen], winScroll, winInner)) {
          pos = fixBounds ? this.computePosition(this.reverse(dir), false) : pos
        }

        return pos
      },

      isOutOfBounds (pos, content, winScroll, winInner) {
        pos -= winScroll
        return pos < 0 || pos + content > winInner
      },

      reverse (dir) {
        if (this.isVertical(dir)) {
          return this.direction['vertical'] === 'top' ? 'bottom' : 'top'
        }
        return this.direction['horizontal'] === 'left' ? 'right' : 'left'
      },

      isReversed (dir) {
        return this.isVertical(dir)
          ? this.direction['vertical'] !== dir
          : this.direction['horizontal'] !== dir
      },

      // Utils
      // ====================

      rect (el, classSelector = '') {
        if (!classSelector) return el.getBoundingClientRect()
        const descendant = el.querySelector(classSelector)
        return descendant ? descendant.getBoundingClientRect() : null
      },

      isVertical (dir) {
        return ['top', 'bottom'].includes(dir)
      },

      isTopOrLeft (dir) {
        return ['top', 'left'].includes(dir)
      }
    }
  }
</script>