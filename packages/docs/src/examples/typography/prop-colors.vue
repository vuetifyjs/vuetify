<template>
  <div class="d-flex flex-column gap-4">
    <VTypography
      v-for="color in colors"
      :key="color"
      variant="body-large"
      :color="color"
    >
      Text in {{ color }} color
    </VTypography>

    <VTypography
      variant="body-large"
      color="#FF9800"
    >
      Custom color (hex)
    </VTypography>
  </div>
</template>

<script setup>
const colors = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
]
</script>

