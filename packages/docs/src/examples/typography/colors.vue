<template>
  <div class="d-flex flex-column gap-4">
    <VTypography
      v-for="color in colors"
      :key="color"
      text="body-large"
      :color="color"
    >
      Text in {{ color }} color
    </VTypography>

    <VTypography
      text="body-large"
      color="#FF9800"
    >
      Custom color (hex)
    </VTypography>
  </div>
</template>

<script setup>
import { VTypography } from 'vuetify/components'

const colors = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
]
</script>