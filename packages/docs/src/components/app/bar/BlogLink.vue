<template>
  <AppBtn
    :to="rpath('/blog/')"
    color="medium-emphasis"
    text="blog"
    variant="text"
    @click="sweClick('app-bar', 'blog', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
