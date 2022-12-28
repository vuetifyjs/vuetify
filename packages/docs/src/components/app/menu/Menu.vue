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

    <app-sheet>
      <slot v-if="$slots.default" />

      <app-list v-else nav :items="items" />
    </app-sheet>
  </v-menu>
</template>

<script setup lang="ts">
  // Components
  import AppList, { Item } from '@/components/app/list/List.vue'

  // Utilities
  import { PropType } from 'vue'

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      default: () => ([]),
    },
  })
</script>
