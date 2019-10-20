<template>
  <v-alert
    :type="value"
    border="left"
    class="app-alert mb-4"
    text
    value
  >
    <doc-markdown><slot /></doc-markdown>
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
  a
    color: inherit
    font-weight: 500

    &:hover
      text-decoration: underline

  p
    margin: 0 !important
</style>
