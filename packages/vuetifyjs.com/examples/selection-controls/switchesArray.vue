<template>
  <v-container fluid>
    <p>{{ people }}</p>
    <v-switch label="John" v-model="people" value="John"></v-switch>
    <v-switch label="Jacob" v-model="people" value="Jacob"></v-switch>
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
