
<template>
  <div class="text-center">
    <v-row class="pa-4">
      <v-radio-group v-model="model" inline>
        <v-radio value="rounded-0" label="rounded-0"></v-radio>
        <v-radio value="rounded-sm" label="rounded-sm"></v-radio>
        <v-radio value="rounded" label="rounded"></v-radio>
        <v-radio value="rounded-lg" label="rounded-lg"></v-radio>
        <v-radio value="rounded-xl" label="rounded-xl"></v-radio>
        <v-radio value="rounded-pill" label="rounded-pill"></v-radio>
        <v-radio value="rounded-circle" label="rounded-circle"></v-radio>
        <v-radio value="rounded-shaped" label="rounded-shaped"></v-radio>
      </v-radio-group>
    </v-row>

    <v-sheet
      :class="model"
      max-width="256"
      class="mx-auto mt-8"
      elevation="12"
      height="128"
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
