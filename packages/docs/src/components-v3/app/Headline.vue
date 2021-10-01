<template>
  <component
    :is="tag"
    :class="`text-${size} font-weight-${weight} text--${color}`"
  >
    {{ t(path) }}
  </component>
</template>

<script>
  import { useI18n } from 'vue-i18n'

  export default {
    name: 'Headline',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
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
      path: String,
    },

    setup () {
      const { t } = useI18n()

      return { t }
    },
  }
</script>
