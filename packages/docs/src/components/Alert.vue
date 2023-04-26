<template>
  <v-alert
    :border-color="type"
    :type="type"
    border="start"
    class="v-alert--doc mb-4 border-opacity-100"
    variant="tonal"
  >
    <template #prepend>
      <v-icon
        :color="type"
        :icon="icon"
      />
    </template>
    <slot />
  </v-alert>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({ type: String })

  const icon = computed(() => {
    switch (props.type) {
      case 'error': return 'mdi-close-circle-outline'
      case 'info': return 'mdi-information-outline'
      case 'success': return 'mdi-check-circle-outline'
      case 'warning': return 'mdi-alert-circle-outline'
      default: return '$vuetify'
    }
  })
</script>

<style lang="sass">
  .v-alert--doc
    .v-alert__content p:last-child
      margin-bottom: 0 !important
</style>
