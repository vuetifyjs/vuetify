<template>
  <v-alert
    :type="value"
    border="left"
    class="app-alert mb-4"
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
    color: #fff
    text-decoration: underline

  p
    margin: 0 !important
</style>
