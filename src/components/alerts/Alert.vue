<template lang="pug">
  div(
    class="alert"
    v-bind:class="classes"
  )
    v-icon {{ icon }}
    div
      slot
</template>

<script>
  export default {
    name: 'alert',
    
    props: {
      error: Boolean,

      info: Boolean,

      success: Boolean,
      
      warning: Boolean
    },

    computed: {
      classes () {
        return {
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