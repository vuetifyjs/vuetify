<template>
  <AppBtn
    :to="rpath('/introduction/sponsors-and-backers/')"
    class="ms-1"
    color="primary"
    text="sponsor"
    @click="onClick"
  />
</template>

<script setup>
  const { name } = useRoute()

  function onClick () {
    sweClick('app-bar', 'enterprise', name)
  }
</script>
