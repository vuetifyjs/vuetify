<template>
  <v-container class="px-0">
    <div class="font-weight-bold mb-3">{{ t('colors') }}</div>

    <v-row>
      <v-col v-for="(color, i) in colors" :key="i" cols="3">
        <v-sheet
          :color="color"
          class="d-flex align-center justify-center text-mono"
          height="150"
          border
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
