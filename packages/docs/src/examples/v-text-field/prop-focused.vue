<template>
  <v-container>
    <v-text-field v-model="msg" :focused="true" @update:focused=""></v-text-field>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const msg = ref('Hello World!')
</script>
