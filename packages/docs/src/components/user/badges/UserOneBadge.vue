<template>
  <v-tooltip
    v-if="one.isSubscriber"
    location="bottom"
    text="Vuetify One Subscriber"
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
  const one = useOneStore()
</script>
