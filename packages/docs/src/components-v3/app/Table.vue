<template>
  <app-sheet class="mb-4">
    <v-table
      v-bind="$attrs"
    >
      <slot />
    </v-table>
  </app-sheet>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppTable',

    inheritAttrs: false,
  })
</script>
