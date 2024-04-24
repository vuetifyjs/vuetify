<template>
  <AppBtn
    :to="rpath('/introduction/enterprise-support/')"
    class="ms-1"
    color="primary"
    text="enterprise"
    variant="outlined"
    @click="gtagClick('app-bar', 'enterprise', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
