<template>
  <v-alert
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'"
    :type="value"
    border="left"
    class="app-alert mb-4"
    colored-border
    value
  >
    <base-markdown><slot /></base-markdown>
  </v-alert>
</template>

<script>
  export default {
    name: 'AppAlert',

    props: {
      value: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="sass">
.app-alert
  p
    margin: 0 !important
</style>
