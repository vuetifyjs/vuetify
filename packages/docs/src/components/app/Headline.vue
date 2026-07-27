<template>
  <component
    :is="tag"
    :class="`text-${size} font-weight-${weight} text-${color}`"
  >
    {{ t(path) }}
  </component>
</template>

<script setup>
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
      default: '',
    },
  })

  const { t } = useI18n()
</script>
