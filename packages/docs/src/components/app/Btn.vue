<template>
  <v-btn
    :variant="variant"
    class="text-capitalize px-2 font-weight-regular"
  >
    <slot v-if="$slots.default" />

    <template v-else-if="text">
      {{ t(text) }}
    </template>
  </v-btn>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  defineProps({
    text: String,
    variant: {
      type: String,
      default: 'text',
    },
  })

  const { t } = useI18n()
</script>
