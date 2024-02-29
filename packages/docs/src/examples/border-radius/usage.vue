<template>
  <div class="text-center">
    <v-row class="pa-4">
      <v-radio-group v-model="model" inline>
        <v-radio label="rounded-0" value="rounded-0"></v-radio>
        <v-radio label="rounded-sm" value="rounded-sm"></v-radio>
        <v-radio label="rounded" value="rounded"></v-radio>
        <v-radio label="rounded-lg" value="rounded-lg"></v-radio>
        <v-radio label="rounded-xl" value="rounded-xl"></v-radio>
        <v-radio label="rounded-pill" value="rounded-pill"></v-radio>
        <v-radio label="rounded-circle" value="rounded-circle"></v-radio>
        <v-radio label="rounded-shaped" value="rounded-shaped"></v-radio>
      </v-radio-group>
    </v-row>

    <v-sheet
      :class="model"
      class="mx-auto mt-8"
      elevation="12"
      height="128"
      max-width="256"
      width="100%"
    ></v-sheet>

    <div class="py-3"></div>

    <code class="text-subtitle-1">.{{ model }}</code>
  </div>
</template>

<script>
  export default {
    data: () => ({
      model: 'rounded-0',
    }),
  }
</script>
