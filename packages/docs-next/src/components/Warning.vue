<template>
  <v-alert
    text
    border="left"
    type="warning"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default {
    name: 'Warning',
  }
</script>
