<template>
  <v-app theme="dark">
    <v-container>
      <v-chip-group
        v-model="selected"
        center-active
        selected-class="text-red"
        filter
      >
        <v-slide-group-item v-for="n in 25" :key="n">
          <v-chip :value="n">Chip {{ n }}</v-chip>
        </v-slide-group-item>
      </v-chip-group>
    </v-container>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const selected = ref(null)
</script>

<script>
  export default {
    data: () => ({
      selected: null,
    }),
  }
</script>
