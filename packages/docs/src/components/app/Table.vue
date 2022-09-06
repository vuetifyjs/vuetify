<template>
  <app-sheet class="mb-4 app-table">
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

<style lang="sass">
  .app-table
    .v-table table tbody > tr > td:first-child
      white-space: nowrap
</style>
