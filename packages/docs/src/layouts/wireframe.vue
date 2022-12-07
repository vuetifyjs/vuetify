<template>
  <router-view />

  <v-btn
    :href="href"
    color="primary"
    icon="mdi-github"
    rel="noopener"
    style="position: fixed; bottom: 12px; right: 12px;"
    target="_blank"
  />
</template>

<script setup>
  // Composables
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const { page } = route.meta
  const href = `https://github.com/vuetifyjs/vuetify/blob/next/packages/docs/src/examples/wireframes/${page}.vue`
</script>
