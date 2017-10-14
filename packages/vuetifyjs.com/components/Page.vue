<template lang="pug">
  v-container.page
    slot
</template>

<script>
  export default {
    name: 'page'
  }
</script>

<style lang="stylus">
  .page
    max-width: 1024px !important
    padding-top: 75px
</style>