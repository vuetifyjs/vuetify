<template lang="pug">
  div(
    class="alert"
    v-bind:class="classes"
    v-show="value"
  )
    v-icon(class="alert__icon" v-if="!hideIcon") {{ mdIcon }}
    div
      slot
    a(
      class="alert__dismissible"
      href="#!"
      v-if="dismissible"
      v-on:click.prevent="$emit('input', false)"
    )
      v-icon(right) cancel
</template>

<script>
export default {
  name: 'alert',

  props: {
    dismissible: Boolean,

    error: Boolean,

    hideIcon: Boolean,

    icon: String,

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
        'alert--dismissible': this.dismissible,
        'alert--error': this.error,
        'alert--info': this.info,
        'alert--success': this.success,
        'alert--warning': this.warning
      }
    },

    mdIcon () {
      if (this.icon) {
        return this.icon
      }

      switch (true) {
        case this.error:
          return 'warning'
        case this.info:
          return 'info'
        case this.success:
          return 'check_circle'
        case this.warning:
          return 'priority_high'
      }
    }
  }
}
</script>