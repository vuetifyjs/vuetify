<template>
  <router-view />
</template>

<script>
  // Mixins
  import asyncData from '@/util/asyncData'

  export default {
    mixins: [asyncData],

    asyncData ({ store }) {
      return typeof localStorage !== 'undefined'
        ? store.dispatch('store/getCheckout')
        : Promise.resolve()
    }
  }
</script>

<style lang="stylus">
  .text--line-through
    text-decoration: line-through
</style>
