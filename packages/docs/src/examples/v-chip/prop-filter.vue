<template>
  <v-row
    align="center"
    justify="space-around"
  >
    <v-chip
      :model-value="active"
      class="ma-2"
      filter
    >
      I'm v-chip
    </v-chip>

    <v-chip
      :model-value="active"
      class="ma-2"
      filter-icon="mdi-plus"
      filter
    >
      I'm v-chip
    </v-chip>

    <v-chip
      :model-value="active"
      class="ma-2"
      filter-icon="mdi-minus"
      filter
    >
      I'm v-chip
    </v-chip>

    <v-switch
      v-model="active"
      label="Active"
    ></v-switch>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const active = ref(false)
</script>

<script>
  export default {
    data: () => ({
      active: false,
    }),
  }
</script>
