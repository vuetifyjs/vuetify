<template>
  <v-container class="d-flex ga-3 align-start" fluid>
    <v-textarea
      v-model="text"
      hint="Growing without limit"
      auto-grow
      persistent-hint
    ></v-textarea>

    <v-textarea
      v-model="text"
      hint="Growing up to 7 rows"
      max-rows="7"
      auto-grow
      persistent-hint
    ></v-textarea>

    <v-textarea
      v-model="text"
      hint="Growing up to 300px"
      max-grow="300"
      auto-grow
      persistent-hint
    ></v-textarea>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const text = ref('The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.')
</script>
