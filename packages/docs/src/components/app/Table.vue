<template>
  <AppSheet class="mb-4 app-table">
    <v-table
      density="comfortable"
      v-bind="$attrs"
    >
      <slot />
    </v-table>
  </AppSheet>
</template>

<script>
  export default {
    inheritAttrs: false,
  }
</script>

<style lang="sass">
  .app-table
    tbody > tr > td:first-child
      white-space: nowrap
</style>
