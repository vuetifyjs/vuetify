<template lang="pug">
  button(
    class="btn"
    v-bind:class="classes"
    v-bind:type="type"
    v-ripple="ripple"
  )
    //- span(class="btn__content")
    slot
    //- span(class="btn__loading" v-if="loading")
    //-   slot(name="loader")
    //-   v-progress-circular(indeterminate v-if="!$slots['loader']")
</template>

<script>
  import Contextualable from '../../mixins/contextualable'

  export default {
    name: 'button',

    mixins: [Contextualable],
    
    props: {
      block: Boolean,

      dark: Boolean,

      flat: Boolean,

      floating: Boolean,

      icon: Boolean,

      large: Boolean,

      loading: Boolean,

      outline: Boolean,

      raised: {
        type: Boolean,
        default: true
      },

      ripple: {
        type: [Boolean, Object],
        default: false
      },

      round: Boolean,

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
          'btn--dark': this.dark,
          'btn--floating': this.floating,
          'btn--icon': this.icon,
          'btn--large': this.large,
          'btn--loading': this.loading,
          'btn--outline': this.outline,
          'btn--raised': this.raised,
          'btn--round': this.round,
          'btn--small': this.small,
          'primary': this.primary,
          'secondary': this.secondary,
          'success': this.success,
          'info': this.info,
          'warning': this.warning,
          'error': this.error,
        }
      }
    }
  }
</script>