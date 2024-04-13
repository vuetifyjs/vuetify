<template>
  <v-tooltip
    v-if="auth.isSubscriber"
    location="bottom"
    text="Sponsor"
  >
    <template #activator="{ props: activatorProps }">
      <v-icon
        v-bind="activatorProps"
        color="#e98b20"
        icon="mdi-crown"
      />
    </template>
  </v-tooltip>
</template>

<script setup>
  const auth = useAuthStore()
</script>
