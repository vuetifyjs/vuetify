<template>
  <v-container fluid>
    <p>{{ ex15 }}</p>
    <v-switch label="John" v-model="ex15" value="John"></v-switch>
    <v-switch label="Jacob" v-model="ex15" value="Jacob"></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex15: ['John']
      }
    }
  }
</script>
