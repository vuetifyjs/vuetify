<template lang="pug">
  transition(
    v-bind:name="computedTransition"
  )
    div(
      class="carousel__item"
      v-bind:class="{ 'reverse': reverse }"
      v-bind:style="styles"
      v-show="active"
    )
      slot
</template>

<script>
  export default {
    name: 'carousel-item',

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
        default: 'tab-transition'
      },

      reverseTransition: {
        type: String,
        default: 'tab-reverse-transition'
      }
    },

    computed: {
      computedTransition () {
        return this.reverse ? this.reverseTransition : this.transition
      },

      styles () {
        return {
          backgroundImage: `url(${this.src})`
        }
      }
    },

    methods: {
      open (id, reverse) {
        this.active = this._uid === id
        this.reverse = reverse
      }
    }
  }
</script>
