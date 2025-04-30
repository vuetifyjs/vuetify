<template>
  <AppBtn
    class="ms-1"
    color="medium-emphasis"
    href="https://play.vuetifyjs.com"
    rel="noopener noreferrer"
    target="_blank"
    text="playground"
    variant="text"
    @click="sweClick('app-bar', 'playground', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
