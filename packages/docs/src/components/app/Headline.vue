<template>
  <component
    :is="tag"
    :class="{
      [`text-${size}`]: size,
      [`font-weight-${weight}`]: weight,
      [`text-${color}`]: color,
    }"
  >
    {{ t(path) }}
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'AppHeadline',

    props: {
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
    },

    setup () {
      const { t } = useI18n()

      return { t }
    },
  })
</script>
