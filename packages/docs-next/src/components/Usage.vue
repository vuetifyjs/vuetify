<template>
  <v-alert
    text
    border="left"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default {
    name: 'Usage',
  }
</script>
