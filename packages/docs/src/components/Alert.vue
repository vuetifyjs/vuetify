<template>
  <v-alert
    border="left"
    class="v-alert--doc"
    text
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default {
    name: 'Alert',
  }
</script>

<style lang="sass">
  .v-alert--doc
    .v-alert__content p:last-child
      margin-bottom: 0 !important
</style>
