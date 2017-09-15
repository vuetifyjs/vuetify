<template lang="pug">
  v-toolbar(
    app
    ref="toolbar"
  ).accent
</template>

<script>
  export default {
    name: 'app-toolbar',

    watch: {
      $route (current) {
        const duration = current.path !== '/'
          ? 300
          : 0

        setTimeout(() => {
          this.$refs.toolbar.isScrolling = !duration
        }, duration)
      }
    },

    mounted () {
      this.$refs.toolbar.isScrolling = this.$route.path === '/'
    }
  }
</script>
