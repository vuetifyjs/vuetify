<template lang="pug">
  div(
    class="card"
    v-bind:class="classes"
    v-bind:style="styles"
  )
    slot
</template>

<script>
  export default {
    name: 'card',
    
    props: {
      height: {
        type: String,
        default: 'auto'
      },

      horizontal: {
        type: Boolean
      },

      img: {
        type: String
      }
    },

    computed: {
      classes () {
        return {
          'card--horizontal': this.horizontal
        }
      },

      styles () {
        let styles = {
          height: `${this.height}`
        }

        if (this.img) {
          styles.background = `url(${this.img}) center center / cover no-repeat`
        }

        return styles
      }
    }
  }
</script>