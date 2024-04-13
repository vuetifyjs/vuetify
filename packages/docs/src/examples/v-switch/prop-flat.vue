<template>
  <v-switch
    v-model="model"
    :label="`Switch: ${model.toString()}`"
    flat
    hide-details
  ></v-switch>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref(true)
</script>

<script>
  export default {
    data () {
      return {
        model: true,
      }
    },
  }
</script>
