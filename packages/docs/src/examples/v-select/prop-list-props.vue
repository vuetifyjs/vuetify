<template>
  <v-select
    v-model="selected"
    :items="['Apple', 'Orange', 'Banana', 'Pear']"
    :list-props="{ bgColor: 'purple' }"
    item-color="yellow"
    label="Label"
    multiple
  ></v-select>
</template>

<script setup>
  import { ref } from 'vue'

  const selected = ref(['Apple'])
</script>

<script>
  export default {
    data: () => ({
      selected: ['Apple'],
    }),
  }
</script>
