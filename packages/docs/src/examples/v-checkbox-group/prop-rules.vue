<template>
  <v-checkbox-group
    v-model="selected"
    :rules="rules"
    label="Topics"
    validate-on="input"
  >
    <v-checkbox label="Product updates" value="product"></v-checkbox>
    <v-checkbox label="Events" value="events"></v-checkbox>
    <v-checkbox label="Tutorials" value="tutorials"></v-checkbox>
  </v-checkbox-group>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selected = shallowRef(['product'])
  const rules = [
    value => !!value?.length || 'Select at least one topic.',
  ]
</script>
