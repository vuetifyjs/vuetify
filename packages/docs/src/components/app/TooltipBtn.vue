<template>
  <span class="v-app-tooltip-btn d-inline-block">
    <v-btn
      :aria-label="path"
      v-bind="$attrs"
      icon
      variant="text"
    >
      <slot
        v-if="$slots.icon"
        name="icon"
      />

      <v-icon
        v-else
        color="medium-emphasis"
        :icon="icon"
      />

      <v-tooltip
        activator="parent"
        class="v-app-tooltip-btn__content"
        location="bottom"
        open-delay="200"
      >
        {{ t(path) }}
      </v-tooltip>
    </v-btn>
  </span>
</template>

<script lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
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
  })
</script>

<style lang="sass">
  .v-app-tooltip-btn__content p
    margin: 0
</style>
