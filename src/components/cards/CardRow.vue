<template lang="pug">
  div(
    class="card__row"
    v-bind:class="classes"
    v-bind:style="styles"
  )
    slot
</template>

<script>
  export default {
    name: 'card-row',
    
    props: {
      actions: Boolean,

      height: {
        type: String,
        default: 'auto'
      },

      img: String
    },

    computed: {
      classes () {
        return {
          'card__row--actions': this.actions
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