<template>
  <div class="d-flex flex-column gap-4">
    <VTypography
      text="display-large"
      color="primary"
    >
      Display Large
    </VTypography>

    <VTypography
      text="headline-large"
      color="secondary"
    >
      Headline Large
    </VTypography>

    <VTypography
      text="body-medium"
      color="error"
    >
      Body Medium
    </VTypography>

    <VTypography
      text="label-small"
      color="success"
    >
      Label Small
    </VTypography>
  </div>
</template>

<script setup>
import { VTypography } from 'vuetify/components'
</script>