<template lang="pug">
  v-alert(
    :color="computedColor"
    :icon="computedIcon"
    value
  ).my-4.app-alert
    markdown(:source="$t(value)")
</template>

<script>
  const iconMap = {
    error: 'warning',
    info: 'info',
    success: 'check_circle',
    warning: 'priority_high'
  }

  export default {
    name: 'AppAlert',

    props: {
      error: {
        type: Boolean,
        default: false
      },
      info: {
        type: Boolean,
        default: false
      },
      success: {
        type: Boolean,
        default: false
      },
      warning: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      }
    },

    computed: {
      computedColor () {
        if (this.error) return 'error'
        else if (this.info) return 'info'
        else if (this.success) return 'success'
        else if (this.warning) return 'warning'
      },
      computedIcon () {
        return iconMap[this.computedColor]
      }
    }
  }
</script>

<style>
  .app-alert p {
    margin: 0 !important;
  }
</style>
