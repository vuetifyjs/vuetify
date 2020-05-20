<template>
  <v-btn
    :color="color"
    class="v-btn--app"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script>
  export default {
    name: 'Btn',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
    },
  }
</script>

<style lang="sass">
  // .v-btn--app
</style>
