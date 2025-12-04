<template>
  <div class="d-flex flex-column ga-4">
    <v-card
      v-for="sample in samples"
      :key="sample.name"
      class="pa-4"
    >
      <v-typography :variant="sample.variant">
        {{ sample.name }}
      </v-typography>

      <div class="text-caption mt-4">
        variant="{{ sample.variant }}"
      </div>
    </v-card>
  </div>
</template>

<script setup>
  const samples = [
    { name: 'Body', variant: 'body-medium' },
    { name: 'Emphasized label', variant: 'label-medium lg:label-large' },
    {
      name: 'Responsive heading',
      variant: 'body-small md:headline-small xl:headline-large',
    },
  ]
</script>
