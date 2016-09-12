<template lang="pug">
  button(
    class="btn"
    v-bind:class="classes"
    v-bind:type="type"
  )
    slot
</template>

<script>
  export default {
    name: 'button',
    
    props: {
      block: {
        type: Boolean,
        default: false
      },

      flat: {
        type: Boolean,
        default: false
      },

      floating: {
        type: Boolean,
        default: false
      },

      icon: {
        type: Boolean,
        default: false
      },

      large: {
        type: Boolean,
        default: false
      },

      outline: {
        type: Boolean,
        default: false
      },

      primary: {
        type: Boolean,
        default: false
      },

      round: {
        type: Boolean,
        default: false
      },

      secondary: {
        type: Boolean,
        default: false
      },

      small: {
        type: Boolean,
        default: false
      },

      type: {
        type: String,
        default: 'button'
      }
    },

    computed: {
      classes () {
        return {
          'btn--block': this.block,
          'btn--flat': this.flat,
          'btn--floating': this.floating,
          'btn--icon': this.icon,
          'btn--large': this.large,
          'btn--outline': this.outline,
          'primary white--text': this.primary,
          'btn--round': this.round,
          'secondary white--text': this.secondary,
          'btn--small': this.small
        }
      }
    }
  }
</script>