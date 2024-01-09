<template>
  <component
    :is="tag"
    :class="`text-${size} font-weight-${weight} text-${color}`"
  >
    {{ t(path) }}
  </component>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  defineProps({
    color: String,
    size: {
      type: String,
      default: 'h6',
    },
    tag: {
      type: String,
      default: 'div',
    },
    weight: {
      type: String,
      default: 'medium',
    },
    path: {
      type: String,
      required: true,
    },
  })

  const { t } = useI18n()
</script>
