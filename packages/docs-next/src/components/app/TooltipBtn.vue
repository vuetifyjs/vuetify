<template>
  <span class="v-app-tooltip-btn">
    <v-tooltip
      bottom
      content-class="v-app-tooltip-btn__content"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          :aria-label="path"
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

      <i18n
        :path="path"
        tag="app-md"
      />
    </v-tooltip>
  </span>
</template>

<script>
  export default {
    name: 'AppTooltipBtn',

    inheritAttrs: false,

    props: {
      icon: {
        type: String,
        required: true,
      },
      path: String,
    },
  }
</script>

<style lang="sass">
  .v-app-tooltip-btn
    ~ .v-app-tooltip-btn
      margin-left: 8px

  .v-app-tooltip-btn__content p
    margin: 0
</style>
