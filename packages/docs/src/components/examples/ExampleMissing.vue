<template>
  <AppMarkdown
    class="v-example-missing text-center"
    v-text="t('missing', { file })"
  />
</template>

<script setup>
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
