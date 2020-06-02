<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        :aria-label="tooltip"
        class="app-tooltip-btn"
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

    inheritAttrs: false,

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
  .app-tooltip-btn
    ~ .app-tooltip-btn
      margin-left: 8px
</style>
