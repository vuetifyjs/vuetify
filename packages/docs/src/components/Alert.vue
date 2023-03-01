<template>
  <v-alert
    :border-color="type"
    :type="type"
    border="start"
    class="v-alert--doc mb-4 border-opacity-100"
    variant="tonal"
  >
    <template #prepend>
      <v-icon :color="type" :icon="`$${type}`" />
    </template>
    <slot />
  </v-alert>
</template>

<script setup>
  defineProps({ type: String })
</script>

<style lang="sass">
  .v-alert--doc
    .v-alert__content p:last-child
      margin-bottom: 0 !important
</style>
