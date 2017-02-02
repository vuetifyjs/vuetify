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

    },

    methods: {

      activate () {
        this.isActive = true
        this.origin.top = this.computeOrigin('top')
        this.origin.left = this.computeOrigin('left')
      },

      getActivatorDimensions () {
        // Todo: check if activators exist
        var dimensions = this.$refs.activator.children[0].getBoundingClientRect()
        dimensions.offsetX = this.offsetX ? dimensions.width : 0
        dimensions.offsetY = this.offsetY ? dimensions.height : 0
        return dimensions
      },

      getContentDimensions () {
        const el = this.$refs.content

        // Turn on display so we can get the dimensions
        el.style.display = 'block'
        const dimensions = el.getBoundingClientRect()
        el.style.display = 'none'

        return dimensions
      },

      computeOrigin (coord) {
        const dimension = coord === 'left' ? 'width' : 'height'
        const inner = coord === 'left' ? 'innerWidth' : 'innerHeight'
        const scroll = coord === 'left' ? 'scrollX' : 'scrollY'
        const offset = coord === 'left' ? 'offsetX' : 'offsetY'
        const activator = this.getActivatorDimensions()
        const content = this.getContentDimensions()

        // Flip opposite direction when offscreen
        let position = activator[coord] + activator[offset]
        if (position + content[dimension] > window[inner] && content[dimension] < position) {
          position -= content[dimension] - activator[dimension]
        }

        return position + window[scroll]
      }
    }
  }
</script>