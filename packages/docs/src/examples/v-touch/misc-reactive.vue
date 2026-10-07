<template>
  <div>
    <v-switch
      v-model="enabled"
      color="primary"
      label="Enable swipe"
    ></v-switch>

    <v-sheet
      class="d-flex align-center justify-center bg-grey-lighten-2"
      height="240"
      style="touch-action: pan-y"
      v-touch="enabled ? {
        left: () => direction = 'Left',
        right: () => direction = 'Right',
      } : false"
    >
      <div class="text-center">
        <div class="text-caption">{{ enabled ? 'Swipe left or right' : 'Swiping is disabled' }}</div>
        <div class="text-h6">{{ enabled ? direction : '' }}</div>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const enabled = ref(true)
  const direction = ref('None')

  watch(enabled, val => {
    if (!val) direction.value = 'None'
  })
</script>
