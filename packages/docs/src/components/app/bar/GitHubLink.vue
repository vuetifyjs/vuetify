<template>
  <AppBtn
    color="medium-emphasis"
    href="https://github.com/vuetifyjs/vuetify"
    icon="mdi-github"
    rel="noopener"
    target="_blank"
    @click="sweClick('app-bar', 'github', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
