<template>
  <v-container>
    <v-row>
      <v-col>
        <v-number-input v-model="value" clear-zero></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const value = ref(0)
</script>
