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
      default: Boolean,
      flat: Boolean,
      floating: Boolean,
      icon: Boolean,
      large: Boolean,
      light: Boolean,
      loading: Boolean,
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
          'btn--default': this.default,
          'btn--flat': this.flat,
          'btn--floating': this.floating,
          'btn--icon': this.icon,
          'btn--large': this.large,
          'btn--light': this.light && !this.dark,
          'btn--loader': this.loading,
          'btn--outline': this.outline,
          'btn--raised': this.raised,
          'btn--round': this.round,
          'btn--small': this.small,
          'primary': this.primary && !this.outline,
          'secondary': this.secondary && !this.outline,
          'success': this.success && !this.outline,
          'info': this.info && !this.outline,
          'warning': this.warning && !this.outline,
          'error': this.error && !this.outline,
          'primary--text': this.primary && this.outline,
          'secondary--text': this.secondary && this.outline,
          'success--text': this.success && this.outline,
          'info--text': this.info && this.outline,
          'warning--text': this.warning && this.outline,
          'error--text': this.error && this.outline
        }
      }
    }
  }
</script>