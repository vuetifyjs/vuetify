<template lang="pug">
    div(
      class="slider__item"
      v-bind:style="styles"
    )
      slot
</template>

<script>
  export default {
    name: 'slider-item',

    data () {
      return {
        order: 0
      }
    },

    props: {
      src: {
        type: String,
        required: true
      }
    },

    computed: {
      styles () {
        return { 
          backgroundImage: `url(${this.src})`,
          order: this.order
        }
      }
    }
  }
</script>