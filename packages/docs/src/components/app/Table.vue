<template>
  <app-sheet class="mb-4">
    <v-simple-table
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </v-simple-table>
  </app-sheet>
</template>

<script>
  export default { name: 'AppTable' }
</script>
