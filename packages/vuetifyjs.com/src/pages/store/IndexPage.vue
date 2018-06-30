<template>
  <router-view />
</template>

<script>
  // Utilities
  import { mapMutations } from 'vuex'

  export default {

    asyncData ({ store }) {
      if (typeof localStorage !== 'undefined') {
        store.dispatch('store/getCheckout')
      }
    },

    created () {
      // this.drawer(false)
    },

    methods: {
      ...mapMutations('app', {
        drawer: 'DRAWER'
      })
    }
  }
</script>
