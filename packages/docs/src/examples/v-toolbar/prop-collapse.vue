<template>
  <v-card>
    <v-toolbar
      :collapse="collapse"
      :collapse-position="collapsePosition"
      title="Toolbar"
    >
      <template v-slot:append>
        <div class="d-flex ga-1">
          <v-btn icon="mdi-magnify"></v-btn>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </div>
      </template>
    </v-toolbar>

    <v-card-text class="d-flex flex-column align-center">
      <v-btn
        color="surface-variant"
        text="Toggle"
        @click="collapse = !collapse"
      ></v-btn>
      <span class="mt-4">Collapse position:</span>
      <v-chip-group v-model="collapsePosition" variant="outlined" border mandatory>
        <v-chip
          class="px-6"
          prepend-icon="mdi-arrow-collapse-left"
          selected-class="v-chip--variant-flat"
          text="start"
          value="start"
          label
        ></v-chip>
        <v-chip
          append-icon="mdi-arrow-collapse-right"
          class="px-6 mr-0"
          selected-class="v-chip--variant-flat"
          text="end"
          value="end"
          label
        ></v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const collapse = shallowRef(true)
  const collapsePosition = shallowRef('start')
</script>

<script>
  export default {
    data: () => ({
      collapse: false,
      collapsePosition: 'start',
    }),
  }
</script>
