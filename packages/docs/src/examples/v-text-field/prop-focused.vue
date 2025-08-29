<template>
  <v-app>
    <v-container>
      <v-text-field v-model="msg" :focused="true" @update:focused="" />
    </v-container>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const msg = ref('Hello World!')
</script>
