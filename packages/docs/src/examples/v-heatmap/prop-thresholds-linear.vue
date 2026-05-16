<template>
  <v-container>
    <v-row class="ga-6" justify="center">
      <v-col cols="auto">
        <v-heatmap
          :items="items"
          :legend="{ labels: ['Cold', 'Hot'], cellSize: 16 }"
          :rows="rows"
          :thresholds="thresholds"
        ></v-heatmap>
      </v-col>
      <v-col cols="auto">
        <div class="text-caption mb-1">Color space</div>
        <v-chip-group v-model="colorSpace" class="mb-4" mandatory>
          <v-chip value="srgb" filter>srgb</v-chip>
          <v-chip value="oklch" filter>oklch</v-chip>
        </v-chip-group>

        <div class="text-caption mb-1">Hue interpolation</div>
        <v-chip-group v-model="hueInterpolation" :disabled="colorSpace === 'srgb'" mandatory>
          <v-chip value="shorter" filter>shorter</v-chip>
          <v-chip value="longer" filter>longer</v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  const colorSpace = ref('oklch')
  const hueInterpolation = ref('shorter')

  const thresholds = computed(() => ({
    from: { min: 0, color: '#5fb4f7' },
    to: { min: 15, color: '#f76b45' },
    colorSpace: colorSpace.value,
    hueInterpolation: hueInterpolation.value,
  }))

  const items = Array.from({ length: 25 }, (_, i) => ({
    row: rows[i % 5],
    value: Math.floor(Math.random() * 15),
  }))
</script>
