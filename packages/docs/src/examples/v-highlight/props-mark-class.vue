<template>
  <div class="pa-6" style="max-width: 560px; margin: 0 auto">
    <v-text-field
      v-model="query"
      class="mb-6"
      density="compact"
      label="Search"
      variant="outlined"
      clearable
      hide-details
    ></v-text-field>

    <v-highlight
      :query="query"
      :text="text"
      class="text-body-1"
      mark-class="bg-primary-tint font-weight-medium border-b border-primary border-opacity-100"
      tag="p"
    ></v-highlight>
  </div>
</template>

<script setup>
  const query = shallowRef('color')

  const text = 'Color theory forms the foundation of visual design. Understanding how hues, saturation, and value interact helps designers create harmony and contrast. Primary colors — red, blue, and yellow — combine to form secondary colors. Complementary colors sit opposite each other on the color wheel and create maximum visual contrast when paired.'
</script>

<style scoped>
  :deep(.v-highlight) {
    .bg-primary-tint { background: rgba(var(--v-theme-primary), 0.4); }
  }
</style>
