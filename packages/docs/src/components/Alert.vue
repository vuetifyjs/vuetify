<template>
  <v-alert
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-5'"
    border="left"
    class="v-alert--md"
    colored-border
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
  .v-alert--md .v-markdown
    p
      line-height: initial

      &:last-child
        margin-bottom: 0
</style>
