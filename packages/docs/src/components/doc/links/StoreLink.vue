<template>
  <app-tooltip-btn
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    icon="$mdiShoppingOutline"
    path="store"
    rel="noopener"
    target="_blank"
    @click="onClick"
  />
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'StoreLink',

    computed: {
      name: get('route/name'),
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'toolbar',
          event_label: 'store',
          value: this.name,
        })
      },
    },
  }
</script>
