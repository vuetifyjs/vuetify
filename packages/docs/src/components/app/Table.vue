<template>
  <app-sheet class="mb-4">
    <v-table
      v-bind="$attrs"
    >
      <slot />
    </v-table>
  </app-sheet>
</template>

<script>
  export default {
    inheritAttrs: false,
  }
</script>
