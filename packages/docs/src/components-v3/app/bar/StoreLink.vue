<template>
  <app-tooltip-btn
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    icon="mdi-shopping-outline"
    path="store"
    rel="noopener"
    target="_blank"
    @click="onClick"
  />
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  // import { useRoute } from 'vue-router'

  export default defineComponent({
    name: 'TeamLink',

    setup () {
      // const route = useRoute()

      function onClick () {
        // this.$gtag.event('click', {
        //   event_category: 'toolbar',
        //   event_label: 'store',
        //   value: route.name,
        // })
      }

      return {
        onClick,
      }
    },
  })
</script>
