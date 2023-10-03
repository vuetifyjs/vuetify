<template>
  <v-text-field
    :placeholder="t('search.label')"
    base-color="disabled"
    hide-details
    persistent-placeholder
    prepend-inner-icon="mdi-magnify"
    single-line
    variant="outlined"
  >
    <template
      v-for="(slot, index) of Object.keys($slots)"
      #[slot]
      :key="index"
    >
      <slot :name="slot" />
    </template>
  </v-text-field>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
