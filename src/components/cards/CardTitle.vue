<template lang="pug">
  div(
    class="card__title"
    v-bind:class="classes"
    v-bind:style="styles"
  )
    slot
</template>

<script>
  export default {
    name: 'card-title',
    
    props: {
      height: {
        type: String,
        default: 'auto'
      },

      img: String
    },

    computed: {
      classes () {
        return {
          'card__title--img': this.img
        }
      },

      styles () {
        let styles = {
          height: this.height
        }

        if (this.img) {
          styles.background = `url(${this.img}) center center / cover no-repeat`
        }
        
        return styles
      }
    }
  }
</script>