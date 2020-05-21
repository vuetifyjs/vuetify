<template>
  <v-alert
    v-bind="$attrs"
    text
    v-on="$listeners"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default {
    name: 'AppAlert',
  }
</script>
