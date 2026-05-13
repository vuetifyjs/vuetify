<template>
  <v-tooltip
    v-if="auth.isAdmin"
    location="bottom"
    text="Admin"
  >
    <template #activator="{ props: activatorProps }">
      <v-icon
        v-bind="activatorProps"
        color="primary"
        icon="$vuetify"
      />
    </template>
  </v-tooltip>
</template>

<script setup>
  const auth = useAuthStore()
</script>
