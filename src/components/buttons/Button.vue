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
      block: Boolean,

      flat: Boolean,

      floating: Boolean,

      icon: Boolean,

      large: Boolean,

      outline: Boolean,

      primary: Boolean,

      raised: {
        type: Boolean,
        default: true
      },

      round: Boolean,

      secondary: Boolean,

      small: Boolean,

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
          'btn--raised': this.raised,
          'btn--round': this.round,
          'btn--small': this.small
        }
      }
    }
  }
</script>