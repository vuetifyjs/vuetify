<template>
  <router-view />

  <v-btn
    :href="href"
    color="primary"
    icon="mdi-github"
    rel="noopener"
    style="position: fixed; bottom: 12px; right: 12px; z-index: 2000;"
    target="_blank"
  />
</template>

<script setup>
  const route = useRoute()
  const paths = route.path.split('/').filter(p => p.length > 0)
  const href = `https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/${paths.at(-1)}.vue`
</script>
