<template>
  <v-switch
    v-model="model"
    hide-details
    inset
    :label="`Switch: ${model.toString()}`"
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
