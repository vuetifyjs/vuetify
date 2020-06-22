<template>
  <v-alert
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-5'"
    border="left"
    class="v-alert--md"
    colored-border
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default { name: 'Alert' }
</script>

<style lang="sass">
  .v-alert--md .v-markdown
    p:last-child
      margin-bottom: 0

</style>
