<template>
  <v-checkbox-group
    v-model="selected"
    :rules="rules"
    hint="Select 1 to 3 topics."
    label="Topics"
    validate-on="input"
    persistent-hint
  >
    <v-checkbox label="Product updates" value="product"></v-checkbox>
    <v-checkbox label="Events" value="events"></v-checkbox>
    <v-checkbox label="Tutorials" value="tutorials"></v-checkbox>
    <v-checkbox label="Release notes" value="releases"></v-checkbox>
    <v-checkbox label="Community news" value="community"></v-checkbox>
    <v-checkbox label="Surveys" value="surveys"></v-checkbox>
  </v-checkbox-group>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selected = shallowRef(['product'])
  const rules = [
    value => !!value?.length || 'Select at least one topic.',
    value => (value?.length ?? 0) <= 3 || 'Select no more than 3 topics.',
  ]
</script>
