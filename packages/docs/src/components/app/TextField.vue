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
    <template v-if="$slots['append-inner']" #append-inner>
      <slot name="append-inner" />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
  const { t } = useI18n()
</script>
