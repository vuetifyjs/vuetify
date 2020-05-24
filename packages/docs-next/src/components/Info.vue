<template>
  <v-alert
    text
    border="left"
    type="info"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default {
    name: 'Info',
  }
</script>
