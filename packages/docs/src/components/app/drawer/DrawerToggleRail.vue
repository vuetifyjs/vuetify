<template>
  <v-btn
    :icon="icon"
    height="28"
    size="small"
    variant="text"
    rounded
    @click="onClick"
  />
</template>

<script setup>
  const user = useUserStore()

  const icon = computed(() => {
    return user.ecosystem.docs.railDrawer ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'
  })

  function onClick () {
    user.ecosystem.docs.railDrawer = !user.ecosystem.docs.railDrawer
  }
</script>
