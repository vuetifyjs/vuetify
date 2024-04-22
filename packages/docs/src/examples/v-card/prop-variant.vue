<template>
  <v-row dense>
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
        subtitle="Greyhound divisely hello coldly fonwderfully"
        title="Headline"
      >
        <v-card
          :variant="variant"
          class="mx-auto"
          max-width="344"
        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                {{ variant }}
              </div>
              <div class="text-h6 mb-1">
                Headline
              </div>
              <div class="text-caption">Greyhound divisively hello coldly wonderfully</div>
            </div>
          </v-card-item>

          <template v-slot:actions>
            <v-btn text="Button"></v-btn>
          </template>
      </v-card>

      <div class="text-center text-caption">{{ variant }}</div>
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
