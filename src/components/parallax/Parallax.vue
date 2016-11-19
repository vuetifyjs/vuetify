<template lang="pug">
  div(
    class="parallax"
    v-bind:style="{ minHeight: this.height + 'px' }"
  )
    div(class="parallax__image-container")
      img(
        class="parallax__image"
        v-bind:src="src"
        v-bind:style="styles"
        ref="img"
      )
      slot
</template>

<script>
  import Translatable from '../../mixins/translatable'

  export default {
    name: 'parallax',
    
    mixins: [
      Translatable
    ],

    props: {
      height: {
        type: [String, Number],
        default: 500
      },

      src: {
        type: String,
        required: true
      }
    },

    computed: {
      styles () {
        return {
          display: 'block',
          transform: `translate3d(-50%, ${this.parallax}px, 0)`
        }
      }
    },

    methods: {
      init () {
        if (this.$refs.img.complete) {
          console.log('here')
          this.translate()
          this.listeners()
          return this.$vuetify.bus.pub('parallax:ready')
        }
        
        this.$refs.img.addEventListener('load', () => {
          this.translate()
          this.listeners()
          this.$vuetify.bus.pub('parallax:ready')
        }, { once: true })
      },

      objHeight () {
        return this.$refs.img.naturalHeight
      },

      elOffsetTop () {
        return this.$el.offsetTop
      }
    }
  }
</script>