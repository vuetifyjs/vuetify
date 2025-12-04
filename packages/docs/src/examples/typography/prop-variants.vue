<template>
  <div class="d-flex flex-column gap-4">
    <VTypography v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </VTypography>
  </div>
</template>

<script setup>
  const variants = [
    'display-large',
    'display-medium',
    'display-small',
    'headline-large',
    'headline-medium',
    'headline-small',
    'body-large',
    'body-medium',
    'body-small',
    'label-large',
    'label-medium',
    'label-small',
  ]
</script>
