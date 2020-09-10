<template>
  <v-alert
    border="left"
    prominent
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

<style lang="sass" scoped>
  .v-alert
    padding-bottom: 10px
    padding-top: 10px

    ::v-deep
      .v-alert__icon
        height: 40px
        margin: 0 16px 0 0
        min-width: 40px

      p
        line-height: initial

        &:last-child
          margin-bottom: 0
</style>
