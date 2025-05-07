<template>
  <AppBtn
    :to="rpath('/introduction/sponsors-and-backers/')"
    class="ms-1"
    color="medium-emphasis"
    text="sponsor"
    variant="text"
    @click="sweClick('app-bar', 'sponsor', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
