<template lang="pug">
  div(
    class="parallax__content"
    v-bind:style="styles"
  )
    slot
</template>

<script>
  import Translatable from '../mixins/translatable'

  export default {
    name: 'parallax-content',

    mixins: [
      Translatable
    ],
    
    data () {
      return {
        height: null,
        opacity: 1
      }
    },

    props: {
      opacityOffset: {
        type: [String, Number],
        default: .7
      }
    },

    computed: {
      styles () {
        return {
          opacity: this.opacity,
          transform: `translate3d(0, ${this.parallax - (this.height * .35)}px, 0)`
        }
      }
    },

    mounted () {
    },

    methods: {
      init () {
        this.$vuetify.bus.sub('parallax:ready', () => {
          this.height = this.$el.closest('.parallax').clientHeight
          this.translate()
          this.listeners()
        })
      },

      elOffsetTop () {
        return this.$el.closest('.parallax').offsetTop
      },

      objHeight () {
        return this.$el.previousSibling.naturalHeight
      },

      translated () {
        this.opacity = (
          (this.height * this.opacityOffset) / this.parallax - this.opacityOffset * 1.7
        )
      }
    }
  }
</script>