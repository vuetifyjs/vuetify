<template>
  <v-tooltip
    v-if="!$vuetify.theme.dark"
    bottom
  >
    <template v-slot:activator="{ on }">
      <v-btn
        :aria-label="tooltip"
        icon
        v-bind="$attrs"
        v-on="{
          ...on,
          ...$listeners
        }"
      >
        <v-icon v-text="icon" />
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: 'AppTooltipBtn',

    inheritAttrs: true,

    props: {
      icon: {
        type: String,
        required: true,
      },
      tooltip: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="sass">
  // .v-btn--app
</style>
