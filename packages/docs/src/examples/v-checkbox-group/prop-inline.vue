<template>
  <v-checkbox-group v-model="selected" label="Days" inline>
    <v-checkbox label="Monday" value="monday"></v-checkbox>
    <v-checkbox label="Wednesday" value="wednesday"></v-checkbox>
    <v-checkbox label="Friday" value="friday"></v-checkbox>
  </v-checkbox-group>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selected = shallowRef(['monday'])
</script>
