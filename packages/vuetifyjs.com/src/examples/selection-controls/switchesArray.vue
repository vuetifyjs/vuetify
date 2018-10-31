<template>
  <v-container fluid>
    <p>{{ people }}</p>
    <v-switch v-model="people" label="John" value="John"></v-switch>
    <v-switch v-model="people" label="Jacob" value="Jacob"></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        people: ['John']
      }
    }
  }
</script>
