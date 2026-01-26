<template>
  <div class="d-flex flex-wrap align-center justify-center ga-2">
    <VTypography
      v-for="color in ['primary', 'success', 'error']"
      :key="color"
      :color="color"
      class="pa-2 border"
      variant="body-large"
    >
      Text in {{ color }} color
    </VTypography>

    <VTypography
      class="pa-3 border"
      color="#7b1fa2"
      variant="body-large"
    >
      Custom color (hex)
    </VTypography>
  </div>
</template>
