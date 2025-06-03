<template>
  <AppBtn
    :to="rpath('/introduction/enterprise-support/')"
    color="primary"
    text="support"
    variant="outlined"
    @click="onClick"
  />
</template>

<script setup>
  const { name } = useRoute()

  function onClick () {
    sweClick('app-bar', 'enterprise', name)
  }
</script>
