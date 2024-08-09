<template>
  <AppBtn
    :to="rpath('/introduction/enterprise-support/')"
    class="ms-1"
    color="primary"
    text="support"
    variant="outlined"
    @click="gtagClick('app-bar', 'enterprise', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
