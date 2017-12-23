<template>
  <v-container fluid>
    <p>{{ ex6 }}</p>
    <v-checkbox label="John" v-model="ex6" value="John"></v-checkbox>
    <v-checkbox label="Jacob" v-model="ex6" value="Jacob"></v-checkbox>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex5: ['John'],
        ex6: ['John'],
      }
    }
  }
</script>
