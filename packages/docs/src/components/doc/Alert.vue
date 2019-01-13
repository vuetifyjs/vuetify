<template>
  <v-alert
    :color="computedColor"
    :icon="computedIcon"
    :value="true"
    class="app-alert mb-3"
  >
    <doc-markdown><slot /></doc-markdown>
  </v-alert>
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
      value: {
        type: String,
        default: ''
      }
    },

    computed: {
      computedColor () {
        return this.value
      },
      computedIcon () {
        return iconMap[this.computedColor]
      }
    }
  }
</script>

<style lang="stylus">
  .app-alert
    a
      color: #fff

    p
      margin: 0 !important
</style>
