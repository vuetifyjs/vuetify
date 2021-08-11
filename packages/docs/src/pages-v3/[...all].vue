<route lang="yaml">
meta:
  layout: 404
</route>

<template>
  <div>
    {{ t('not-found') }}
  </div>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'IndexPage',

    setup () {
      const { t } = useI18n()

      return {
        t,
      }
    },
  })
</script>
