<template lang="pug">
  component(
    v-bind:is="computedTransition"
  )
    div(
      class="slider__item"
      v-bind:class="{ 'reverse': reverse }"
      v-bind:style="styles"
      v-bind:img="img"
      v-show="active"
    )
      img(
        v-if="img"
        v-bind:src="src"
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

      img: {
        type: Boolean,
        default: false
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

      styles () {
        return {
          backgroundImage: this.img ? null : `url(${this.src})`
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