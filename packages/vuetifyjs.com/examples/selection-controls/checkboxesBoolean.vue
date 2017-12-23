<template>
  <v-container fluid>
    <v-checkbox v-bind:label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1"></v-checkbox>
    <v-checkbox v-bind:label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></v-checkbox>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex1: true,
        ex2: false,
        ex3: true,
        ex4: false,
      }
    }
  }
</script>
