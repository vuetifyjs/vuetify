<template>
  <app-markdown
    class="v-example-missing text-center"
    v-text="t('missing', { file })"
  />
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  defineProps({
    file: {
      type: String,
      required: true,
    },
  })

  const { t } = useI18n()
</script>

<style lang="sass">
  .v-example-missing > p
    margin: 0
</style>
