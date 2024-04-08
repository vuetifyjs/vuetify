<template>
  <v-menu
    close-delay="100"
    location="bottom end"
    open-delay="60"
    open-on-hover
  >
    <template #activator="{ props }">
      <slot name="activator" v-bind="{ props }" />
    </template>

    <AppSheet>
      <slot v-if="$slots.default" />

      <AppListList v-else :items="items" nav />
    </AppSheet>
  </v-menu>
</template>

<script setup lang="ts">
  // Components
  import type { Item } from '@/components/app/list/List.vue'
  import type { PropType } from 'vue'

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      default: () => ([]),
    },
  })
</script>
