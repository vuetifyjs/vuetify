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
        top: 0,
        left: 0
      }
    },

    props: {

    },

    computed: {
      classes () {
        return {
        }
      },

      styles () {
        return {
          'top': `${this.top}px`,
          'left': `${this.left}px`
        }
      }
    },

    mounted () {

    },

    methods: {

      activate () {
        this.isActive = true
        this.top = this.getPosition('height')
        this.left = this.getPosition('width')
      },

      getActivatorBox () {
        return this.$refs.activator.children[0].getBoundingClientRect()
      },

      getContentBox () {
        const content = this.$refs.content

        // Turn on display so we can get the dimensions
        content.style.display = 'block'
        const box = content.getBoundingClientRect()
        content.style.display = 'none'

        return box
      },

      getPosition (dimension) {
        const activatorBox = this.getActivatorBox()
        const contentBox = this.getContentBox()
        const winDimension = window[dimension === 'width' ? 'innerWidth' : 'innerHeight']

        // Flip opposite direction when offscreen
        let position = activatorBox[dimension === 'width' ? 'left' : 'top']
        if (position + contentBox[dimension] > winDimension && contentBox[dimension] < position) {
          position -= contentBox[dimension] - activatorBox.box[dimension]
        }

        return position + window[dimension === 'width' ? 'scrollX' : 'scrollY']
      }
    }
  }
</script>