<template lang="pug">
  div(
    class="alert"
    v-bind:class="classes"
    v-show="isActive"
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
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'alert',

  data () {
    return {
      isActive: true
    }
  },

  mixins: [Toggleable],

  props: {
    dismissible: Boolean,

    error: Boolean,

    hideIcon: Boolean,

    icon: String,

    info: Boolean,

    success: Boolean,

    warning: Boolean
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