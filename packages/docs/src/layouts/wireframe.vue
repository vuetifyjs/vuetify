<template>
  <router-view />

  <v-btn
    :href="href"
    rel="noopener"
    color="primary"
    icon="mdi-github"
    style="position: fixed; bottom: 12px; right: 12px;"
    target="_blank"
  />
</template>

<script lang="ts">
  // Composables
  import { useRoute } from 'vue-router'

  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WireframeLayout',

    setup () {
      const route = useRoute()
      const { page } = route.meta

      return {
        href: `https://github.com/vuetifyjs/vuetify/blob/next/packages/docs/src/examples/${page}.vue`,
      }
    },
  })
</script>
