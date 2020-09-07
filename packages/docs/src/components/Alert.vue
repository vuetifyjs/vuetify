<template>
  <v-alert
    border="left"
    class="v-alert--md"
    prominent
    text
    v-bind="$attrs"
    v-on="$listeners"
  >
    <component :is="component">
      <slot />
    </component>
  </v-alert>
</template>

<script>
  export default {
    name: 'Alert',

    computed: {
      component () {
        const length = this.$slots.default.length

        return length > 1 ? 'div' : 'app-md'
      },
    },
  }
</script>

<style lang="sass">
  .v-alert.v-alert--md
    padding-bottom: 10px
    padding-top: 10px

    .v-alert__icon
      height: 40px
      margin: 0 16px 0 0
      min-width: 40px

    .v-markdown
      p
        line-height: initial

        &:last-child
          margin-bottom: 0
</style>
