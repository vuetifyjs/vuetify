<template>
  <v-simple-table
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-simple-table>
</template>

<script>
  export default {
    name: 'ApiTable',
  }
</script>
