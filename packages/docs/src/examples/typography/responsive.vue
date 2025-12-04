<template>
  <div class="d-flex flex-column gap-4">
    <VTypography variant="headline-large sm:display-large" color="primary">
      Responsive Text (sm)
    </VTypography>

    <VTypography variant="body-large md:headline-large" color="secondary">
      Responsive Text (md)
    </VTypography>

    <VTypography variant="body-small lg:body-large" color="error">
      Responsive Text (lg)
    </VTypography>
  </div>
</template>

<script setup>
import { VTypography } from "vuetify/components";
</script>
