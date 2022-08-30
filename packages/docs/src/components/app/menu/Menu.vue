<template>
  <v-menu
    close-delay="100"
    location="bottom end"
    max-height="500"
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

<script lang="ts">
  // Components
  import AppList, { Item } from '@/components/app/list/List.vue'

  // Utilities
  import { defineComponent, PropType } from 'vue'

  export default defineComponent({
    name: 'AppMenu',

    components: { AppList },

    props: {
      items: {
        type: Array as PropType<Item[]>,
        default: () => ([]),
      },
    },
  })
</script>
