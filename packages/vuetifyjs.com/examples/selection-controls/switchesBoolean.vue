<template>
  <v-container fluid>
    <v-switch v-bind:label="`Switch 1: ${ex11.toString()}`" v-model="ex11"></v-switch>
    <v-switch v-bind:label="`Switch 2: ${ex12.toString()}`" v-model="ex12"></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex11: true,
        ex12: false
      }
    }
  }
</script>
