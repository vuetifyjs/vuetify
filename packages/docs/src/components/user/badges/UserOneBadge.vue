<template>
  <v-tooltip
    v-if="one.isSubscriber"
    text="Vuetify One Subscriber"
    location="bottom"
  >
    <template #activator="{ props: activatorProps }">
      <v-icon
        v-bind="activatorProps"
        color="primary"
        icon="mdi-numeric-1-box"
      />
    </template>
  </v-tooltip>
</template>

<script setup>
  // Stores
  import { useOneStore } from '@vuetify/one'

  const one = useOneStore()
</script>
