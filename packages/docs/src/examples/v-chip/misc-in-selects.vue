<template>
  <v-combobox
    v-model="chips"
    :items="items"
    label="Your favorite hobbies"
    prepend-icon="mdi-filter-variant"
    variant="solo"
    chips
    clearable
    multiple
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :model-value="selected"
        closable
        @click="select"
        @click:close="remove(item)"
      >
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

  function remove (item) {
    chips.value.splice(chips.value.indexOf(item), 1)
  }
</script>

<script>
  export default {
    data () {
      return {
        chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
        items: ['Streaming', 'Eating'],
      }
    },

    methods: {
      remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
      },
    },
  }
</script>
