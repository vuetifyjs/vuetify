<template>
  <v-sheet
    class="overflow-hidden"
    v-bind="{
      outlined: true,
      rounded: true,
      ...$attrs,
    }"
    v-on="$listeners"
  >
    <slot />
  </v-sheet>
</template>

<script>
  export default { name: 'AppSheet' }
</script>
