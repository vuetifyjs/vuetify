<template>
  <v-alert
    border="left"
    text
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default { name: 'Alert' }
</script>
