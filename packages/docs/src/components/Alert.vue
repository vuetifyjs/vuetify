<template>
  <v-alert
    border="start"
    class="v-alert--doc mb-4 border-opacity-100"
    variant="contained-text"
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
