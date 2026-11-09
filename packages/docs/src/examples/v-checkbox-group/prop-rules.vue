<template>
  <v-container max-width="500">
    <v-sheet class="py-6 px-3">
      <v-checkbox-group
        v-model="selected"
        :rules="rules"
        hint="Select 1 to 3 topics."
        label="Topics"
        indent-details
        persistent-hint
      >
        <div class="gc-3" style="display: grid; grid-template-columns: repeat(2, 1fr)">
          <v-checkbox label="Product updates" value="product"></v-checkbox>
          <v-checkbox label="Events" value="events"></v-checkbox>
          <v-checkbox label="Tutorials" value="tutorials"></v-checkbox>
          <v-checkbox label="Release notes" value="releases"></v-checkbox>
          <v-checkbox label="Community news" value="community"></v-checkbox>
          <v-checkbox label="Surveys" value="surveys"></v-checkbox>
        </div>
      </v-checkbox-group>
    </v-sheet>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selected = shallowRef(['product'])
  const rules = [
    value => !!value?.length || 'Select at least one topic.',
    value => (value?.length ?? 0) <= 3 || 'Select no more than 3 topics.',
  ]
</script>
