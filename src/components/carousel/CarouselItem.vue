<template lang="pug">
  component(
    v-bind:is="computedTransition"
  )
    div(
      class="slider__item"
      v-bind:class="{ 'reverse': reverse }"
      v-bind:style="styles"
      v-show="active"
    )
      slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'carousel-item',
 
    mixins: [Eventable],

    data () {
      return {
        active: false,
        reverse: false
      }
    },

    props: {
      src: {
        type: String,
        required: true
      },

      transition: {
        type: String,
        default: 'v-tab-transition'
      },

      reverseTransition: {
        type: String,
        default: 'v-tab-reverse-transition'
      }
    },

    computed: {
      computedTransition () {
        return this.reverse ? this.reverseTransition : this.transition
      },

      events () {
        return [
          ['carousel', this.$parent._uid, this.open, { deep: true }]
        ]
      },

      styles () {
        return {
          backgroundImage: `url(${this.src})`
        }
      }
    },

    methods: {
      open (state) {
        this.active = this._uid === state.current
        this.reverse = state.reverse
      }
    }
  }
</script>