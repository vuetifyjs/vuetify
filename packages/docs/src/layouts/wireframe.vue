<template>
  <div>
    <router-view />

    <v-btn
      :href="href"
      color="primary"
      rel="noopener"
      target="_blank"
      icon="mdi-github"
      style="position: fixed; bottom: 12px; right: 12px;"
    />
  </div>
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
      const { locale, page } = route.meta

      return {
        href: `https://github.com/vuetifyjs/vuetify/blob/next/packages/docs/src/wireframes/${locale}/${page}.vue`,
      }
    },
  })
</script>
