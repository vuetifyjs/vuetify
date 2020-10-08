<template>
  <app-md
    v-if="current"
    class="v-markdown--inline d-inline"
    tag="span"
  >
    {{ current.metadata.description }}
  </app-md>
</template>

<script>
  // Mixins
  import Ad from '@/mixins/ad'

  export default {
    name: 'InlineAd',

    mixins: [Ad],
  }
</script>

<style lang="sass">
  .v-markdown--inline
    a
      font-weight: 500
      text-decoration: none
    p
      display: inline
      margin: 0
</style>
