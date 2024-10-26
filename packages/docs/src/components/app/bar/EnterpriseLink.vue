<template>
  <AppBtn
    :data-umami-event-value="name"
    :to="rpath('/introduction/enterprise-support/')"
    class="ms-1"
    color="primary"
    data-umami-event="app-bar"
    data-umami-event-type="enterprise"
    text="support"
    variant="outlined"
    @click="gtagClick('app-bar', 'enterprise', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
</script>
