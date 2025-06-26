<template>
  <v-card>
    <v-toolbar :collapse="collapse" title="Toolbar">
      <template v-slot:append>
        <div class="d-flex ga-1">
          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </div>
      </template>
    </v-toolbar>

    <v-card-text class="text-center pa-8">
      <v-btn
        color="surface-variant"
        text="Toggle"
        @click="collapse = !collapse"
      ></v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const collapse = shallowRef(true)
</script>
