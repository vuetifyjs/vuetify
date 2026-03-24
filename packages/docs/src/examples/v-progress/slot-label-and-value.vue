<template>
  <v-sheet
    class="py-6 px-6 mx-auto"
    color="deep-purple-lighten-5"
    max-width="400"
    rounded="xl"
    variant="flat"
  >

    <div class="d-flex align-baseline ga-2">
      <span class="text-display-large text-deep-purple font-weight-bold">{{ uploaded.value }}</span>{{ uploaded.unit }}
    </div>
    <v-progress
      :max="totalBytes"
      :model-value="uploadedBytes"
      color="deep-purple"
      details-position="bottom"
      label="Transfer progress"
      rounded
    >
      <template v-slot:label>~5 mins to transfer</template>
      <template v-slot:value>{{ total.value }} {{ total.unit }} total</template>
    </v-progress>
  </v-sheet>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, shallowRef } from 'vue'

  const totalBytes = 2 * 1024 * 1024 * 1024 // 128 GB
  const uploadedBytes = shallowRef(0)
  const increment = totalBytes / 50 // finish in ~25s

  const interval = setInterval(() => {
    uploadedBytes.value += increment
    if (uploadedBytes.value >= totalBytes) {
      uploadedBytes.value = 0
    }
  }, 500)

  onUnmounted(() => clearInterval(interval))

  function formatBytes (v: number) {
    if (Number.isNaN(Number(v))) return { value: 0, unit: 'B' }

    const kB = v / 1024
    if (kB < 1) return { value: Math.round(v), unit: 'B' }

    const MB = kB / 1024
    if (MB < 1) return { value: Math.round(kB * 10) / 10, unit: 'kB' }

    const GB = MB / 1024
    if (GB < 1) return { value: Math.round(MB * 10) / 10, unit: 'MB' }

    return { value: Math.round(GB * 10) / 10, unit: 'GB' }
  }

  const total = computed(() => formatBytes(totalBytes))
  const uploaded = computed(() => formatBytes(uploadedBytes.value))
</script>
