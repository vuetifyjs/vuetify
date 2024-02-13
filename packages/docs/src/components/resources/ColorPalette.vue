<template>
  <v-container class="px-0">
    <v-row>
      <v-col cols="12" class="pb-0 font-weight-bold">{{ t('colors') }}</v-col>

      <v-col v-for="(color, i) in colors" :key="i" cols="3">
        <v-sheet
          :color="color"
          border
          class="d-flex align-center justify-center text-mono"
          height="150"
          rounded
        >
          {{ color }}
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const { t } = useI18n()

  const colors = [
    '#1867C0',
    '#1697F6',
    '#7BC6FF',
    '#AEDDFF',
  ]
</script>
