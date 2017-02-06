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

      offset () {
        return {
          'top': this.offsetY ? -this.dimensions.activator.height : 0,
          'left': this.offsetX ? -this.dimensions.activator.width : 0,
          'bottom': this.offsetY ? this.dimensions.activator.height : 0,
          'right': this.offsetX ? this.dimensions.activator.width : 0
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
        this.minWidth = this.$el.clientWidth
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
        this.$refs.content.style.display = 'none'
      },

      updatePosition () {
        const { vertical, horizontal } = this.direction
        this.position.top = this.computePosition(vertical)
        this.position.left = this.computePosition(horizontal)
        this.fixOffScreen()
      },

      computeAuto (dir) {
        if (!this.isVertical(dir)) return 0

        const { activator, content, list, item } = this.dimensions
        const selected = this.$refs.content.querySelector('.list__tile--active')

        let offset = this.isReversed(dir)
          ? 0
          : (activator.height - content.height) / 2

        if (!selected) return offset

        const offsetTop = selected.parentElement.offsetTop
        const offsetBottom = list.height - item.height - offsetTop
        const scrollHeight = content.height - item.height
        const scrollToMiddle = scrollHeight / 2

        if (offsetTop < scrollToMiddle) offset += scrollToMiddle - offsetTop
        if (offsetBottom < scrollToMiddle) offset += offsetBottom - scrollToMiddle

        this.scrollToItem(dir, offsetTop, scrollHeight)

        // Todo: Temporary out-of-bound fix. Need to discuss.
        return this.isReversed(dir) ? 0 : offset
      },

      scrollToItem (dir, offsetTop, scrollHeight) {
        let scroll = offsetTop - (scrollHeight / 2)

        // Todo: Temporary out-of-bound fix. Need to discuss.
        if (this.isReversed(dir)) {
          scroll = dir === 'top' ? offsetTop - scrollHeight : offsetTop
        }

        this.$refs.content.scrollTop = scroll
      },

      computePosition (dir) {
        const { activator, content } = this.dimensions
        const isVertical = this.isVertical(dir)
        const coord = isVertical ? 'top' : 'left'
        const dimen = isVertical ? 'height' : 'width'
        const winScroll = isVertical ? window['pageYOffset'] : window['pageXOffset']
        const offset = this.auto ? this.computeAuto(dir) : this.offset[dir]

        // Adjust for 'top' or 'left' direction (inverse direction)
        const dirAdjust = this.isTopOrLeft(dir)
          ? activator[dimen] - content[dimen]
          : 0

        return activator[coord] + offset + dirAdjust + winScroll
      },

      fixOffScreen () {
        const content = this.dimensions.content
        const { vertical, horizontal } = this.direction
        const top = this.position.top - window['pageYOffset']
        const left = this.position.left - window['pageXOffset']

        if (top < 0 || top + content['height'] > window['innerHeight']) {
          this.position.top = this.computePosition(this.reverse(vertical))
        }

        if (left < 0 || left + content['width'] > window['innerWidth']) {
          this.position.left = this.computePosition(this.reverse(horizontal))
        }
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
      },

      reverse (dir) {
        if (dir === 'top') return 'bottom'
        if (dir === 'bottom') return 'top'
        if (dir === 'left') return 'right'
        if (dir === 'right') return 'left'
      }
    }
  }
</script>
