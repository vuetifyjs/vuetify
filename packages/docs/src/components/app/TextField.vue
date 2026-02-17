<template>
  <v-text-field
    :placeholder="t('search.label')"
    base-color="disabled"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    hide-details
    persistent-placeholder
    single-line
  >
    <template v-if="$slots['append-inner']" #append-inner>
      <slot name="append-inner" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
  const { t } = useI18n()
</script>
