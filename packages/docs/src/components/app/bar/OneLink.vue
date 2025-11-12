<template>
  <AppBtn
    :to="rpath('/one/')"
    color="primary"
    text="one"
    variant="outlined"
    @click="sweClick('app-bar', 'one', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
