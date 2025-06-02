<template>
  <AppBtn
    color="medium-emphasis"
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    icon="mdi-storefront-outline"
    rel="noopener"
    target="_blank"
    @click="sweClick('app-bar', 'store', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
