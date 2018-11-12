<template>
  <v-container fluid>
    <v-checkbox :label="`Checkbox 1: ${checkbox1.toString()}`" v-model="checkbox1"></v-checkbox>
    <v-checkbox :label="`Checkbox 2: ${checkbox2.toString()}`" v-model="checkbox2"></v-checkbox>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        checkbox1: true,
        checkbox2: false
      }
    }
  }
</script>
