<template>
  <span class="v-app-tooltip-btn d-inline-block">
    <v-btn
      :aria-label="path"
      icon
      variant="text"
      v-bind="$attrs"
    >
      <slot
        v-if="$slots.icon"
        name="icon"
      />

      <v-icon
        v-else
        :icon="icon"
      />

      <v-tooltip
        location="bottom"
        class="v-app-tooltip-btn__content"
        open-delay="200"
        activator="parent"
      >
        {{ t(path) }}
      </v-tooltip>
    </v-btn>
  </span>
</template>

<script>
  import { useI18n } from 'vue-i18n'

  export default {
    name: 'AppTooltipBtn',

    inheritAttrs: false,

    props: {
      icon: String,
      path: String,
    },

    setup () {
      const { t } = useI18n()

      return { t }
    },
  }
</script>

<style lang="sass">
  .v-app-tooltip-btn__content p
    margin: 0
</style>
