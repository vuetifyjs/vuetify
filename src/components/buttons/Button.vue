<template lang="pug">
  button(
    class="btn"
    v-bind:class="classes"
    v-bind:type="type"
    v-ripple="ripple"
  )
    span(class="btn__content")
      slot
    span(
      class="btn__loading" 
      v-if="loading"
    )
      slot(name="loader")
      v-progress-circular(
        indeterminate 
        v-if="!$slots['loader']"
        size="26"
      )
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

      menu: Boolean,

      outline: Boolean,

      progress: Boolean,

      raised: {
        type: Boolean,
        default: true
      },

      ripple: {
        type: [Boolean, Object],
        default: true
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
          'btn': true,
          'btn--block': this.block,
          'btn--dark': this.dark,
          'btn--menu': this.menu,
          'btn--flat': this.flat || this.menu,
          'btn--floating': this.floating || this.progress,
          'btn--icon': this.icon,
          'btn--large': this.large,
          'btn--loader': this.loading,
          'btn--outline': this.outline,
          'btn--progress': this.progress,
          'btn--raised': this.raised,
          'btn--round': this.round,
          'btn--small': this.small,
          'primary': this.primary,
          'secondary': this.secondary,
          'success': this.success,
          'info': this.info,
          'warning': this.warning,
          'error': this.error
        }
      }
    }
  }
</script>