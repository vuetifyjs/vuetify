<template>
  <AppBtn
    :to="rpath('/introduction/enterprise-support/')"
    class="ms-1"
    color="primary"
    text="support"
    variant="outlined"
    @click="onClick"
  />
</template>

<script setup>
  const { name } = useRoute()

  function onClick () {
    gtagClick('app-bar', 'enterprise', name)
  }
</script>
