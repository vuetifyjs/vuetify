<template>
  <v-container fluid>
    <p>{{ selected }}</p>
    <v-checkbox label="John" v-model="selected" value="John"></v-checkbox>
    <v-checkbox label="Jacob" v-model="selected" value="Jacob"></v-checkbox>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        selected: ['John']
      }
    }
  }
</script>
