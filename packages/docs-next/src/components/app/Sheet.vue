<template>
  <v-sheet
    class="overflow-hidden"
    outlined
    rounded
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-sheet>
</template>

<script>
  export default { name: 'AppSheet' }
</script>
