<template>
  <v-row density="comfortable">
    <v-col
      v-for="(variant, i) in variants"
      :key="i"
      cols="12"
      md="4"
    >
      <v-card
        :variant="variant"
        class="mx-auto"
        color="surface-variant"
        max-width="344"
        subtitle="Greyhound divisely hello coldly fonwderfully"
        title="Headline"
      >
        <template v-slot:actions>
          <v-btn text="Button"></v-btn>
        </template>
      </v-card>

      <div class="text-center text-body-small">{{ variant }}</div>
    </v-col>
  </v-row>
</template>

<script setup>
  const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain']
</script>

<script>
  export default {
    data: () => ({
      variants: ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'],
    }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13717-206971"
}
</example-meta>
