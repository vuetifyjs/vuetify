<template>
  <div class="d-flex flex-column gap-4">
    <VTypography
      text="display-large"
      mobile="headline-large"
      mobileBreakpoint="sm"
      color="primary"
    >
      Responsive Text (sm)
    </VTypography>

    <VTypography
      text="headline-large"
      mobile="body-large"
      mobileBreakpoint="md"
      color="secondary"
    >
      Responsive Text (md)
    </VTypography>

    <VTypography
      text="body-large"
      mobile="body-small"
      mobileBreakpoint="lg"
      color="error"
    >
      Responsive Text (lg)
    </VTypography>
  </div>
</template>

<script setup>
import { VTypography } from 'vuetify/components'
</script>