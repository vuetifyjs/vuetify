<template>
  <v-container class="pt-8">
    <v-row>
      <v-col cols="12" md="6">
        <v-combobox
          :items="items"
          :list-props="{ bgColor: 'primary', class: 'highlight-on-dark' }"
          label="Custom list background"
          multiple
        ></v-combobox>
      </v-col>

      <v-col cols="12" md="6">
        <v-combobox
          :items="items"
          :list-props="{ class: 'fancy-yellow-highlight' }"
          label="Custom highlight style"
          multiple
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const items = [
    'Programming',
    'Design',
    'Vue',
    'Vuetify',
    'Gaming',
    'Music',
    'Cooking',
    'Photography',
  ]
</script>

<style>
  .highlight-on-dark .v-highlight__mark {
    --v-highlight-opacity: 30%;
  }

  .fancy-yellow-highlight {
    --v-highlight-background: yellow;
    --v-highlight-color: #000;
    --v-highlight-border-radius: 3px;

    .v-highlight__mark {
      box-shadow: 0 3px 0 color-mix(in srgb, yellow 70%, #444),
        0 -3px 0 color-mix(in srgb, yellow 70%, #444);
    }
  }
</style>
