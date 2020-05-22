<template>
  <v-alert
    v-bind="$attrs"
    text
    border="left"
    v-on="$listeners"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default {
    name: 'AppAlert',

    inheritAttrs: false,
  }
</script>
