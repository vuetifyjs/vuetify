<template>
  <span class="v-app-tooltip-btn d-inline-block">
    <v-btn
      :aria-label="path"
      :variant="variant"
      v-bind="$attrs"
      icon
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
        v-if="path"
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

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Types
  import type { PropType } from 'vue'
  import type { VBtn } from 'vuetify/components'

  defineProps({
    icon: String,
    path: String,
    variant: {
      type: String as PropType<VBtn['$props']['variant']>,
      default: 'text',
    },
  })

  const { t } = useI18n()
</script>

<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>

<style lang="sass">
  .v-app-tooltip-btn__content p
    margin: 0
</style>
