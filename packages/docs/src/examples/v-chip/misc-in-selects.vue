<template>
  <v-combobox
    v-model="chips"
    :items="items"
    label="Your favorite hobbies"
    prepend-icon="mdi-filter-variant"
    variant="solo"
    chips
    clearable
    closable-chips
    multiple
  >
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props">
        <strong>{{ item }}</strong>&nbsp;
        <span>(interest)</span>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ['Streaming', 'Eating']

  const chips = ref(['Programming', 'Playing video games', 'Watching movies', 'Sleeping'])
</script>

<script>
  export default {
    data () {
      return {
        chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
        items: ['Streaming', 'Eating'],
      }
    },
  }
</script>
