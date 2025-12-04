<template>
  <div class="d-flex flex-column gap-4">
    <VTypography
      variant="display-large"
      color="primary"
    >
      Display Large
    </VTypography>

    <VTypography
      variant="headline-large"
      color="secondary"
    >
      Headline Large
    </VTypography>

    <VTypography
      variant="body-medium"
      color="error"
    >
      Body Medium
    </VTypography>

    <VTypography
      variant="label-small"
      color="success"
    >
      Label Small
    </VTypography>
  </div>
</template>

<script setup>
import { VTypography } from 'vuetify/components'
</script>