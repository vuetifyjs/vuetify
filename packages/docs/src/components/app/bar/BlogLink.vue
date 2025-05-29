<template>
  <v-badge color="success" offset-x="8" offset-y="8" dot>
    <AppBtn
      :to="rpath('/blog/')"
      color="medium-emphasis"
      text="blog"
      variant="text"
      @click="sweClick('app-bar', 'blog', name)"
    />
  </v-badge>
</template>

<script setup>
  const { name } = useRoute()
</script>
