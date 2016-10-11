<template lang="pug">
  div(
    class="alert"
    v-bind:class="classes"
  )
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
      }
    }
  }
</script>