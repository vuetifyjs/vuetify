<template lang="pug">
  div(
    class="alert"
    v-bind:class="classes"
    v-show="value"
  )
    v-icon(class="alert__icon") {{ icon }}
    div
      slot
    a(
      class="alert__close"
      href="#!"
      v-if="close"
      v-on:click.prevent="$emit('input', false)"
    )
      v-icon(right) cancel
</template>

<script>
  export default {
    name: 'alert',
    
    props: {
      close: Boolean,

      error: Boolean,

      info: Boolean,

      success: Boolean,
      
      warning: Boolean,

      value: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      classes () {
        return {
          'alert--close': this.close,
          'alert--error': this.error,
          'alert--info': this.info,
          'alert--success': this.success,
          'alert--warning': this.warning,
        }
      },

      icon () {
        switch (true) {
          case this.error:
            return 'warning'
          break
          case this.info:
            return 'info'
          break
          case this.success:
            return 'check_circle'
          break
          case this.warning:
            return 'priority_high'
          break
        }
      }
    }
  }
</script>