<template lang="pug">
  v-footer(
    app
    v-if="appFooter"
  )
</template>

<script>
  export default {
    name: 'app-footer',

    computed: {
      appFooter: {
        get () {
          return this.$store.state.appFooter
        },
        set (val) {
          this.$store.commit('app:footer', val)
        }
      }
    }
  }
</script>
