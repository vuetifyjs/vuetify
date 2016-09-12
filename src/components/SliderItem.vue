<template lang="pug">
    div(
      class="slider__item"
      v-bind:class="classes"
      v-bind:style="styles"
    )
      h1(
        v-html="item.text"
      )
</template>

<script>
  export default {
    name: 'slider-item',

    props: {
      current: {
        type: Boolean,
        default: false
      },

      item: {
        type: Object,
        required: true
      },

      past: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'slider__item--active': this.current,
          'slider__item--left': this.past
        }
      },

      styles () {
        return { 
          backgroundImage: `url(${this.item.bg})`
        }
      }
    }
  }
</script>